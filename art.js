import {themeFor} from './themes.js';
export function drawSpeciesSprite(canvas,type,mono,dark,outline='#91b7b8'){
 const c=canvas.getContext('2d'),W=48,H=32;
 const mask=Array.from({length:H},()=>Array(W).fill(false));
 const body=Array.from({length:H},()=>Array(W).fill(false));
 const fins=Array.from({length:H},()=>Array(W).fill(''));
 const inPoly=(x,y,p)=>{let b=false;for(let i=0,j=p.length-1;i<p.length;j=i++){const [a,d]=p[i],[e,f]=p[j];if((d>y)!==(f>y)&&x<(e-a)*(y-d)/(f-d)+a)b=!b;}return b;};
 const poly=(p,part='body')=>{for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(inPoly(x+.5,y+.5,p)){mask[y][x]=true;if(part==='body')body[y][x]=true;else fins[y][x]=part;}};
 const ellipse=(cx,cy,rx,ry,part='body')=>{for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(((x+.5-cx)/rx)**2+((y+.5-cy)/ry)**2<1){mask[y][x]=true;if(part==='body')body[y][x]=true;else fins[y][x]=part;}};
 const palettes={
  brook:{ink:'#283d36',shadow:'#4f6654',mid:'#82946b',light:'#bac69a',belly:'#e3ddc0',fin:'#a8694c',finLight:'#cf9664',white:'#f0e8ce',spot:'#d19a53',red:'#c77473',blue:'#8ab2bd'},
  clown:{ink:'#322e30',shadow:'#a95738',mid:'#d58148',light:'#e8a765',belly:'#efbe82',fin:'#b66b40',finLight:'#e59b57',white:'#f2ead2',spot:'#dba15e'},
  tang:{ink:'#22304c',shadow:'#375393',mid:'#527aba',light:'#80a4d0',belly:'#729ac8',fin:'#3d609e',finLight:'#7c9fc7',white:'#c5d6d8',yellow:'#e8cb76',yellowShade:'#bba459'}
 };
 const p=mono?{ink:'#263c2d',shadow:'#536d49',mid:'#8ca36b',light:'#b7c790',belly:'#dce5bd',fin:'#536d49',finLight:'#8ca36b',white:'#dce5bd',spot:'#dce5bd',red:'#dce5bd',blue:'#536d49',yellow:'#dce5bd',yellowShade:'#8ca36b'}:palettes[type];
 if(type==='brook'){
  // Shallow-notched, almost square tail; separate adipose and dorsal fins.
  poly([[3,10],[8,11],[13,15],[13,20],[8,23],[3,24],[4,18],[4,16]],'tail');
  poly([[13,12],[14,9],[17,9],[18,12]],'adipose');
  poly([[21,12],[24,5],[27,5],[32,12]],'dorsal');
  poly([[15,21],[16,26],[20,25],[22,21]],'anal');
  poly([[26,21],[27,26],[31,25],[32,21]],'pelvic');
  poly([[10,15],[17,12],[25,11],[35,11],[40,13],[43,16],[44,18],[41,20],[36,22],[24,23],[15,21],[10,20]]);
 }else if(type==='clown'){
  // Rounded fan tail and one continuous spiny/soft dorsal fin.
  poly([[12,14],[8,10],[5,10],[3,13],[3,21],[5,24],[8,24],[12,20]],'tail');
  poly([[13,13],[15,8],[18,7],[20,8],[22,6],[24,7],[26,6],[29,6],[32,7],[36,9],[39,13]],'dorsal');
  poly([[15,22],[18,28],[23,29],[28,25],[29,22]],'anal');
  poly([[29,23],[31,27],[34,26],[35,22]],'pelvic');
  poly([[10,15],[15,11],[23,9],[32,10],[38,12],[41,14],[43,17],[43,20],[40,23],[34,25],[24,26],[17,24],[11,20]]);
 }else{
  // Laterally compressed adult palette surgeonfish, with black-edged yellow tail.
  poly([[14,15],[9,12],[4,9],[5,15],[6,17],[5,20],[4,25],[9,22],[14,19]],'tail');
  poly([[13,13],[17,7],[22,4],[28,4],[34,6],[39,10],[41,14]],'dorsal');
  poly([[14,21],[18,27],[24,29],[30,29],[35,26],[39,22]],'anal');
  poly([[31,23],[33,27],[36,26],[36,23]],'pelvic');
  poly([[11,15],[16,10],[23,7],[31,8],[37,11],[41,15],[44,18],[42,21],[37,25],[29,27],[21,26],[15,22],[11,19]]);
 }
 const has=(x,y)=>mask[y]?.[x]||false;
 const pix=(x,y,color)=>{if(x<0||x>=W||y<0||y>=H)return;c.fillStyle=color;c.fillRect(x,y,1,1);};
 if(dark)for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++)if(!has(x,y)&&(has(x-1,y)||has(x+1,y)||has(x,y-1)||has(x,y+1)))pix(x,y,outline);
 for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++)if(mask[y][x]){
  const edge=!has(x-1,y)||!has(x+1,y)||!has(x,y-1)||!has(x,y+1);
  const dither=(x+y)%3===0;
  let color;
  if(body[y][x]){
   color=y<14?p.shadow:y<18?p.mid:y<21?p.light:p.belly;
   if(y>=12&&y<16&&dither)color=p.mid;
   if(y>=18&&y<22&&(x*3+y*5)%7===0)color=p.mid;
   if(type==='brook'){
    if(y<=15){color=y<13?p.shadow:p.mid;const wave=[0,0,1,2,2,1][y%6];if((x+wave)%6===0||(y%4===0&&x%6<3))color=p.light;}
    if(y>15&&y<20&&(x*5+y*7)%19===0)color=p.spot;
    if(y>=21&&x<37)color=(x+y)%3===0?p.finLight:p.fin;
   }
   if(type==='clown'){
    // Three narrow black-edged bars: caudal peduncle, middle (bulging forward), head.
    const head=35+(y>=18?1:0),middle=24+(y>=15&&y<=20?1:0);
    for(const [start,width] of [[12,2],[middle,3],[head,3]]){
     if(x===start-1||x===start+width)color=p.ink;
     if(x>=start&&x<start+width)color=p.white;
    }
   }
   if(type==='tang'){
    const upper=y>=10&&y<=13&&x>=15&&x<=38;
    const loop=((x-21)/7)**2+((y-17)/5)**2;
    if(upper||(loop<1&&loop>0.28&&x<28)||(x<=16&&y>=13&&y<=20)||(x>=28&&x<=35&&y===14))color=p.ink;
    if(x<=17&&y>=15&&y<=19&&x<18-Math.abs(y-17)*2)color=p.yellow;
   }
  }else{
   color=dither?p.finLight:p.fin;
   if(type==='brook'&&['tail','dorsal','adipose'].includes(fins[y][x])){color=dither?p.mid:p.shadow;if((x+[0,1,1,0][y%4])%4===0)color=p.light;}
   if(type==='clown'&&fins[y][x]==='tail')color=dither?p.light:p.mid;
   if(type==='tang'&&fins[y][x]==='tail')color=dither?p.yellow:p.yellowShade;
   if(type==='tang'&&(fins[y][x]==='dorsal'||fins[y][x]==='anal')&&x%3===0)color=p.shadow;
  }
  if(edge)color=p.ink;
  pix(x,y,color);
 }
 const mark=(x,y,color)=>{if(body[y]?.[x])pix(x,y,color);};
 if(type==='brook'){
  // Blue-ringed red spots on the flanks; no rainbow-trout stripe.
  for(const [x,y] of [[18,17],[25,18],[31,16]]){for(const [dx,dy] of [[-1,0],[1,0],[0,-1],[0,1]])mark(x+dx,y+dy,p.blue);mark(x,y,p.red);}
  // White leading edges, then a dark stripe, on lower fins.
  for(const [x,y] of [[16,23],[16,24],[17,25],[27,23],[27,24],[28,25]]){pix(x,y,p.white);pix(x-1,y,p.ink);}
  for(const [x,y] of [[34,19],[33,20],[32,21],[31,22]]){mark(x,y,p.finLight);mark(x,y+1,p.white);mark(x-1,y,p.ink);}
 }else if(type==='clown'){
  for(const [x,y] of [[32,18],[31,19],[30,20],[31,21],[32,21]])mark(x,y,p.finLight);
  for(const [x,y] of [[31,18],[30,19],[29,20]])mark(x,y,p.shadow);
 }else{
  // Small yellow pectoral fin and pale caudal spine on the visible side.
  for(const [x,y] of [[33,18],[32,19],[31,20],[32,20]])mark(x,y,p.yellow);
  mark(13,17,p.white);
 }
 const ex=type==='brook'?39:type==='clown'?39:39,ey=type==='brook'?15:type==='clown'?15:15;
 for(let y=ey-1;y<=ey+1;y++)for(let x=ex-1;x<=ex+1;x++)mark(x,y,p.white);
 mark(ex,ey,p.ink);mark(ex+1,ey,p.ink);mark(ex,ey+1,p.ink);mark(ex+1,ey+1,p.ink);
 const gx=type==='brook'?36:35;
 for(const [x,y] of [[gx,17],[gx-1,18],[gx-1,19],[gx,20]])mark(x,y,p.shadow);
 mark(42,18,p.ink);mark(43,18,p.ink);
}

