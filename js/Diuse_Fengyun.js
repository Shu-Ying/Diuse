window.func = function(lib,game,ui,get,ai,_status)
{
    if(!lib.config.extension_术樱_benghuai3off) return;

    if(lib.config.mode_config.Diuse_Fengyun==undefined){
        lib.config.mode_config.Diuse_Fengyun.level=0;
		game.saveConfig('level',0,'Diuse_Fengyun');
        lib.config.mode_config.Diuse_Fengyun.exp=0;
		game.saveConfig('exp',0,'Diuse_Fengyun');
        lib.config.mode_config.Diuse_Fengyun.upgrade=1000;
		game.saveConfig('upgrade',1000,'Diuse_Fengyun');
        game.saveConfig('player',0,'Diuse_Fengyun');
    }

	game.addMode('Diuse_Fengyun',{
		start:function(){
            game.syncState();
			event.trigger('gameStart');
        },
		game:{

        },
		element:{
			player:{
			},
		},
		ai:{
			get:{
			},
		},
		help:{
		},
	},{
		translate:'风云再起',
		extension:'术樱',
		config:{
            level:{
                name:"等级:"+lib.config.mode_config.Diuse_Fengyun.level,
                clear:true,
                nopointer:true, 
                frequent:true,
            },
            exp:{
                name:"经验:"+lib.config.mode_config.Diuse_Fengyun.exp,
                clear:true,
                nopointer:true, 
                frequent:true,
            },
            upgrade:{
                name:"所需经验:"+lib.config.mode_config.Diuse_Fengyun.upgrade,
                clear:true,
                nopointer:true, 
                frequent:true,
            },
			// mode:{
			// 	name:'模式',
			// 	init:'normal',
			// 	item:{
			// 		'normal':'风云再起',
            //         'ex':'大乱斗EX',
			// 	},
			// 	frequent:true,
			// 	//restart:true,
			// },
			player:{
                name:"初始角色",
                init:'刘备',
                item:{
                    刘备:'刘备',
                    曹操:'曹操',
                    孙权:'孙权',
                },
                visualMenu:function(node){
                    node.className='button character controlbutton';
                    node.style.backgroundSize='';
                },
                onclick:function(layout){
                    game.saveConfig('player',layout,'Diuse_Fengyun');
                    switch(layout){
                        case '刘备':{
                            game.saveConfig('Diuse_Fengyun_player','刘备');
                            break;
                        }
                        case '曹操':{
                            game.saveConfig('Diuse_Fengyun_player','曹操');
                            break;
                        }
                        case '孙权':{
                            game.saveConfig('Diuse_Fengyun_player','孙权');
                            break;
                        }

                        default: alert('未知错误！');
                    }
                },
                frequent:true,
			},
		},
	});
}