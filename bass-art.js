// Original pixel drawings based on adult side-profile anatomy, not copied source pixels.
// Right-facing, with individually defined head/jaw, fin silhouettes and pigment patterns.
export const bassKeys=['largemouth-bass','smallmouth-bass','spotted-bass','striped-bass','white-bass','black-seabass'];
export function drawDetailedBass(canvas,key,mono=false,dark=true,outline='#91b7b8'){
 if(!bassKeys.includes(key))return false;
 const large=key==='largemouth-bass',small=key==='smallmouth-bass',striped=key==='striped-bass',whiteBass=key==='white-bass',sea=key==='black-seabass',temperate=striped||whiteBass,W=160,H=96;
 canvas.width=W;canvas.height=H;const c=canvas.getContext('2d');c.clearRect(0,0,W,H);c.imageSmoothingEnabled=false;
 const mask=Array.from({length:H},()=>Array(W).fill(''));
 const inside=(x,y,p)=>{let b=false;for(let i=0,j=p.length-1;i<p.length;j=i++){const [a,d]=p[i],[e,f]=p[j];if((d>y)!==(f>y)&&x<(e-a)*(y-d)/(f-d)+a)b=!b;}return b;};
 const poly=(points,part)=>{for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(inside(x+.5,y+.5,points))mask[y][x]=part;};
 const p=mono?{ink:'#263c2d',deep:'#3b5437',shadow:'#536d49',mid:'#859864',scale:'#a4b87f',light:'#becd97',belly:'#dce5bd',fin:'#81945e',ray:'#b8c98d',gold:'#a4b87f'}:small?
 {ink:'#303a2b',deep:'#4d4930',shadow:'#756a3e',mid:'#a19658',scale:'#c0b273',light:'#d1c18b',belly:'#d5d0b1',fin:'#918463',ray:'#b9aa7b',gold:'#c0a774'}:
 sea?{ink:'#24363b',deep:'#344b57',shadow:'#486774',mid:'#678b99',scale:'#88a6ae',light:'#a5b9b9',belly:'#b5c2b8',fin:'#4c7082',ray:'#97b2bd',gold:'#a2b3aa'}:temperate?{ink:'#293c3b',deep:'#3f5754',shadow:'#617d77',mid:'#9bb0a4',scale:'#b7c9bc',light:'#cbd7c7',belly:'#e5e5d2',fin:'#859f98',ray:'#bdcfc4',gold:'#b8bea4'}:
 {ink:'#29372a',deep:'#3b4d32',shadow:'#667347',mid:large?'#939b61':'#929e68',scale:'#bac486',light:'#ced2a2',belly:'#e0debe',fin:'#7c8060',ray:'#b4b792',gold:'#b4ad70'};
 // Broad, only shallowly indented tail. A slim peduncle joins the heavier trunk.
 poly([[7,29],[15,32],[31,48],[34,53],[33,61],[21,67],[10,77],[7,78],[9,61],[10,53],[8,39]],'tail');
 if(temperate||sea){for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(mask[y][x]==='tail')mask[y][x]='';poly(temperate?[[6,24],[17,31],[34,49],[35,58],[21,68],[6,79],[13,57],[14,51]]:[[8,29],[18,30],[31,47],[34,59],[23,71],[10,78],[6,68],[5,44]],'tail');}
 // Rounded soft dorsal behind the forward spiny section.
 poly([[44,43],[45,32],[48,24],[54,20],[62,18],[71,18],[79,22],[84,29],[88,large?35:27],[92,33],[90,37]],'soft');
 poly([[86,34],[88,large?32:27],[91,23],[93,15],[96,24],[99,13],[102,22],[105,15],[108,24],[111,18],[114,27],[116,22],[120,32],[125,37]],'spiny');
 if(temperate)for(let y=0;y<35;y++)for(let x=82;x<89;x++)if(mask[y][x]==='soft'||mask[y][x]==='spiny')mask[y][x]='';
 if(sea)poly([[76,25],[89,25],[105,25],[117,29],[124,34],[80,34]],'spiny');
 // Soft anal and paired pelvic fins point back toward the tail, not down like legs.
 poly([[52,66],[48,72],[48,80],[55,85],[63,84],[74,74],[77,69]],'anal');
 poly([[107,70],[103,77],[99,86],[106,88],[113,84],[117,72]],'pelvic');
 // The head is nearly one third of the visible body length, with a sloping forehead.
 const body=large?[[30,49],[43,42],[56,36],[72,31],[91,29],[109,30],[121,34],[132,39],[145,48],[152,53],[154,57],[151,60],[156,62],[152,67],[142,71],[128,75],[105,77],[80,75],[57,71],[43,65],[31,62]]:
 small?[[30,49],[43,43],[57,37],[75,32],[94,31],[112,34],[125,38],[138,45],[150,53],[152,56],[151,59],[155,61],[152,65],[141,69],[124,73],[105,74],[79,72],[58,68],[43,63],[31,61]]:
 [[30,49],[43,43],[59,36],[78,31],[97,30],[114,33],[127,37],[139,44],[150,52],[152,56],[151,59],[155,61],[152,65],[139,71],[122,75],[101,75],[77,72],[56,68],[43,63],[31,61]];
 poly(body,'body');
 if(whiteBass)poly([[39,49],[53,36],[83,29],[112,34],[138,47],[151,57],[141,70],[123,79],[99,82],[74,80],[52,70],[38,62]],'body');
 const put=(x,y,color,part)=>{x=Math.round(x);y=Math.round(y);if(x>=0&&x<W&&y>=0&&y<H&&mask[y][x]&&(!part||mask[y][x]===part)){c.fillStyle=color;c.fillRect(x,y,1,1);}};
 const line=(a,b,color,part)=>{const n=Math.max(Math.abs(b[0]-a[0]),Math.abs(b[1]-a[1]));for(let i=0;i<=n;i++)put(a[0]+(b[0]-a[0])*i/n,a[1]+(b[1]-a[1])*i/n,color,part);};
 if(dark)for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++)if(!mask[y][x]&&[[0,-1],[0,1],[-1,0],[1,0]].some(([dx,dy])=>mask[y+dy][x+dx])){c.fillStyle=outline;c.fillRect(x,y,1,1);}
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){
  const part=mask[y][x];if(!part)continue;
  const edge=[[0,-1],[0,1],[-1,0],[1,0]].some(([dx,dy])=>!mask[y+dy]?.[x+dx]);let color=p.fin;
  if(part==='body'){
   const back=34+Math.max(0,55-x)*.2;const underside=large?65:small?68:63;
   color=y<back+4?p.shadow:y<back+10?p.mid:y<underside?p.light:p.belly;
   if(y<back+2)color=p.deep;
   // Small staggered scale clusters follow the trunk; the cheek gets finer detailing later.
   if(x<117&&y>back+5&&y<underside+3){const row=Math.floor(y/4),col=(x+row%2*3)%6;if(y%4===0&&col<3)color=p.scale;if(y%4===1&&col===3)color=p.shadow;}
  }else{if((x+2*y)%11<2)color=p.ray;}
  put(x,y,edge?p.ink:color);
 }
 // Fin rays are directional rather than a uniform checker texture.
 for(let x=49;x<=82;x+=4)line([69,36],[x,20+Math.abs(x-63)*.18],p.ray,'soft');
 for(let x=90;x<=119;x+=4)line([x-3,35],[x,19+Math.abs(x-101)*.35],p.shadow,'spiny');
 for(let y=33;y<=76;y+=5)line([30,55],[9,y],p.ray,'tail');
 for(let x=50;x<74;x+=4)line([70,69],[x,83-Math.abs(x-56)*.22],p.ray,'anal');
 for(let x=102;x<115;x+=3)line([113,71],[x,85],p.ray,'pelvic');
 // Species pigment: neither the marking nor the body color is reused across the three.
 if(!temperate&&!sea&&(large||!small)){
  for(let x=32;x<123;x++){
   const y0=52-Math.floor((x-45)/40)+Math.round(Math.sin(x*.36)),broken=!large&&((Math.floor(x/7)%4===1)||(x%17<2));
   if(broken)continue;
   const thickness=large?3+(Math.floor(x/7)%3):3+(Math.floor(x/9)%3);
   for(let y=y0-2;y<y0+thickness;y++)put(x,y,(x*3+y*5)%11<4?p.shadow:p.deep,'body');
   if(x%11<5){put(x,y0-3,p.shadow,'body');put(x,y0+thickness,p.shadow,'body');}
  }
  if(!large)for(let y=59;y<69;y+=3)for(let x=43+(y%2)*3;x<113;x+=6){put(x,y,p.deep,'body');put(x+1,y,p.shadow,'body');}
 }else if(small){
  for(let i=0;i<7;i++){
   const cx=45+i*10,begin=38+(i%3)*2,end=65-(i%2)*3;
   for(let y=begin;y<end;y++)for(let dx=-2;dx<=2;dx++)if((y+dx+i)%5!==0)put(cx+dx+Math.floor((y-begin)/10),y,(y+dx)%3===0?p.shadow:p.mid,'body');
  }
 }
 if(temperate){for(let y=42;y<=66;y+=4)for(let x=33;x<123;x++)if(striped||(x+3*y)%19<14)put(x,y,p.deep,'body');}
 if(sea){for(let y=38;y<68;y+=4)for(let x=40+(y%3);x<121;x+=5){put(x,y,p.scale,'body');put(x+1,y,p.light,'body');}for(let x=49;x<117;x+=6){put(x,23,p.light,'soft');put(x,27,p.light,'spiny');}line([118,37],[128,40],p.mid,'body');}
 // Gill plate: arched cap and curved trailing edge meet the heavy lower cheek.
 line([113,37],[119,39],p.shadow,'body');line([119,39],[121,46],p.deep,'body');
 line([121,46],[119,58],p.deep,'body');line([119,58],[113,67],p.shadow,'body');
 line([113,67],[122,71],p.scale,'body');line([121,42],[128,37],p.scale,'body');
 if(!small&&!temperate&&!sea){line([121,51],[131,49],p.deep,'body');line([122,52],[130,51],p.shadow,'body');}
 // Smaller cheek scales and radiating marks; no random freckles on the face.
 for(let y=43;y<61;y+=3)for(let x=124;x<141;x+=3)if((x+y)%2===0)put(x,y,p.scale,'body');
 line([135,46],[125,53],p.shadow,'body');line([134,50],[125,59],p.mid,'body');
 // Jaw articulation extends behind the eye in largemouth and ends near the eye in the others.
 const hinge=large?120:133,eyeX=136,eyeY=large?51:50;
 line([hinge,61],[151,56],p.ink,'body');line([hinge,61],[hinge+5,67],p.shadow,'body');
 line([hinge+5,67],[145,65],p.gold,'body');line([145,65],[154,62],p.light,'body');
 line([large?125:136,59],[151,57],p.belly,'body');line([143,52],[152,55],p.deep,'body');
 // Slightly projecting lower lip, chin highlight, and nostril.
 line([147,61],[154,62],p.belly,'body');line([132,70],[147,67],p.belly,'body');put(147,51,p.deep,'body');
 // Eye has a restrained iris (no cartoon white disk).
 for(let y=-2;y<=2;y++)for(let x=-2;x<=2;x++){const d=x*x+y*y;if(d<=5)put(eyeX+x,eyeY+y,d>=4?p.gold:p.ink,'body');}
 put(eyeX-1,eyeY-1,p.light,'body');
 // Rounded translucent pectoral fan originates behind the operculum and points rearward.
 poly([[114,58],[107,59],[96,61],[85,65],[85,69],[92,72],[102,69],[111,64]],'pectoral');
 for(let y=57;y<=73;y++)for(let x=84;x<=115;x++)if(mask[y][x]==='pectoral')put(x,y,p.fin,'pectoral');
 for(let y=62;y<=71;y+=2)line([113,59],[87+(y-62),y],p.gold,'pectoral');
 line([114,58],[106,59],p.deep,'pectoral');
 return true;
}