// Higher-resolution original trout sprites, composed as long horizontal field-guide profiles.
export function drawDetailedTrout(canvas,type,mono,dark,outline='#91b7b8'){
 canvas.width=96;canvas.height=64;
 const c=canvas.getContext('2d'),W=96,H=64;
 const mask=Array.from({length:H},()=>Array(W).fill(''));
 const inside=(x,y,p)=>{let b=false;for(let i=0,j=p.length-1;i<p.length;j=i++){const [a,d]=p[i],[e,f]=p[j];if((d>y)!==(f>y)&&x<(e-a)*(y-d)/(f-d)+a)b=!b;}return b;};
 const poly=(p,part)=>{for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(inside(x+.5,y+.5,p))mask[y][x]=part;};
 const brook=type==='brook';
 const p=mono?{ink:'#263c2d',deep:'#3d5439',shadow:'#536d49',mid:'#81975e',scale:'#9db47a',light:'#becd97',cream:'#dce5bd',stripe:'#81975e',rose:'#536d49',blue:'#536d49',red:'#dce5bd',orange:'#8ca36b'}:
 brook?{ink:'#233930',deep:'#344b3b',shadow:'#53674b',mid:'#788b60',scale:'#99aa79',light:'#bbc69b',cream:'#e5dec2',stripe:'#bfc398',rose:'#b98063',blue:'#81a7b9',red:'#cd7973',orange:'#ba845b'}:
 {ink:'#293e34',deep:'#48624f',shadow:'#667b60',mid:'#8d9f7c',scale:'#aebe99',light:'#c5ceb0',cream:'#e5e0c7',stripe:'#c895a0',rose:'#bb7f8e',blue:'#95b6bc',red:'#bb7f8e',orange:'#b7b88e'};
 // Tail, adipose, dorsal, rear anal, pelvic and pectoral fins are individually shaped.
 poly(brook?[[7,24],[13,25],[23,32],[23,39],[13,47],[7,48],[9,37],[9,33]]:[[5,22],[12,24],[23,32],[23,39],[12,47],[5,49],[8,36],[8,34]],'tail');
 poly([[26,29],[29,25],[32,25],[35,29]],'adipose');
 poly([[40,28],[42,24],[45,21],[49,19],[55,18],[60,18],[63,22],[65,28]],'dorsal');
 poly([[31,42],[33,49],[37,52],[40,50],[43,43]],'anal');
 poly([[53,43],[55,51],[59,53],[63,50],[66,43]],'pelvic');
 poly([[21,32],[29,29],[40,27],[55,27],[69,27],[77,29],[83,30],[87,32],[90,34],[91,37],[90,40],[87,42],[77,44],[66,45],[49,45],[36,44],[27,41],[21,39]],'body');
 const has=(x,y)=>!!mask[y]?.[x];
 const pix=(x,y,col)=>{if(x<0||x>=W||y<0||y>=H)return;c.fillStyle=col;c.fillRect(x,y,1,1);};
 const mark=(x,y,col,part)=>{if(mask[y]?.[x]&&(!part||mask[y][x]===part))pix(x,y,col);};
 c.imageSmoothingEnabled=false;
 if(dark)for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++)if(!has(x,y)&&(has(x-1,y)||has(x+1,y)||has(x,y-1)||has(x,y+1)))pix(x,y,outline);
 for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++)if(has(x,y)){
  const part=mask[y][x],edge=!has(x-1,y)||!has(x+1,y)||!has(x,y-1)||!has(x,y+1);
  const n=(x*13+y*7+x*y*3)%29;
  let color;
  if(part==='body'){
   color=y<30?p.deep:y<33?p.shadow:y<36?p.mid:y<39?p.light:p.cream;
   if(y<35&&n<6)color=y<31?p.shadow:p.scale;
   if(y>=38&&n<7)color=p.light;
   if(y>=40&&n===8)color=p.mid;
   // Short overlapping scale clusters, with light reflecting off the upper flank.
   if(y>=31&&y<=42&&x<79&&(x+2*y)%7===0){color=y<36?p.scale:p.light;}
   if(!brook&&x<78&&y>=35&&y<=37)color=y===36?p.stripe:((x+y)%3?p.stripe:p.light);
   if(brook&&y>=41&&x<76)color=n<10?p.rose:p.light;
  }else{
   const lower=part==='anal'||part==='pelvic';
   color=brook&&lower?p.orange:((x+y)%3===0?p.scale:p.shadow);
   if(part==='dorsal'&&(x-y)%4===0)color=p.deep;
   if(part==='tail'&&(x+Math.floor(y/2))%4===0)color=p.deep;
   if(lower&&(x+Math.floor(y/2))%3===0)color=p.mid;
  }
  pix(x,y,edge?p.ink:color);
 }
 // Deliberate fin rays rather than flat triangular fins.
 for(let ray=0;ray<7;ray++){
  const base=44+ray*3,tip=base-2,top=[24,22,20,19,19,20,23][ray];
  for(let y=top;y<=28;y++){const x=Math.round(tip+(base-tip)*(y-top)/(28-top));mark(x,y,ray%2?p.scale:p.deep,'dorsal');}
 }
 for(let ray=0;ray<7;ray++)for(let x=9;x<23;x++){
  const y=Math.round(35+(ray-3)*(23-x)/4);mark(x,y,ray%2?p.light:p.deep,'tail');
 }
 if(brook){
  // Pale, connected worm-like markings along the dark back and dorsal fin.
  for(let start=29;start<75;start+=7)for(let y=28;y<34;y++){
   const x=start+[0,1,2,2,1,0][y-28];mark(x,y,p.light,'body');
   if(y===29||y===32)mark(x+1,y,p.light,'body');
  }
  for(let x=44;x<62;x++)for(let y=17;y<28;y++)if((x+[0,1,2,2,1,0][y%6])%6===0)mark(x,y,p.light,'dorsal');
  for(const [x,y] of [[32,36],[41,38],[50,35],[60,38],[69,35]]){
   for(const [dx,dy] of [[-1,0],[1,0],[0,-1],[0,1]])mark(x+dx,y+dy,p.blue,'body');
   mark(x,y,p.red,'body');
  }
  for(const [x,y] of [[30,34],[37,33],[45,35],[55,33],[63,34],[72,37]])mark(x,y,p.cream,'body');
  // White leading edges backed by a dark line on the ventral fins.
  for(const [x,y] of [[33,45],[34,46],[34,47],[35,48],[36,49],[37,50],[55,46],[56,47],[56,48],[57,49],[58,50],[59,51]]){
   mark(x,y,p.cream);mark(x-1,y,p.ink);
  }
 }else{
  // Rainbow trout's small dark spots cover the back, dorsal and caudal fins.
  for(let y=27;y<35;y++)for(let x=26;x<79;x++)if((x*7+y*11)%31===0){mark(x,y,p.ink,'body');if((x+y)%2===0)mark(x+1,y,p.deep,'body');}
  for(let y=16;y<29;y++)for(let x=42;x<63;x++)if((x*3+y*7)%17===0)mark(x,y,p.ink,'dorsal');
  for(let y=25;y<47;y++)for(let x=7;x<21;x++)if((x*5+y*3)%19===0)mark(x,y,p.ink,'tail');
 }
 // Anatomical head: small eye, pale jaw, curved operculum and a colored cheek.
 for(const [x,y] of [[78,33],[77,34],[76,35],[76,36],[76,37],[77,38],[78,39],[79,40]])mark(x,y,p.shadow,'body');
 for(const [x,y] of [[78,35],[78,36],[78,37],[79,38],[80,38]])mark(x,y,brook?p.rose:p.stripe,'body');
 for(const [x,y] of [[79,34],[80,34],[81,35],[80,36]])mark(x,y,p.cream,'body');
 for(let y=31;y<=35;y++)for(let x=82;x<=86;x++)mark(x,y,p.cream,'body');
 for(let y=32;y<=34;y++)for(let x=83;x<=85;x++)mark(x,y,p.ink,'body');
 mark(83,32,p.light,'body');
 for(let x=85;x<=89;x++)mark(x,37,p.ink,'body');
 for(let x=84;x<=87;x++)mark(x,39,p.cream,'body');
 // Pectoral fin lies back from the gill, not underneath the head.
 const pectoral=[[74,39],[70,41],[66,46],[68,48],[72,46],[77,40]];
 for(let y=38;y<=48;y++)for(let x=65;x<=78;x++)if(inside(x+.5,y+.5,pectoral))pix(x,y,(x+y)%3===0?p.scale:brook?p.orange:p.shadow);
 for(const [x,y] of [[75,40],[73,41],[71,42],[70,43],[69,44],[68,45]])pix(x,y,p.deep);
 for(const [x,y] of [[67,46],[68,47],[69,47],[70,46],[71,46]])pix(x,y,brook?p.cream:p.light);
}

