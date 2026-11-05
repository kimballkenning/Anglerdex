import {themeFor} from './themes.js';

// This recreation excludes the original artwork. Every sprite canvas is
// drawn with a neutral, theme-aware placeholder (a generic "image" glyph)
// instead of species art, so all layout and feature code stays intact.
function drawPlaceholder(canvas,W,H,ink='#91b7b8'){
 canvas.width=W;canvas.height=H;
 const ctx=canvas.getContext('2d');if(!ctx)return;
 ctx.imageSmoothingEnabled=false;
 ctx.clearRect(0,0,W,H);
 const sx=W/16,sy=H/12;
 const px=(x,y,w=1,h=1,alpha=1)=>{ctx.globalAlpha=alpha;ctx.fillStyle=ink;ctx.fillRect(x*sx,y*sy,w*sx,h*sy);};
 px(0,0,16,12,.07);
 px(2,1,12,1);px(2,10,12,1);px(2,1,1,10);px(13,1,1,10);
 px(4,4,2,2,.9);
 for(let y=5;y<=9;y++){const n=y-5;px(6-n,y,2*n+1);}
 for(let y=7;y<=9;y++){const n=y-7;px(11-n,y,2*n+1);}
 ctx.globalAlpha=1;
}

export function drawSpeciesSprite(canvas,type,mono,dark,outline='#91b7b8'){
 drawPlaceholder(canvas,48,32,outline);
}

export function drawDetailedTrout(canvas,type,mono,dark,outline='#91b7b8'){
 drawPlaceholder(canvas,96,64,outline);
}

export function drawWhiteSturgeon(canvas,mono,dark,outline='#91b7b8'){
 drawPlaceholder(canvas,96,64,outline);
}

export function drawCatalogSprite(canvas,key,mono=false,dark=true,outline='#91b7b8'){
 drawPlaceholder(canvas,96,64,outline);
}

// Unchanged from the original: the Retro/Unedited effect applied to
// user-uploaded catch photos (this is user content, not site artwork).
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
