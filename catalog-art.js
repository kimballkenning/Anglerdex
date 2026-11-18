import {drawDetailedGrayling} from './grayling-art.js';
import {drawDetailedBass,bassKeys} from './bass-art.js';
// Original Anglerdex pixel artwork. Geometry and markings are species-specific.
// Side profiles face right; flatfish show their pigmented, eyed side.
export const spriteSpecs={
 'brown-trout':{type:'trout',colors:['#6c6240','#aaa36b','#e0d1a3'],pattern:'brown',tail:'square',fin:'#b79666'},
 'cutthroat-trout':{type:'trout',colors:['#5f7159','#a1b080','#e2d9b0'],pattern:'cutthroat',tail:'notch',fin:'#a79168'},
 'lake-trout':{type:'trout',colors:['#4e655e','#7e9380','#c6cfb0'],pattern:'lightspots',tail:'fork',fin:'#82957e'},
 'arctic-grayling':{type:'grayling',colors:['#526577','#a0b5b6','#d1dac4'],pattern:'grayling',tail:'fork',fin:'#806f9e'},
 'mountain-whitefish':{type:'whitefish',colors:['#627e7d','#b5c6b7','#e2dfc6'],pattern:'scales',tail:'fork',fin:'#9bb4a7'},
 'chinook-salmon':{type:'salmon',colors:['#4c6c64','#a2b7ae','#dcdcc2'],pattern:'chinook',tail:'notch',fin:'#8b9d90'},
 'coho-salmon':{type:'salmon',colors:['#426d70','#a4c2ba','#e0dfc5'],pattern:'coho',tail:'notch',fin:'#8fa6a0'},
 'sockeye-salmon':{type:'salmon',colors:['#476d79','#a4c2c2','#e4e1c8'],pattern:'sockeye',tail:'fork',fin:'#839f9f'},
 'atlantic-salmon':{type:'salmon',colors:['#52696a','#afc0b0','#e0dec5'],pattern:'atlantic',tail:'fork',fin:'#829487'},
 'largemouth-bass':{type:'bass',colors:['#4c6550','#8a9c6a','#d6d2a3'],pattern:'bassband',mouth:'large',fin:'#809060'},
 'smallmouth-bass':{type:'bass',colors:['#6a6043','#a19359','#d5c79a'],pattern:'bassbars',mouth:'small',fin:'#9d8455'},
 'spotted-bass':{type:'bass',colors:['#546a50','#93a56d','#d7d5aa'],pattern:'spottedbass',mouth:'small',fin:'#839a65'},
 'bluegill':{type:'sunfish',colors:['#4c6d69','#8d9a65','#d7b776'],pattern:'bluegill',fin:'#75885e'},
 'redear-sunfish':{type:'sunfish',colors:['#637154','#a0a976','#dbd5a1'],pattern:'redear',fin:'#8f9b71'},
 'pumpkinseed':{type:'sunfish',colors:['#587a6e','#a4a878','#dfad61'],pattern:'pumpkinseed',fin:'#91a067'},
 'black-crappie':{type:'crappie',colors:['#596f64','#a6b7a0','#e3dec3'],pattern:'crappieblack',fin:'#91a991'},
 'white-crappie':{type:'crappie',colors:['#6b7e72','#b4c3ad','#e4e1c6'],pattern:'crappiewhite',fin:'#a3b7a0'},
 'yellow-perch':{type:'perch',colors:['#62754e','#c4b866','#e5d49b'],pattern:'perchbars',fin:'#c48d55'},
 'walleye':{type:'perch',colors:['#5d654b','#9b9c68','#d6d2aa'],pattern:'walleye',fin:'#a4a070'},
 'sauger':{type:'perch',colors:['#5a6150','#9a9771','#d4c9a0'],pattern:'sauger',fin:'#958e61'},
 'northern-pike':{type:'pike',colors:['#4d6550','#7e9260','#d3d0a0'],pattern:'pikelight',fin:'#a49764'},
 'muskellunge':{type:'pike',colors:['#6b725b','#afb08a','#d9d3b0'],pattern:'muskiebars',fin:'#a19770'},
 'chain-pickerel':{type:'pike',colors:['#506b45','#98a75e','#d7d3a0'],pattern:'chain',fin:'#a5a066'},
 'striped-bass':{type:'temperate',colors:['#526d63','#b4bda1','#e1dfbf'],pattern:'stripes',fin:'#93a38d'},
 'white-bass':{type:'temperate',colors:['#5c7271','#b8c9bf','#e6e5ce'],pattern:'brokenstripes',fin:'#9fae9d'},
 'channel-catfish':{type:'catfish',colors:['#56696a','#97aaa0','#d6d6b7'],pattern:'catspots',tail:'fork',fin:'#819788'},
 'blue-catfish':{type:'catfish',colors:['#4b6b7e','#87aab7','#d2d9c5'],pattern:'bluecat',tail:'fork',fin:'#7d9fb0'},
 'flathead-catfish':{type:'catfish',colors:['#796746','#b1a16b','#ded09e'],pattern:'flathead',tail:'square',fin:'#a09060'},
 'common-carp':{type:'carp',colors:['#7b6c43','#bda05c','#e0ca93'],pattern:'carpscales',tail:'fork',fin:'#af8350'},
 'alligator-gar':{type:'gar',colors:['#607058','#95a077','#d7d4ac'],pattern:'gator',fin:'#8d9670'},
 'longnose-gar':{type:'gar',colors:['#5d6e50','#9bab76','#d9d4a4'],pattern:'longgar',fin:'#939969'},
 'freshwater-drum':{type:'drum',colors:['#657b78','#abbcb1','#e0dec1'],pattern:'freshdrum',fin:'#91a49a'},
 'red-drum':{type:'drum',colors:['#816f52','#bca479','#e0d2a7'],pattern:'redspot',fin:'#ac8c62'},
 'black-drum':{type:'drum',colors:['#505c5d','#86928b','#c5c9b2'],pattern:'blackdrum',fin:'#788579'},
 'spotted-seatrout':{type:'seatrout',colors:['#576f66','#a4b8a2','#dddcc1'],pattern:'seaspots',fin:'#93a68b'},
 'pacific-halibut':{type:'flatfish',colors:['#514f3b','#8a865a','#b4b180'],pattern:'halibut',fin:'#999062'},
 'black-seabass':{type:'seabass',colors:['#354d55','#597681','#94a99b'],pattern:'seabass',fin:'#5e8190'},
 'sheepshead':{type:'sunfish',colors:['#65797a','#b7c3b6','#dedcc1'],pattern:'sheepbars',fin:'#8c9d8b'},
 'southern-flounder':{type:'flatfish',colors:['#635a40','#96885f','#bbb183'],pattern:'southern',fin:'#a09670'},
 'summer-flounder':{type:'flatfish',colors:['#625d47','#a29368','#c0b88b'],pattern:'fluke',fin:'#afa279'},
 'red-snapper':{type:'snapper',colors:['#9d5859','#ca8b83','#e8b9a2'],pattern:'snapper',fin:'#b86c67'},
 'gag':{type:'grouper',colors:['#696d63','#a0a28c','#d0c9a4'],pattern:'gagmarks',fin:'#8f927a'},
 'dolphinfish':{type:'mahi',colors:['#327a83','#84b98a','#d8c671'],pattern:'mahi',fin:'#548d9b'},
 'yellowfin-tuna':{type:'tuna',colors:['#355b77','#789da5','#d8d7b3'],pattern:'tuna',fin:'#d2b75b'},
 'common-snook':{type:'snook',colors:['#61786a','#b2bda1','#dedcba'],pattern:'snookline',fin:'#baa765'}
};
const patternTexture=pattern=>!['sockeye','scales'].includes(pattern);
export function drawCatalogSprite(canvas,key,mono=false,dark=true,outline='#91b7b8'){
 if(key==='arctic-grayling')return drawDetailedGrayling(canvas,mono,dark,outline);
 if(bassKeys.includes(key))return drawDetailedBass(canvas,key,mono,dark,outline);
 const spec=spriteSpecs[key];if(!spec)return false;
 const ctx=canvas.getContext('2d'),W=96,H=64;canvas.width=W;canvas.height=H;ctx.clearRect(0,0,W,H);
 const parts=Array.from({length:H},()=>Array(W).fill(null));
 const inside=(x,y,p)=>{let hit=false;for(let i=0,j=p.length-1;i<p.length;j=i++){const [a,b]=p[i],[c,d]=p[j];if((b>y)!==(d>y)&&x<(c-a)*(y-b)/(d-b)+a)hit=!hit;}return hit;};
 const poly=(points,part='body')=>{for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(inside(x+.5,y+.5,points))parts[y][x]=part;};
 const ellipse=(cx,cy,rx,ry,part='body')=>{for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(((x+.5-cx)/rx)**2+((y+.5-cy)/ry)**2<1)parts[y][x]=part;};
 const hash=(x,y)=>(x*17+y*31+x*y*3)%37;
 const p=mono?['#536d49','#8ca36b','#dce5bd']:spec.colors,ink=mono?'#263c2d':'#293c36',fin=mono?'#8ca36b':spec.fin,white=mono?'#dce5bd':'#eee4c5';
 const pixel=(x,y,color,part)=>{x=Math.round(x);y=Math.round(y);if(x>=0&&x<W&&y>=0&&y<H&&(!part||parts[y][x]===part)){ctx.fillStyle=color;ctx.fillRect(x,y,1,1);}};
 const line=(a,b,color,part)=>{const n=Math.max(Math.abs(b[0]-a[0]),Math.abs(b[1]-a[1]));for(let i=0;i<=n;i++)pixel(a[0]+(b[0]-a[0])*i/n,a[1]+(b[1]-a[1])*i/n,color,part);};
 const t=spec.type;
 let eye=[83,34],mouth=[91,40],top=27,bottom=46;
 const tail=(kind=spec.tail||'notch',y=36,low=49,high=23)=>{
  const points=kind==='square'?[[5,high],[13,high+1],[22,y-3],[22,y+4],[13,low-1],[5,low],[7,y]]:kind==='fork'?[[4,high],[13,high+3],[23,y-3],[23,y+3],[13,low-3],[4,low],[11,y]]:[[5,high],[13,high+2],[22,y-3],[22,y+3],[13,low-2],[5,low],[8,y]];
  poly(points,'tail');
 };
 if(['trout','salmon','whitefish','grayling'].includes(t)){
  tail(spec.tail,37,49,24);poly([[18,34],[27,29],[48,27],[67,28],[80,30],[88,34],[92,38],[89,43],[80,46],[61,47],[37,45],[23,42],[18,40]]);
  poly([[37,29],[39,24],[45,17],[49,18],[59,27]],'dorsal');poly([[26,31],[26,27],[29,26],[32,31]],'adipose');
  poly([[30,43],[27,49],[31,54],[39,46]],'anal');poly([[52,46],[49,52],[52,56],[61,47]],'pelvic');
  if(t==='whitefish'){poly([[80,30],[85,34],[89,38],[86,41],[82,40]]);eye=[82,34];mouth=[86,40];}
  if(t==='grayling')poly([[30,30],[32,17],[38,10],[52,10],[59,14],[64,29]],'dorsal');
 }else if(['bass','temperate','perch','snook','seatrout','snapper','seabass','grouper','drum','carp'].includes(t)){
  const deep=['drum','carp','snapper','seabass','grouper','temperate'].includes(t);top=deep?22:27;bottom=deep?49:45;tail(t==='grouper'?'square':spec.tail||'notch',37,50,23);
  poly([[19,33],[29,top+4],[46,top],[66,top],[80,top+5],[88,33],[92,38],[90,43],[80,bottom-1],[60,bottom+1],[36,bottom-2],[22,42],[18,39]]);
  const deepNotch=key==='largemouth-bass';const split=['perch','temperate','snook'].includes(t);
  poly([[60,top+2],[63,top-8],[66,top-5],[70,top-10],[73,top-6],[77,top-8],[80,top+6]],'dorsal');
  poly([[31,top+4],[34,top-3],[41,top-6],[48,top-6],[58,deepNotch?top+1:top-2],[60,top+2]],'dorsal');
  if(split)for(let y=0;y<top+2;y++)for(let x=57;x<=61;x++)if(parts[y][x]==='dorsal')parts[y][x]=null;
  poly([[30,bottom-2],[26,bottom+7],[35,bottom+10],[44,bottom]],'anal');poly([[60,bottom],[55,bottom+7],[60,bottom+10],[67,bottom-1]],'pelvic');
  if(t==='carp'){for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(parts[y][x]==='dorsal')parts[y][x]=null;poly([[29,26],[31,17],[38,17],[44,19],[51,20],[60,22],[72,27]],'dorsal');}
  else if(!split&&!deepNotch)poly([[49,top-2],[64,top-2],[64,top+2],[49,top+2]],'dorsal');
  if(t==='snook'){eye=[83,33];mouth=[92,39];}
 }else if(['sunfish','crappie'].includes(t)){
  top=20;bottom=51;tail('notch',36,48,24);ellipse(53,36,32,17);poly([[73,25],[83,30],[90,35],[91,40],[83,46],[74,47]]);
  poly([[28,29],[32,17],[40,12],[50,12],[62,13],[67,17],[70,13],[73,18],[77,15],[80,26]],'dorsal');
  poly([[28,43],[31,54],[41,58],[51,54],[58,51]],'anal');poly([[68,49],[63,57],[69,58],[75,48]],'pelvic');eye=[82,32];mouth=[90,39];
 }else if(t==='pike'){
  top=30;bottom=44;tail('fork',37,49,24);poly([[18,35],[31,31],[63,30],[76,31],[82,34],[92,35],[92,40],[83,42],[74,45],[32,44],[18,40]]);
  poly([[22,33],[24,22],[29,20],[38,31]],'dorsal');poly([[24,42],[20,51],[30,52],[36,43]],'anal');poly([[55,44],[51,52],[58,52],[64,43]],'pelvic');eye=[81,34];mouth=[92,38];
 }else if(t==='catfish'){
  tail(spec.tail,37,49,25);poly([[19,34],[33,30],[52,27],[71,key==='blue-catfish'?24:28],[80,28],[88,33],[92,37],[91,43],[80,47],[56,47],[33,44],[20,40]]);
  poly([[55,29],[61,17],[63,18],[68,28]],'dorsal');poly([[29,32],[31,27],[36,28],[38,32]],'adipose');
  poly(key==='blue-catfish'?[[26,43],[25,52],[47,52],[56,46]]:[[26,43],[28,49],[34,53],[43,51],[50,46]],'anal');poly([[62,47],[59,53],[67,53],[72,46]],'pelvic');eye=[84,33];mouth=[92,40];
 }else if(t==='gar'){
  top=31;bottom=42;tail('square',37,47,26);const long=key==='longnose-gar';poly([[18,34],[29,31],[57,31],[70,33],[long?72:79,long?34:32],[93,long?35:33],[93,long?39:41],[long?72:79,long?40:42],[67,43],[34,43],[19,40]]);
  poly([[24,32],[25,23],[29,21],[36,31]],'dorsal');poly([[24,42],[21,49],[30,50],[36,42]],'anal');poly([[48,42],[46,47],[53,49],[57,42]],'pelvic');eye=[long?71:79,34];mouth=[93,37];
 }else if(t==='flatfish'){
  const hal=key==='pacific-halibut';poly(hal?[[18,32],[39,17],[60,13],[78,23],[88,33],[87,41],[66,52],[45,54],[25,45],[17,38]]:[[18,32],[31,22],[53,18],[73,21],[85,29],[91,36],[85,46],[65,53],[43,52],[26,45],[18,39]]);
  poly([[19,32],[29,19],[48,11],[61,10],[77,18],[85,28],[81,28],[64,18],[46,19],[29,27]],'dorsal');poly([[19,40],[27,48],[45,58],[63,59],[77,52],[86,43],[80,44],[64,51],[44,50],[29,43]],'anal');tail(hal?'notch':'square',36,45,27);eye=[hal?80:82,hal?33:31];mouth=[90,39];
 }else if(t==='mahi'){
  tail('fork',36,54,17);poly([[18,33],[39,25],[64,22],[81,21],[86,23],[91,29],[92,38],[88,45],[67,46],[46,43],[23,40],[18,38]]);
  poly([[20,33],[29,22],[43,16],[66,14],[85,16],[86,21],[66,23],[43,26]],'dorsal');poly([[24,40],[24,47],[45,50],[59,45]],'anal');poly([[67,45],[64,51],[71,51],[75,44]],'pelvic');eye=[86,30];mouth=[92,38];
 }else if(t==='tuna'){
  tail('fork',36,57,15);poly([[18,34],[31,26],[48,21],[64,22],[80,28],[90,35],[93,38],[87,43],[66,50],[45,50],[29,43],[18,39]]);
  poly([[59,23],[66,10],[71,9],[69,23]],'dorsal');poly([[42,24],[47,10],[48,7],[51,25]],'dorsal');poly([[40,48],[42,58],[46,59],[49,48]],'anal');poly([[66,48],[66,54],[74,47]],'pelvic');
  for(let x=21;x<39;x+=4){poly([[x,30],[x+2,26],[x+3,31]],'finlet');poly([[x,43],[x+2,48],[x+3,44]],'finlet');}eye=[85,33];mouth=[92,39];
 }
 // Thin themed outline surrounds the natural-color sprite.
 for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++)if(!parts[y][x]&&[[0,-1],[0,1],[-1,0],[1,0]].some(([dx,dy])=>parts[y+dy][x+dx]))pixel(x,y,outline);
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){
  const part=parts[y][x];if(!part)continue;let color;
  const edge=x===0||y===0||x===W-1||y===H-1||[[0,-1],[0,1],[-1,0],[1,0]].some(([dx,dy])=>!parts[y+dy]?.[x+dx]);
  if(part==='body'){color=y<top+7?p[0]:y>bottom-6?p[2]:p[1];if(hash(x,y)<4&&patternTexture(spec.pattern))color=y>bottom-6?p[1]:p[2];if(hash(x,y)>32&&y<bottom-4&&patternTexture(spec.pattern))color=p[0];}
  else{color=fin;if((x+2*y)%7===0)color=p[0];if((x+y)%13===0)color=p[2];}
  pixel(x,y,edge?ink:color);
 }
 const mark=(x,y,color=ink,part='body')=>pixel(x,y,color,part);
 const pattern=spec.pattern;
 for(let y=top+4;y<bottom-3;y++)for(let x=24;x<79;x++){
  if(parts[y]?.[x]!=='body')continue;
  if(['brown','cutthroat','chinook','coho','seaspots','catspots'].includes(pattern)&&hash(x,y)===5&&(pattern==='catspots'||y<38)) {mark(x,y);if(['brown','seaspots'].includes(pattern))mark(x+1,y);}
  if(pattern==='brown'&&hash(x,y)===21&&y>33){mark(x-1,y,white);mark(x,y,mono?p[0]:'#b86b56');mark(x+1,y,white);}
  if(pattern==='lightspots'&&hash(x,y)<2){mark(x,y,white);mark(x+1,y,white);}
  if(['bassbars','muskiebars','perchbars','crappiewhite','sheepbars'].includes(pattern)){
   const size=pattern==='sheepbars'?9:pattern==='perchbars'?8:10;
   if((x-25)%size<3&&y>top+5&&y<bottom-4)mark(x,y,p[0]);
  }
  if(['bassband','spottedbass','snookline'].includes(pattern)&&Math.abs(y-(36+Math.floor((x-35)/35)))< (pattern==='snookline'?1:2))mark(x,y,ink);
  if(pattern==='spottedbass'&&y>=41&&(x+2*y)%9<2)mark(x,y,p[0]);
  if(['stripes','brokenstripes'].includes(pattern)&&y>=27&&y<=45&&(y-27)%3===0&&(pattern==='stripes'||(x+3*y)%14<10))mark(x,y,p[0]);
  if(['crappieblack','flathead','gagmarks'].includes(pattern)&&hash(Math.floor(x/3),Math.floor(y/2))<8)mark(x,y,p[0]);
  if(['carpscales','scales'].includes(pattern)&&x<78&&y>30&&(x+3*(Math.floor(y/3)%2))%6===0&&y%3===0)mark(x,y,p[0]);
  if(pattern==='pikelight'&&((Math.floor(x/7)+Math.floor(y/4))%2===0)&&x%7<3&&y%4<2)mark(x,y,p[2]);
  if(pattern==='chain'&&y>32&&y<42&&(Math.abs((x%10)-5)+Math.abs((y%8)-4)>6))mark(x,y,p[0]);
  if(['gator','longgar'].includes(pattern)&&x<68&&(x+2*y)%8===0)mark(x,y,p[0]);
  if(pattern==='longgar'&&hash(x,y)===10)mark(x,y,ink);
  if(['halibut','southern','fluke'].includes(pattern)&&hash(Math.floor(x/3),Math.floor(y/2))<10)mark(x,y,p[0]);
  if(pattern==='seabass'&&(x+2*y)%11===0)mark(x,y,p[2]);
  if(pattern==='mahi'&&y>32&&hash(x,y)<2)mark(x,y,mono?p[0]:'#548b9a');
  if(pattern==='sauger'&&Math.abs(y-33)<6&&x%15<7)mark(x,y,p[0]);
 }
 if(pattern==='cutthroat')line([80,43],[88,43],mono?p[0]:'#c07557','body');
 if(['chinook','coho','lightspots'].includes(pattern))for(let y=24;y<50;y++)for(let x=5;x<19;x++)if(hash(x,y)===5&&(pattern!=='coho'||y<37))mark(x,y,pattern==='lightspots'?white:ink,'tail');
 if(pattern==='atlantic')for(const [x,y] of [[34,32],[42,30],[51,33],[59,31],[68,34]]){mark(x,y);mark(x-1,y-1);mark(x+1,y+1);mark(x+1,y-1);mark(x-1,y+1);}
 if(pattern==='grayling'){for(let y=13;y<25;y+=4)for(let x=35;x<59;x+=5){mark(x,y,mono?p[2]:'#ac8f9c','dorsal');mark(x+1,y,mono?p[2]:'#7eafb3','dorsal');}line([37,42],[69,44],mono?p[1]:'#c6b57c','body');}
 if(['bluegill','redear','pumpkinseed'].includes(pattern)){
  for(let y=31;y<39;y++)for(let x=69;x<74;x++)mark(x,y,ink);
  if(pattern!=='bluegill')line([73,33],[73,37],mono?p[2]:'#cd7e59','body');
  if(pattern==='bluegill')for(let x=35;x<42;x++)for(let y=19;y<24;y++)mark(x,y,ink,'dorsal');
  if(pattern==='pumpkinseed'){for(const [a,b] of [[[76,33],[84,30]],[[76,36],[86,34]],[[76,38],[84,41]]])line(a,b,mono?p[2]:'#80b7b1','body');for(let y=34;y<46;y++)for(let x=34;x<67;x++)if(hash(x,y)===4)mark(x,y,mono?p[2]:'#bf955d');}
 }
 if(pattern==='redspot')for(let y=31;y<=37;y++)for(let x=24;x<=30;x++)if((x-27)**2+(y-34)**2<12)mark(x,y,ink);
 if(pattern==='walleye'){for(let x=62;x<67;x++)for(let y=22;y<27;y++)mark(x,y,ink,'dorsal');line([5,47],[12,43],white,'tail');}
 if(pattern==='sauger')for(let y=18;y<27;y++)for(let x=63;x<79;x++)if((x+3*y)%11===0)mark(x,y,ink,'dorsal');
 if(pattern==='fluke')for(const [x,y] of [[42,29],[56,27],[50,36],[40,42],[57,43]]){for(let yy=y-2;yy<=y+2;yy++)for(let xx=x-2;xx<=x+2;xx++){const d=(xx-x)**2+(yy-y)**2;if(d<=5)mark(xx,yy,d>=3?p[2]:ink);}}
 if(pattern==='blackdrum')for(let x=84;x<90;x+=2)line([x,45],[x-2,51],p[1]);
 if(t==='catfish')for(const [a,b] of [[[88,37],[95,33]],[[89,40],[95,45]],[[87,43],[90,51]],[[83,44],[82,49]]])line(a,b,p[1]);
 if(t==='carp')for(const [a,b] of [[[90,40],[94,44]],[[88,42],[89,47]]])line(a,b,p[0]);
 if(pattern==='chain')line([83,35],[84,41],ink,'body');
 const [ex,ey]=eye;for(let y=ey-1;y<=ey+2;y++)for(let x=ex-1;x<=ex+2;x++)mark(x,y,pattern==='snapper'&&!mono?'#b3695b':white);for(let y=ey;y<=ey+1;y++)for(let x=ex;x<=ex+1;x++)mark(x,y,ink);mark(ex,ey,white);
 if(t==='flatfish'){const ey2=ey-6;for(let y=ey2;y<ey2+2;y++)for(let x=ex-5;x<ex-3;x++)mark(x,y,ink);mark(ex-5,ey2,white);}
 line([mouth[0]-(spec.mouth==='large'?17:7),mouth[1]],[mouth[0],mouth[1]],ink,'body');
 if(pattern==='chinook')line([84,41],[90,41],ink,'body');
 if(pattern==='coho')line([84,41],[90,41],white,'body');
 // Operculum and pectoral fin, kept separate from the outline.
 if(t!=='flatfish'){line([78,36],[75,43],p[0],'body');const start=key==='largemouth-bass'?72:75;line([start,39],[64,46],p[0],'body');line([start,40],[66,44],fin,'body');line([start,41],[68,45],p[0],'body');}
 return true;
}