export function drawWhiteSturgeon(canvas,mono,dark,outline='#91b7b8'){
 canvas.width=96;canvas.height=64;
 const c=canvas.getContext('2d'),W=96,H=64;
 const mask=Array.from({length:H},()=>Array(W).fill(''));
 const inside=(x,y,p)=>{let b=false;for(let i=0,j=p.length-1;i<p.length;j=i++){const [a,d]=p[i],[e,f]=p[j];if((d>y)!==(f>y)&&x<(e-a)*(y-d)/(f-d)+a)b=!b;}return b;};
 const poly=(points,part)=>{for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(inside(x+.5,y+.5,points))mask[y][x]=part;};
 const p=mono?{ink:'#263c2d',deep:'#3d5439',shadow:'#536d49',mid:'#81975e',light:'#b7c790',cream:'#dce5bd',plate:'#a8bb85'}:
 {ink:'#293b3d',deep:'#455653',shadow:'#63736c',mid:'#88968b',light:'#b7c2ad',cream:'#dce0c9',plate:'#a8b7a0'};
 // The upper tail lobe is longer; dorsal fin is far back near the tail.
 poly([[22,34],[16,28],[7,16],[5,16],[8,25],[12,33],[17,37],[12,43],[9,47],[14,46],[22,40]],'tail');
 poly([[24,33],[29,25],[33,23],[36,24],[40,31]],'dorsal');
 poly([[27,42],[25,46],[29,48],[34,43]],'anal');
 poly([[43,43],[39,48],[42,50],[48,45]],'pelvic');
 poly([[19,35],[27,33],[38,32],[50,30],[62,29],[71,30],[77,32],[82,34],[87,36],[91,37],[92,39],[90,40],[83,41],[80,44],[70,46],[57,46],[44,45],[31,43],[23,40],[19,39]],'body');
 const has=(x,y)=>!!mask[y]?.[x];
 const pix=(x,y,col)=>{if(x<0||x>=W||y<0||y>=H)return;c.fillStyle=col;c.fillRect(x,y,1,1);};
 const mark=(x,y,col,part)=>{if(has(x,y)&&(!part||mask[y][x]===part))pix(x,y,col);};
 c.imageSmoothingEnabled=false;
 if(dark)for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++)if(!has(x,y)&&(has(x-1,y)||has(x+1,y)||has(x,y-1)||has(x,y+1)))pix(x,y,outline);
 for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++)if(has(x,y)){
  const part=mask[y][x],edge=!has(x-1,y)||!has(x+1,y)||!has(x,y-1)||!has(x,y+1);
  const n=(x*13+y*7+x*y)%31;
  let color=part==='body'?(y<34?p.deep:y<37?p.shadow:y<40?p.mid:y<43?p.light:p.cream):((x+y)%3===0?p.mid:p.shadow);
  // Fine mottling on leathery skin, with light belly and no trout-style scales.
  if(part==='body'&&n<5)color=y<36?p.shadow:y<42?p.light:p.mid;
  if(part!=='body'&&(x+Math.floor(y/2))%4===0)color=p.deep;
  pix(x,y,edge?p.ink:color);
 }
 // Three visible scute rows suggest the five rows around the body.
 // Dorsal scutes stop before the rear-set dorsal fin; none behind that fin.
 for(let x=41;x<=73;x+=3){
  const y=x<50?31:x<68?29:30;
  mark(x,y,p.cream,'body');mark(x-1,y+1,p.plate,'body');mark(x+1,y+1,p.plate,'body');mark(x,y+2,p.deep,'body');
 }
 for(let x=25;x<=74;x+=3){
  const y=x<33?38:x<47?39:40;
  mark(x,y-1,p.light,'body');mark(x,y,p.cream,'body');mark(x+1,y,p.plate,'body');mark(x,y+1,p.deep,'body');
 }
 for(let x=35;x<=68;x+=5){mark(x,44,p.plate,'body');mark(x+1,44,p.cream,'body');}
 // Rear dorsal rays lean into its soft rounded upper edge.
 for(let ray=0;ray<5;ray++)for(let y=25;y<=32;y++)mark(29+ray*2-Math.floor((32-y)/4),y,ray%2?p.light:p.deep,'dorsal');
 for(let x=8;x<21;x++){const y=Math.round(17+(x-7)*1.35);mark(x,y,p.light,'tail');mark(x,y+2,p.deep,'tail');}
 // Broad pectoral fin just behind the gill plate.
 const fin=[[69,43],[63,46],[56,51],[57,53],[63,52],[70,48],[73,43]];
 for(let y=42;y<=53;y++)for(let x=55;x<=74;x++)if(inside(x+.5,y+.5,fin))pix(x,y,(x+y)%4===0?p.light:p.shadow);
 for(let ray=0;ray<4;ray++)for(let x=58;x<70;x++){
  const y=Math.round(51-ray+(x-58)*(44-(51-ray))/12);if(inside(x+.5,y+.5,fin))pix(x,y,p.deep);
 }
 // Modest eye and curved gill cover; mouth opens on the underside.
 for(const [x,y] of [[74,34],[73,35],[73,36],[72,37],[72,38],[73,39],[74,40],[75,41]])mark(x,y,p.deep,'body');
 for(let y=33;y<=35;y++)for(let x=77;x<=79;x++)mark(x,y,p.light,'body');
 mark(78,34,p.ink,'body');mark(79,34,p.ink,'body');mark(78,35,p.ink,'body');
 for(let x=77;x<=80;x++){mark(x,43,p.ink,'body');mark(x,44,p.shadow,'body');}
 for(let x=84;x<=90;x++)mark(x,38,p.light,'body');
 // Four slender sensory barbels project below the snout, forward of the mouth.
 for(const [x,length] of [[84,4],[86,5],[88,4],[90,3]])for(let d=0;d<length;d++)pix(x-Math.floor(d/3),41+d,d===length-1?p.light:p.mid);
}


