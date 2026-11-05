export const API='https://api.theanglerdex.com';
export class ApiError extends Error{constructor(status,message,code){super(message);this.status=status;this.code=code;}}
export async function request(path,{method='GET',body,signal}={}){
 const response=await fetch(API+path,{method,credentials:'include',signal,headers:body instanceof Blob?{'Content-Type':body.type}:{'Content-Type':'application/json'},...(body===undefined?{}:{body:body instanceof Blob?body:JSON.stringify(body)})});
 const type=response.headers.get('Content-Type')||'';
 const data=response.status===204?null:type.includes('json')?await response.json():await response.blob();
 if(!response.ok)throw new ApiError(response.status,data?.message||data?.error||'The request could not be completed.',data?.code);
 return data;
}
export const auth=(path,body)=>request('/api/auth/'+path,{method:'POST',body});
export function catchPayload(fields,id){const metric=fields.units==='metric';return{id,speciesId:fields.species||null,lengthMm:fields.length===''?null:Number(fields.length)*(metric?10:25.4),weightG:fields.weight===''?null:Number(fields.weight)*(metric?1000:453.59237),locationName:fields.location.trim(),caughtOn:fields.date,notes:fields.notes||''};}
export function measurements(row,units='imperial'){
 const metric=units==='metric';const value=(n,d,suffix)=>n==null?'Not measured':`${(n/d).toLocaleString(undefined,{maximumFractionDigits:2})} ${suffix}`;
 return `${value(row.length_mm,metric?10:25.4,metric?'cm':'in')} · ${value(row.weight_g,metric?1000:453.59237,metric?'kg':'lb')}`;
}
export function fieldsForCatch(row,units='imperial'){
 const metric=units==='metric';return{species:row.species_id||'',units,length:row.length_mm==null?'':String(Number((row.length_mm/(metric?10:25.4)).toFixed(2))),weight:row.weight_g==null?'':String(Number((row.weight_g/(metric?1000:453.59237)).toFixed(3))),location:row.location_name,date:row.caught_on,notes:row.notes};
}
