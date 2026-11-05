export const themes={
 'Midnight reef':{dark:true,bg:'#101c2c',panel:'#182a3a',ink:'#a8e8cf',muted:'#a6bac9',line:'#56798c',soft:'#20394b',outline:'#91b7b8',photo:[[16,35,51],[55,90,109],[107,158,163],[168,232,207]]},
 'Pocket color':{dark:false,bg:'#f4ecd6',panel:'#fff8e8',ink:'#3f4a3b',muted:'#657059',line:'#8d9c75',soft:'#e8e2c4',outline:'#91b7b8',photo:null},
 'Pocket green':{dark:false,bg:'#dce5bd',panel:'#edf0d5',ink:'#263c2d',muted:'#4c6347',line:'#536d49',soft:'#c5d4a0',outline:'#91b7b8',photo:[[38,60,45],[83,109,73],[140,163,107],[220,229,189]]},
 'Purple tide':{dark:true,bg:'#20172f',panel:'#2d223e',ink:'#e7d6ff',muted:'#c0b1d3',line:'#8d739f',soft:'#3b2c4e',outline:'#b6a0ce',photo:[[32,23,47],[85,60,111],[154,120,177],[231,214,255]]},
 'Earth brown':{dark:true,bg:'#2a211a',panel:'#382c22',ink:'#efdfbd',muted:'#cab99c',line:'#9a8261',soft:'#47382a',outline:'#c5b797',photo:[[42,33,26],[100,78,49],[162,137,92],[239,223,189]]},
 'Sepia':{dark:false,bg:'#e9d7b4',panel:'#f1e4ca',ink:'#4c3822',muted:'#705438',line:'#9f8056',soft:'#d6c098',outline:'#a89373',photo:[[60,43,28],[115,83,48],[175,139,86],[241,228,202]]},
 'Ink black':{dark:true,bg:'#0c0c0c',panel:'#171717',ink:'#eeeeee',muted:'#b8b8b8',line:'#747474',soft:'#252525',outline:'#b4b4b4',photo:[[12,12,12],[69,69,69],[145,145,145],[238,238,238]]},
 'Paper white':{dark:false,bg:'#ffffff',panel:'#ffffff',ink:'#23282b',muted:'#5a6165',line:'#8b9296',soft:'#eff1f2',outline:'#8b9296',photo:[[35,40,43],[96,106,112],[175,184,188],[244,246,247]]}
};
export const themeNames=Object.keys(themes);
export const themeFor=name=>themes[name]||themes['Midnight reef'];