export function paintPhoto(canvas,bitmap,original=false,palette='Midnight reef'){
 const ctx=canvas.getContext('2d');if(!ctx)return;
 const w=original?640:160,h=original?426:107;
 canvas.width=w;canvas.height=h;
 canvas.classList.toggle('fd-photo-original',original);
 ctx.imageSmoothingEnabled=true;
 ctx.fillStyle=themeFor(palette).bg;ctx.fillRect(0,0,w,h);
 const scale=Math.min(w/bitmap.width,h/bitmap.height),dw=bitmap.width*scale,dh=bitmap.height*scale;
 const dx=(w-dw)/2,dy=(h-dh)/2;
 ctx.drawImage(bitmap,dx,dy,dw,dh);
 if(original)return;
 const pixels=ctx.getImageData(0,0,w,h);
 const shades=themeFor(palette).photo||themeFor('Pocket green').photo;
 for(let y=Math.ceil(dy);y<Math.min(h,dy+dh);y++)for(let x=Math.ceil(dx);x<Math.min(w,dx+dw);x++){
 const i=(y*w+x)*4,data=pixels.data;
 const gray=.2126*data[i]+.7152*data[i+1]+.0722*data[i+2];
 const tone=gray/255*3,low=Math.min(2,Math.floor(tone)),fraction=tone-low;
 for(let j=0;j<3;j++){
 const tint=shades[low][j]*(1-fraction)+shades[low+1][j]*fraction;
 const value=palette==='Pocket color'?data[i+j]:tint;
 const colorStep=palette==='Pocket color'?51:17;
 data[i+j]=Math.max(0,Math.min(255,Math.round(value/colorStep)*colorStep));
 }
 }
 ctx.putImageData(pixels,0,0);
}

