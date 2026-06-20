import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "./config.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {auth:{persistSession:false}});
const $ = id => document.getElementById(id);
let channel=null, localChannel=null, mode="online", roomCode="", player=null, isHost=false, ready=false;

function randomCode(){const chars="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";return Array.from({length:6},()=>chars[Math.floor(Math.random()*chars.length)]).join("");}
function cleanCode(v){return String(v||"").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,8);}
function cleanName(v){return String(v||"Kitteh").trim().slice(0,18)||"Kitteh";}
function id(){return crypto.randomUUID?.()||Math.random().toString(36).slice(2);}
function log(msg){const d=document.createElement("div");d.textContent=`[${new Date().toLocaleTimeString()}] ${msg}`;$("log").prepend(d);}
function badge(text,kind){$("connectionBadge").textContent=text;$("connectionBadge").className=`badge ${kind}`;}
function openRoom(){$("setup").classList.add("hidden");$("room").classList.remove("hidden");$("roomCode").textContent=roomCode;}
function renderPlayers(list){$("players").innerHTML=list.length?list.map(p=>`<div class="player"><span><b>${escapeHtml(p.name)}</b><small>${p.host?"Host • ":""}${p.side||p.preference||"random"}</small></span><span>${p.ready?"READY":"not ready"}</span></div>`).join(""):"<p class='hint'>Nobody detected yet.</p>";badge(list.length>=2?"2 PLAYERS CONNECTED":"WAITING FOR PLAYER",list.length>=2?"online":"waiting");}
function escapeHtml(v){const e=document.createElement("div");e.textContent=v;return e.innerHTML;}
function chooseRoles(members){if(members.length<2)return members;const sorted=[...members].sort((a,b)=>(b.host?1:0)-(a.host?1:0));let plant=sorted.find(x=>x.preference==="plants"),derp=sorted.find(x=>x.preference==="derps"&&x.id!==plant?.id);if(!plant)plant=sorted.find(x=>x.id!==derp?.id);if(!derp)derp=sorted.find(x=>x.id!==plant?.id);return sorted.map(x=>({...x,side:x.id===plant?.id?"plants":"derps"}));}
async function startOnline(host){mode="online";isHost=host;openRoom();badge("CONNECTING","waiting");channel=supabase.channel(`pad-pvp-${roomCode}`,{config:{presence:{key:player.id},broadcast:{self:true}}});
channel.on("presence",{event:"sync"},()=>{const raw=channel.presenceState();const members=Object.values(raw).flat().map(x=>x.user).filter(Boolean);const assigned=chooseRoles(members);renderPlayers(assigned);if(isHost&&assigned.length>=2)channel.send({type:"broadcast",event:"role-assignment",payload:{members:assigned}});});
channel.on("broadcast",{event:"role-assignment"},({payload})=>{const mine=payload.members?.find(x=>x.id===player.id);if(mine)player.side=mine.side;renderPlayers(payload.members||[]);log(`Roles assigned: ${payload.members?.map(x=>`${x.name}=${x.side}`).join(", ")}`);});
channel.on("broadcast",{event:"pad-test"},({payload})=>{log(`${payload.name} sent ${payload.action}${payload.side?` from ${payload.side} side`:""}.`);});
channel.on("broadcast",{event:"ready"},({payload})=>log(`${payload.name} is ${payload.ready?"READY":"not ready"}.`));
channel.subscribe(async status=>{if(status==="SUBSCRIBED"){badge("CONNECTED","online");await channel.track({user:player});log(`Connected to online room ${roomCode}.`);}else if(status==="CHANNEL_ERROR"||status==="TIMED_OUT"){badge("CONNECTION ERROR","offline");log(`Supabase status: ${status}. Try Local Two-Tab mode.`);}});}
function startLocal(host){mode="local";isHost=host;openRoom();localChannel=new BroadcastChannel(`pad-pvp-${roomCode}`);const members=new Map([[player.id,player]]);const send=(type,payload={})=>localChannel.postMessage({type,payload,from:player.id});
localChannel.onmessage=e=>{const {type,payload}=e.data||{};if(type==="hello"||type==="state"){members.set(payload.id,payload);if(type==="hello")send("state",player);renderPlayers(chooseRoles([...members.values()]));log(`${payload.name} connected locally.`);}if(type==="test")log(`${payload.name} sent ${payload.action}.`);if(type==="ready"){const p=members.get(payload.id)||payload;p.ready=payload.ready;members.set(p.id,p);renderPlayers(chooseRoles([...members.values()]));}};send("hello",player);renderPlayers([player]);badge("LOCAL ROOM","online");log(`Local room ${roomCode} opened. Use another tab.`);window.padLocalSend=send;}
function enter(host,local=false){const name=cleanName($(host?"hostName":"guestName").value);roomCode=host?randomCode():cleanCode($("joinCode").value);if(!roomCode){alert("Enter a join code.");return;}player={id:id(),name,preference:host?$("hostSide").value:"random",host,ready:false};local?startLocal(host):startOnline(host);}
function sendTest(action){if(!player)return;if(mode==="online")channel?.send({type:"broadcast",event:"pad-test",payload:{action,name:player.name,side:player.side||player.preference}});else window.padLocalSend?.("test",{action,name:player.name});}
$("createBtn").onclick=()=>enter(true,false);$("joinBtn").onclick=()=>enter(false,false);$("createLocalBtn").onclick=()=>enter(true,true);$("joinLocalBtn").onclick=()=>enter(false,true);
$("plantTest").onclick=()=>sendTest("TEST PLANT");$("derpTest").onclick=()=>sendTest("TEST DERP");
$("readyTest").onclick=()=>{ready=!ready;player.ready=ready;if(mode==="online"){channel?.track({user:player});channel?.send({type:"broadcast",event:"ready",payload:{name:player.name,ready}});}else window.padLocalSend?.("ready",player);log(`You are ${ready?"READY":"not ready"}.`);};
$("leaveBtn").onclick=async()=>{if(channel)await supabase.removeChannel(channel);localChannel?.close();location.reload();};
window.addEventListener("beforeunload",()=>{localChannel?.close();});
