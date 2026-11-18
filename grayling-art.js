// Original pixel artwork: adult Arctic grayling, right-facing side profile.
// Anatomy reference: Alaska Department of Fish and Game species profile.
export function drawDetailedGrayling(canvas,mono=false,dark=true,outline='#91b7b8'){
 const W=160,H=96;canvas.width=W;canvas.height=H;const c=canvas.getContext('2d');c.clearRect(0,0,W,H);c.imageSmoothingEnabled=false;
 const m=Array.from({length:H},()=>Array(W).fill(''));
 const inside=(x,y,p)=>{let b=false;for(let i=0,j=p.length-1;i<p.length;j=i++){const[a,d]=p[i],[e,f]=p[j];if((d>y)!==(f>y)&&x<(e-a)*(y-d)/(f-d)+a)b=!b;}return b;};
 const poly=(p,t)=>{for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(inside(x+.5,y+.5,p))m[y][x]=t;};
 const p=mono?{ink:'#293c2d',back:'#52684b',shade:'#7e9166',mid:'#acba88',scale:'#c5cf9f',belly:'#dee3bb',fin:'#81956c',ray:'#b8c592',red:'#84966b',blue:'#bdcba0',gold:'#b9c18a'}:{ink:'#293e49',back:'#526c70',shade:'#809b95',mid:'#a4b5a1',scale:'#cdd3b5',belly:'#dedcba',fin:'#7f7c91',ray:'#b0aaa9',red:'#b48d91',blue:'#9dbdbb',gold:'#bcba8c'};
 poly([[6,36],[15,39],[32,55],[33,61],[18,73],[6,79],[12,59],[13,55]],'tail');
 // Long, rounded soft-rayed sail; rear trails toward the adipose fin.
 poly([[47,49],[44,31],[47,25],[55,20],[65,15],[76,12],[87,10],[95,11],[100,15],[104,24],[108,34],[113,44],[98,46],[72,48]],'dorsal');
 poly([[38,51],[39,46],[42,44],[46,45],[49,49],[49,52]],'adipose');
 poly([[48,66],[46,74],[51,82],[59,80],[70,70]],'anal');
 poly([[91,69],[87,76],[90,83],[97,80],[105,69]],'pelvic');
 poly([[30,55],[43,51],[57,47],[72,44],[92,44],[113,45],[125,48],[136,52],[144,57],[152,60],[154,63],[151,65],[146,67],[137,70],[121,73],[101,74],[81,73],[64,71],[47,67],[31,63]],'body');
 const put=(x,y,col,t)=>{x=Math.round(x);y=Math.round(y);if(x>=0&&x<W&&y>=0&&y<H&&m[y][x]&&(!t||m[y][x]===t)){c.fillStyle=col;c.fillRect(x,y,1,1);}};
 const line=(a,b,col,t)=>{const n=Math.max(Math.abs(b[0]-a[0]),Math.abs(b[1]-a[1]));for(let i=0;i<=n;i++)put(a[0]+(b[0]-a[0])*i/n,a[1]+(b[1]-a[1])*i/n,col,t);};
 for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++)if(!m[y][x]&&dark&&[[0,1],[0,-1],[1,0],[-1,0]].some(([dx,dy])=>m[y+dy][x+dx])){c.fillStyle=outline;c.fillRect(x,y,1,1);}
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){const t=m[y][x];if(!t)continue;let col=p.fin;
 if(t==='body'){const top=45+Math.max(0,63-x)*.18;col=y<top+6?p.back:y<65?p.mid:p.belly;if(x<124&&y>top+3&&y<70){const row=Math.floor(y/4),sx=(x+(row%2)*3)%6;if(y%4===0&&sx<2)col=y<55?p.shade:p.scale;if(y%4===1&&sx>=2&&sx<4)col=y<63?p.shade:p.mid;if(y%4===2&&sx===3&&y<61)col=p.back;}}
 else if(t==='dorsal')col=y<34?p.fin:p.shade;
 else if(t==='tail')col=p.shade;
 const edge=[[0,1],[0,-1],[1,0],[-1,0]].some(([dx,dy])=>!m[y+dy]?.[x+dx]);put(x,y,edge?p.ink:col);
 }
 // Dorsal fin rays fan rearward from the forward attachment (fish faces right).
 for(let x=46;x<108;x+=5){const top=x<87?10+(87-x)*.42:10+(x-87)*.4;line([x+5,46],[x,top],p.ray,'dorsal');line([x+6,44],[x+1,top+4],p.fin,'dorsal');}
 for(let y=23;y<42;y+=6)for(let x=48+((y/6|0)%2)*3;x<102;x+=9){put(x,y,p.blue,'dorsal');put(x+1,y,p.blue,'dorsal');put(x,y+1,p.blue,'dorsal');put(x+2,y+2,p.red,'dorsal');}
 for(let x=46;x<105;x++){const top=x<87?10+(87-x)*.42:10+(x-87)*.4;put(x,top+2,p.red,'dorsal');}
 for(let y=39;y<77;y+=5)line([31,59],[8,y],p.ray,'tail');
 for(let x=49;x<63;x+=3)line([68,69],[x,80],p.ray,'anal');
 for(let x=90;x<99;x+=3)line([102,70],[x,80],p.red,'pelvic');
 // Sparse dark flecks concentrated on the forward flanks, not a bass side band.
 for(const[x,y]of [[89,51],[98,54],[108,52],[115,56],[101,59],[85,56],[111,61],[94,63],[118,62],[78,53]]){put(x,y,p.ink,'body');put(x+1,y,p.ink,'body');put(x,y+1,p.back,'body');}
 // Small terminal mouth and defined silver cheek, with no enlarged bass jaw.
 line([123,49],[120,55],p.back,'body');line([120,55],[122,65],p.ink,'body');line([122,65],[129,70],p.shade,'body');line([125,52],[125,63],p.scale,'body');line([132,53],[127,57],p.shade,'body');line([134,62],[128,65],p.shade,'body');for(let y=55;y<67;y+=3)for(let x=128;x<138;x+=3)put(x,y,p.scale,'body');
 line([143,64],[152,62],p.ink,'body');line([143,65],[151,65],p.belly,'body');line([130,70],[144,67],p.gold,'body');put(149,59,p.ink,'body');
 for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++){const d=dx*dx+dy*dy;if(d<=5)put(139+dx,58+dy,d>=4?p.gold:p.ink,'body');}put(138,57,p.scale,'body');
 // Swept pectoral behind the gill; subtle orange-gold ray highlights.
 poly([[122,64],[114,64],[104,68],[105,73],[113,75],[121,69]],'pectoral');
 for(let y=63;y<76;y++)for(let x=103;x<123;x++)if(m[y][x]==='pectoral')put(x,y,p.shade,'pectoral');
 for(let y=68;y<74;y+=2)line([122,64],[106+(y-68),y],p.gold,'pectoral');line([122,64],[113,64],p.back,'pectoral');
 return true;
}
