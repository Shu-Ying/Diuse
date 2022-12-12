window.func = function(lib,game,ui,get,ai,_status)
{
    if(!lib.config.extension_术樱_tianshuoff) return;

    game.Diuse_Tianshu=function(英文名,翻译名,obj,扩展包名){
        var oobj=get.copy(obj);oobj.name=英文名;
        oobj.character=obj.character.character;
        oobj.skill=obj.skill.skill;oobj.translate=Object.assign({},obj.character.translate,obj.skill.translate);
        game.import('character',function(){
            if(lib.device||lib.node){
                for(var i in oobj.character){
                    oobj.character[i][4].push('ext:'+扩展包名+'/'+i+'.jpg');
                }
            }else{
                for(var i in oobj.character){
                    oobj.character[i][4].push('db:extension-'+扩展包名+':'+i+'.jpg');
                }
            }return oobj;
        });
        lib.config.all.characters.push(英文名);
        if(!lib.config.characters.contains(英文名)){
            lib.config.characters.push(英文名);
        }
        lib.translate[英文名+'_character_config'] = 翻译名;

        //Boss
        lib.skill._Tianshu_checkPoint={ //天书Boss阵亡和奖励
            trigger:{
                player:'dieBegin',
                global:"gameDrawAfter",
            },
            forced:true,
            charlotte:true,
            popup:false,
            lastDo:true,
            unique: true,
            forceDie:true,
            filter:function(event,player){
                var checkPointNum=_status.Diuse_Tianshu_checkPoint,bool=_status.Diuse_Tianshu_Bool;
                if(checkPointNum>=6) checkPointNum=5;
                if(bool&&event.parent.name=='game'&&player.name=='Boss_Diuse_Tianshu') return true;
                if(bool&&player.Diuse_bossTianshuName(checkPointNum,_status.Diuse_Tianshu_Difficulty)&&player==event.player&&!event.player.storage.Tianshu_checkPoint) return true;
                return false;
            },
            content:function(){
                if(trigger.parent.name!='game') trigger.player.storage.Tianshu_checkPoint=true; //限制因技能造成的多重触发
                var list=[];
                var newSeat=5;
                if(game.me==game.boss) newSeat=6;
                var num3=lib.config.extension_术樱_tianshu_new;
                var bool=_status.Diuse_Tianshu_nextBool;
                'step 0'
                var num=_status.Diuse_Tianshu_checkPoint;
                var num2=_status.Diuse_Tianshu_Difficulty;
                //if(game.boss.isDead()) game.boss.revive(); game.boss.draw(4); //防止Boss开局暴毙
                if(num==undefined||num==0){ //开始时召唤BOSS
                    _status.Diuse_Tianshu_Bosslist=[];
                    _status.Diuse_Tianshu_checkPoint++;
                    for(var i=0;i<game.players.length;i++){
                        if(game.players[i]==game.boss){　
                            var name=player.Diuse_bossTianshuName(-1);
                            game.players[i].init(name);
                            _status.Diuse_Tianshu_Bosslist.push(name);
                        } else {
                            game.players[i].addSkill('Tianshu_Protect');
                        }
                    }
                    var name1=player.Diuse_bossTianshuName(-1);
                    _status.Diuse_Tianshu_Bosslist.push(name1);
                    game.addBossFellow(newSeat,name1);
                    game.boss.addSkill('Diuse_skip');
                    if(lib.config.extension_术樱_tianshu_addBoss&&_status.Diuse_Xvni_Bool==false){
                        var name2=player.Diuse_bossTianshuName(-1);
                        _status.Diuse_Tianshu_Bosslist.push(name2);
                        game.addBossFellow(newSeat+1,name2);
                    }
                } else if(num==1){ //第一关阵亡判断
                    var nextCheckPoint=player.Diuse_bossTianshuName(num,num2); //判断阵亡BOSS是否属于BOSS列表
                    if(nextCheckPoint){ //如果是
                        if(trigger.source!=undefined) trigger.source.hp!=trigger.source.maxHp?trigger.source.recover():trigger.source.draw(2);
                        var gameBoss=player.Diuse_gameBossAllDie(); //判断关卡BOSS是否全部阵亡
                        if(gameBoss){ //阵亡
                            _status.Diuse_Tianshu_nextBool=true;
                        }  else if(game.me==player&&game.me==game.boss){
                            player.Diuse_gameBossAllDie(1);
                        } 
                    }
                } else if(num==2){ //进入第二关 和 阵亡判断
                    if(bool){ //进入
                        var name1=player.Diuse_bossTianshuName(-2,num2);
                        _status.Diuse_Tianshu_Bosslist.push(name1);
                        game.addBossFellow(newSeat,name1); //召唤4号位第二关Boss num2是难度
                        var name2=player.Diuse_bossTianshuName(-2,num2);
                        _status.Diuse_Tianshu_Bosslist.push(name2);
                        game.changeBoss(name2); //6号位Boss
                        if(lib.config.extension_术樱_tianshu_addBoss&&_status.Diuse_Xvni_Bool==false){
                            var name3=player.Diuse_bossTianshuName(-2,num2);
                            _status.Diuse_Tianshu_Bosslist.push(name3);
                            game.addBossFellow(newSeat+1,name3);
                        }
                        game.Diuse_tianshuNewBoss(_status.currentPhase.next,num,num2); //重置回合 和判断 将回合控制权给谁
                        if(num2==1){game.Diuse_bossGainMaxHpCard(0,1);} else if(num2==2){game.Diuse_bossGainMaxHpCard(0,2);} else {game.Diuse_bossGainMaxHpCard(0,3);}
                        if(_status.gameMe){
                            game.boss._trueMe=game.me;
                            _status.gameMe=false;
                        }
                        _status.Diuse_Tianshu_nextBool=false;
                        player.Diuse_addAllSkills();
                    }
                    var nextCheckPoint=player.Diuse_bossTianshuName(num,num2); //阵亡判断 同第一关
                    if(nextCheckPoint){
                        if(trigger.source!=undefined) trigger.source.hp!=trigger.source.maxHp?trigger.source.recover():trigger.source.draw(2);
                        var gameBoss=player.Diuse_gameBossAllDie();
                        if(gameBoss){
                            _status.Diuse_Tianshu_nextBool=true;
                        } else if(game.me==player&&game.me==game.boss){
                            player.Diuse_gameBossAllDie(1);
                        } 
                    }
                } else if(num==3){
                    if(bool){
                        var name1=player.Diuse_bossTianshuName(-3,num2);
                        _status.Diuse_Tianshu_Bosslist.push(name1);
                        game.addBossFellow(newSeat,name1);
                        var name2=player.Diuse_bossTianshuName(-3,num2);
                        _status.Diuse_Tianshu_Bosslist.push(name2);
                        game.changeBoss(name2);
                        if(lib.config.extension_术樱_tianshu_addBoss&&_status.Diuse_Xvni_Bool==false){
                            var name3=player.Diuse_bossTianshuName(-3,num2);
                            _status.Diuse_Tianshu_Bosslist.push(name3);
                            game.addBossFellow(newSeat+1,name3);
                        }
                        game.Diuse_tianshuNewBoss(_status.currentPhase.next,num,num2);
                        if(num2==1){game.Diuse_bossGainMaxHpCard(0,2);} else if(num2==2){game.Diuse_bossGainMaxHpCard(0,3);} else {game.Diuse_bossGainMaxHpCard(0,4);}
                        if(_status.gameMe){
                            game.boss._trueMe=game.me;
                            _status.gameMe=false;
                        }
                        _status.Diuse_Tianshu_nextBool=false;
                        player.Diuse_addAllSkills();
                    }
                    var nextCheckPoint=player.Diuse_bossTianshuName(num,num2);
                    if(nextCheckPoint){
                        if(trigger.source!=undefined) trigger.source.hp!=trigger.source.maxHp?trigger.source.recover():trigger.source.draw(2);
                        var gameBoss=player.Diuse_gameBossAllDie();
                        if(gameBoss){
                            _status.Diuse_Tianshu_nextBool=true;
                        } else if(game.me==player&&game.me==game.boss){
                            player.Diuse_gameBossAllDie(1);
                        } 
                    }
                } else if(num==4){
                    if(bool){
                        var name1=player.Diuse_bossTianshuName(-4,num2);
                        _status.Diuse_Tianshu_Bosslist.push(name1);
                        game.addBossFellow(newSeat,name1);
                        var name2=player.Diuse_bossTianshuName(-4,num2);
                        _status.Diuse_Tianshu_Bosslist.push(name2);
                        game.changeBoss(name2);
                        if(lib.config.extension_术樱_tianshu_addBoss&&_status.Diuse_Xvni_Bool==false){
                            var name3=player.Diuse_bossTianshuName(-4,num2);
                            _status.Diuse_Tianshu_Bosslist.push(name3);
                            game.addBossFellow(newSeat+1,name3);
                        }
                        game.Diuse_tianshuNewBoss(_status.currentPhase.next,num,num2);
                        if(num2==1){game.Diuse_bossGainMaxHpCard(0,3);} else if(num2==2){game.Diuse_bossGainMaxHpCard(0,4);} else {game.Diuse_bossGainMaxHpCard(0,5);}
                        if(_status.gameMe){
                            game.boss._trueMe=game.me;
                            _status.gameMe=false;
                        }
                        _status.Diuse_Tianshu_nextBool=false;
                        player.Diuse_addAllSkills();
                    }
                    var nextCheckPoint=player.Diuse_bossTianshuName(num,num2);
                    if(nextCheckPoint){
                        if(trigger.source!=undefined) trigger.source.hp!=trigger.source.maxHp?trigger.source.recover():trigger.source.draw(2);
                        var gameBoss=player.Diuse_gameBossAllDie();
                        if(gameBoss){
                            _status.Diuse_Tianshu_nextBool=true;
                        } else if(game.me==player&&game.me==game.boss){
                            player.Diuse_gameBossAllDie(1);
                        } 
                    }
                } else if(lib.config.extension_术樱_tianshuaddoff&&_status.Diuse_Tianshu_checkPoint<=num3){
                    if(bool){
                        var name1=player.Diuse_bossTianshuName(-5,num2);
                        _status.Diuse_Tianshu_Bosslist.push(name1);
                        game.addBossFellow(newSeat,name1);
                        var name2=player.Diuse_bossTianshuName(-5,num2);
                        _status.Diuse_Tianshu_Bosslist.push(name2);
                        game.changeBoss(name2);
                        if(lib.config.extension_术樱_tianshu_addBoss&&_status.Diuse_Xvni_Bool==false){
                            var name3=player.Diuse_bossTianshuName(-5,num2);
                            _status.Diuse_Tianshu_Bosslist.push(name3);
                            game.addBossFellow(newSeat+1,name3);
                        }
                        game.Diuse_tianshuNewBoss(_status.currentPhase.next,num,num2);
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i].name==name1||game.players[i].name==name2&&game.players[i].isFriendOf(game.boss)&&_status.Diuse_Tianshu_Hp){
                                game.players[i].addSkill('Diuse_removeSkills');
                                game.players[i].gainMaxHp(_status.Diuse_Tianshu_Hp);
                                game.players[i].recover(_status.Diuse_Tianshu_Hp);
                                game.players[i].removeSkill('Diuse_removeSkills');
                            }
                        }
                        if(_status.gameMe){
                            game.boss._trueMe=game.me;
                            _status.gameMe=false;
                        }
                        _status.Diuse_Tianshu_nextBool=false;
                        player.Diuse_addAllSkills();
                    }
                    var nextCheckPoint=player.Diuse_bossTianshuName(5,num2);
                    if(nextCheckPoint){
                        if(trigger.source!=undefined) trigger.source.hp!=trigger.source.maxHp?trigger.source.recover():trigger.source.draw(2);
                        var test=1,gameBoss;
                        if(test==1){
                            gameBoss=player.Diuse_gameBossAllDie();
                            test++;
                        }
                        if(gameBoss){
                            if(_status.Diuse_Tianshu_checkPoint<=num3&&lib.config.extension_术樱_tianshuaddoff) {
                                _status.Diuse_Tianshu_nextBool=true;
                            } else {
                                event.goto(0);
                            }
                        } else if(game.me==player&&game.me==game.boss){
                            player.Diuse_gameBossAllDie(1);
                        } 
                    }
                } else {
                    player.die();
                    if(game.me==game.boss){
                        game.over(false);
                    } else {
                        game.over(true);
                    }
                }
                'step 1'
                if(_status.Diuse_Tianshu_nextBool){
                    event.goto(2);
                    player.die(); //因为过关要停止事件 洗牌等 会将BOSS阵亡事件停止
                } else {event.finish();}
                'step 2'
                if((lib.config.extension_术樱_tianshuaddoff==undefined||lib.config.extension_术樱_tianshuaddoff==false)&&_status.Diuse_Tianshu_checkPoint>=4){
                    if(game.me==game.boss){
                        game.over(false);
                    } else {
                        game.over(true);
                    }
                } else if(lib.config.extension_术樱_tianshuaddoff&&_status.Diuse_Tianshu_checkPoint>num3){
                    if(game.me==game.boss){
                        game.over(false);
                    } else {
                        game.over(true);
                    }
                }
                game.delay();
                _status.Diuse_Tianshu_checkPoint++;
                player.Diuse_removeAllSkills();
                if(_status.Diuse_Tianshu_checkPoint<=10) game.Diuse_playerDead(); //先让玩家阵亡角色复活
                if(_status.Diuse_Tianshu_checkPoint>10&&lib.config.extension_术樱_baizhanoff){
                    var point=_status.Diuse_Tianshu_checkPoint%10;
                    switch(point){
                        case 1:{_status.Diuse_Tianshu_Hp++;break;}
                        case 2:{_status.Diuse_Tianshu_Kaishi++;break;}
                        case 3:{_status.Diuse_Tianshu_Hp++;break;}
                        case 4:{_status.Diuse_Tianshu_Jieshu++;break;}
                        case 5:{_status.Diuse_Tianshu_Recover++;break;}
                        case 6:{_status.Diuse_Tianshu_Hp++;break;}
                        case 7:{_status.Diuse_Tianshu_Kaishi++;break;}
                        case 8:{_status.Diuse_Tianshu_Hp++;break;}
                        case 9:{_status.Diuse_Tianshu_Jieshu++;break;}
                        case 0:{_status.Diuse_Tianshu_Hp++;break;}
                    }
                }
                game.Diuse_cardsNumberUpDate();
                if(_status.Diuse_Tianshu_checkPoint<=5) game.Diuse_hpAndH(1,2);
                event.Diuse_Player=[];
                for(var D=0;D<game.players.length;D++){
                    if(game.players[D]==player) continue;
                    if(game.players[D].Diuse_bossTianshuName(0)) continue;
                    if(!game.players[D].isFriendOf(player)) event.Diuse_Player.add(game.players[D]);
                }
                'step 3'
                if(_status.Diuse_Tianshu_checkPoint>5) if(parseInt(_status.Diuse_Tianshu_checkPoint%5)!=0){
                    player.Diuse_hidePlayer(); event.goto(0);
                } 
                'step 4'
                var off;
                if(!_status.skillsList){
                    if(lib.config.extension_术樱_skillsoff){
                        game.Diuse_beiSkillsList();
                        off=4;
                    } else {
                        game.Diuse_skillsList();
                        off=5;
                    }
                }
    
                for(var A=0;A<6;A++){
                    var Diuse_Not = _status.skillsList.randomGet();
                    list.push(Diuse_Not);
                    if(list.length==off) break;
                }
    
                if(!list.length){event.finish();return;}
                switch(lib.config.extension_术樱_tianshu_skill){
                    case 'Zhiheng':{ list.push('制衡'); break;}
                    case 'Wusheng':{ list.push('武圣'); break;}
                    case 'Rende':{ list.push('仁德'); break;}
                    case 'Yingzi':{ list.push('英姿'); break;}
                    case 'Random':{
                        var num=[0,1,2,3].randomGet();
                        if(num==0){ list.push('制衡'); } else if(num==1){ list.push('武圣'); } else if(num==2){
                            list.push('仁德'); } else { list.push('英姿'); 
                        }
                    }
                }
    
                if(lib.config.extension_术樱_skillsoff){
                    game.Diuse_zhuSkillsList();
                    var Diuse_Not = _status.skillsList.randomGet();
                    list.push(Diuse_Not);    
                }
    
                if(!event.Diuse_Player.length) event.finish();
                //list.push('刷新'); goto()
                event.list=list;
                event.play=event.Diuse_Player.shift();
                var name=get.translation(event.play);
                var buttonGiveAiSkills=lib.config.extension_术樱_giveaiskill;
                var dialog=game.getSkillDialog(event.list,name+'选择获得一个技能');
                if(get.config('single_control')==false&&buttonGiveAiSkills){
                    game.me.chooseControl(event.list).set('ai',function(){
                        return 0;
                    }).dialog=dialog;
                } else {
                    event.play.chooseControl(event.list).set('ai',function(){
                        return 0;
                    }).dialog=dialog;
                }
                'step 5'
                if(result.control=='制衡'){ 
                    game.log(event.play.name,'获得了【制衡】技能');
                    event.play.addSkill('zhiheng');
                } else if(result.control=='武圣'){
                    game.log(event.play.name,'获得了【武圣】技能');
                    event.play.addSkill('new_rewusheng');
                } else if(result.control=='仁德'){
                    game.log(event.play.name,'获得了【仁德】技能');
                    event.play.addSkill('Diuse_Rende');
                } else if(result.control=='英姿'){
                    game.log(event.play.name,'获得了【英姿】技能');
                    event.play.addSkill('reyingzi');
                } else {
                    event.skill=result.control
                    game.log(event.play.name,'获得了技能【',event.skill,'】');
                    event.play.addSkill(event.skill);
                    if(event.skill==event.list[event.list.length-1]){
                        if(event.play.storage.TianshuSkill==undefined){
                            event.play.storage.TianshuSkill=event.skill;
                        } else {
                            event.play.removeSkill(event.play.storage.TianshuSkill);
                            game.log(event.play.name,'失去了【',event.play.storage.TianshuSkill,'】技能');
                        }
                    }
                    event.list=[];
                }
                _status.skillsList='';
                'step 6'
                if(event.Diuse_Player.length){
                    event.goto(3);
                } 
                'step 7'
                player.Diuse_hidePlayer(); //隐藏Boss
                event.goto(0);
            },
            group:['_Tianshu_checkPoint_Kuangbao','_Tianshu_checkPoint_Use','_Tianshu_checkPoint_Die','_Tianshu_checkPoint_Jieshu','_Tianshu_checkPoint_Damage','_Tianshu_checkPoint_dieAfter'],
            subSkill:{
                Kuangbao:{ //5回合狂暴
                    trigger:{global:"roundStart"},
                    forced:true,
                    firstDo:true,
                    audio:false,
                    sub:true,
                    popup:false,
                    filter:function(event,player){
                        var bool=_status.Diuse_Tianshu_Bool;
                        if(game.roundNumber!=5) _status.Diuse_Tianshu_fiveBool=false;
                        return bool&&game.roundNumber==5&&lib.config.extension_术樱_kuangbaooff;
                    },
                    content:function(){
                        if(_status.Diuse_Tianshu_fiveBool==false){
                            for(var i=0;i<game.players.length;i++){
                                if(!game.players[i].isFriendOf(game.boss)){
                                    var num=game.players[i].countCards('hej');
                                    game.players[i].chooseToDiscard(true,'hej',num);
                                } else { continue; }
                            }
                        }
                        _status.Diuse_Tianshu_fiveBool=true
                    }
                },
                Use:{ //7回合体力流失和加强Boss
                    trigger:{player:"phaseUseBegin"},
                    forced:true,
                    firstDo:true,
                    audio:false,
                    sub:true,
                    popup:false,
                    filter:function(event,player){
                        var bool=_status.Diuse_Tianshu_Bool;
                        if(bool) game.Diuse_changeSeatNew(); //修正座位
                        
                        return bool&&(lib.config.extension_术樱_baizhanoff||lib.config.extension_术樱_kuangbaooff);
                    },
                    content:function(){
                        if(game.roundNumber>=7&&!player.isFriendOf(game.boss)&&lib.config.extension_术樱_kuangbaooff) player.loseHp();
                        if(lib.config.extension_术樱_baizhanoff&&lib.config.extension_术樱_tianshu_new>10&&player.isFriendOf(game.boss)){
                            if(_status.Diuse_Tianshu_Kaishi) player.draw(_status.Diuse_Tianshu_Kaishi);
                            if(_status.Diuse_Tianshu_Recover) player.recover(_status.Diuse_Tianshu_Recover);
                        }
                    },
                },
                Die:{ //玩家阵亡
                    trigger:{player:'dieBegin'},
                    forced:true,
                    popup:false,
                    lastDo:true,
                    charlotte:true,
                    unique: true,
                    forceDie:true,
                    filter:function(event,player){
                        var checkPointNum=_status.Diuse_Tianshu_checkPoint,bool=_status.Diuse_Tianshu_Bool;
                        if(checkPointNum>=6) checkPointNum=5;
                        if(bool&&!player.Diuse_bossTianshuName(checkPointNum,_status.Diuse_Tianshu_Difficulty)&&player==event.player&&!player.storage.Tianshu_checkPoint) return true;
                        return false;
                    },
                    content:function(){
                        var num=_status.Diuse_Tianshu_checkPoint;
                        var num2=_status.Diuse_Tianshu_Difficulty;
                        var gamePlayerNum=0;
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            if(!game.players[i].Diuse_bossTianshuName(num,num2)&&!game.players[i].Diuse_bossTianshuName(0,num2)){
                                gamePlayerNum++;
                            }
                        }
                        if(gamePlayerNum==0){
                            _status.Diuse_Tianshu_playerDieBool=true;
                        }
                    },
                },
                dieAfter:{ //玩家全部阵亡然后结算
                    trigger:{global:'dieAfter'},
                    forced:true,
                    popup:false,
                    lastDo:true,
                    charlotte:true,
                    unique: true,
                    forceDie:true,
                    filter:function(){
                        return _status.Diuse_Tianshu_playerDieBool;
                    },
                    content:function(){
                        if(_status.Diuse_Tianshu_playerDieBool){
                            if(game.me==game.boss){
                                game.over(true);
                            } else {
                                game.over(false);
                            }
                        }
                    },
                },
                Jieshu:{ 
                    trigger:{player:"phaseJieshuBegin"},
                    forced:true,
                    firstDo:true,
                    audio:false,
                    sub:true,
                    popup:false,
                    filter:function(event,player){
                        return _status.Diuse_Tianshu_Bool&&lib.config.extension_术樱_baizhanoff&&_status.Diuse_Tianshu_Jieshu&&player.isFriendOf(game.boss);
                    },
                    content:function(){
                        player.draw(_status.Diuse_Tianshu_Jieshu);
                    },
                },
                Damage:{ 
                    trigger:{source:"damageBegin"},
                    forced:true,
                    firstDo:true,
                    audio:false,
                    sub:true,
                    popup:false,
                    filter:function(event,player){
                        return _status.Diuse_Tianshu_Bool&&lib.config.extension_术樱_baizhanoff&&_status.Diuse_Tianshu_Damage&&player.isFriendOf(game.boss);
                    },
                    content:function(){
                        trigger.num+=_status.Diuse_Tianshu_Damage;
                    },
                },
            },
        };

        lib.skill._Jiuzi_checkPoint={
            trigger:{
                player:'dieBegin',
                global:"gameDrawAfter",
            },
            forced:true,
            charlotte:true,
            popup:false,
            lastDo:true,
            unique: true,
            forceDie:true,
            filter:function(){},
            content:function(){},
            group:['_Jiuzi_checkPoint_Draw'],
            subSkill:{
                Draw:{
                    trigger:{player:["drawBefore"]},
                    forced:true,
                    charlotte:true,
                    firstDo:true,
                    audio:false,
                    sub:true,
                    popup:false,
                    filter:function(event,player){
                        return _status.Diuse_Jiuzi_Bool&&!event.player.isFriendOf(game.boss);
                    },
                    content:function(){
                        trigger.cancel();
                    },
                },
            },
        };

        lib.skill._NewPVE_checkPoint={ //NewPve
            trigger:{
                player:'dieBegin',
                global:"gameDrawAfter",
            },
            forced:true,
            charlotte:true,
            popup:false,
            lastDo:true,
            unique: true,
            forceDie:true,
            filter:function(event,player){
                return _status.Diuse_NewPVE;
            },
            content:function(){
                if(trigger.getParent().name=='gameDraw'){
                    if(game.me==game.boss){
                        alert('该模式不支持应战，即将重启');
                        setTimeout(function(){
                            setTimeout(game.reload,1500);
                        }, 1500);
                    }
                } else if(game.roundNumber!=0){
                    player.Diuse_eventEnd();
                }
            },
            group:['_NewPVE_checkPoint_Die','_NewPVE_checkPoint_dieAfter','_NewPVE_checkPoint_Damage'],
            subSkill:{
                Die:{ //玩家阵亡
                    trigger:{player:'dieBegin'},
                    forced:true,
                    popup:false,
                    lastDo:true,
                    charlotte:true,
                    unique: true,
                    forceDie:true,
                    filter:function(event,player){
                        return _status.Diuse_PVEPlayer==event.player;
                    },
                    content:function(){
                        _status.Diuse_NewPVE_playerDieBool=true;
                    },
                },
                dieAfter:{ //玩家全部阵亡然后结算
                    trigger:{global:'dieAfter'},
                    forced:true,
                    popup:false,
                    lastDo:true,
                    charlotte:true,
                    unique: true,
                    forceDie:true,
                    filter:function(){
                        return _status.Diuse_NewPVE_playerDieBool;
                    },
                    content:function(){
                        game.over(false);
                    },
                },
                Damage:{
                    trigger:{player:'damageAfter'},
                    forced:true,
                    popup:false,
                    lastDo:true,
                    charlotte:true,
                    unique: true,
                    forceDie:true,
                    filter:function(event){
                        return event.num==game.Diuse_buffEvent();
                    },
                    content:function(){
                        //_status.Diuse_PVEPlayer.Diuse_showEvent();
                    },
                },
            },
        };
    };

    game.Diuse_Tianshu("Diuse_Tianshu","天书乱斗",{
        character:{
            character:{
                Boss_Diuse_Tianshu:["male","",0,["Boss_Diuse_Tianshu_Go","Boss_Diuse_Tianshu_intro1","Boss_Diuse_Tianshu_intro2","Boss_Diuse_Tianshu_intro3","Boss_Diuse_Tianshu_intro4","Boss_Diuse_Tianshu_intro5"],["boss"],"qun"],
                //Boss_Diuse_Jiuzi:["male","",0,["Boss_Diuse_Jiuzi_Go","Boss_Diuse_Jiuzi_intro1","Boss_Diuse_Jiuzi_intro2","Boss_Diuse_Jiuzi_intro3","Boss_Diuse_Jiuzi_intro4","Boss_Diuse_Jiuzi_intro5"],["boss"],"qun"],
                Boss_Diuse_Fengyun:["male","",0,["Boss_Diuse_Fengyun_Go"/*,"Boss_Diuse_Fengyun_intro1","Boss_Diuse_Fengyun_intro2","Boss_Diuse_Fengyun_intro3","Boss_Diuse_Fengyun_intro4","Boss_Diuse_Fengyun_intro5"*/],["boss"],"qun"],
                //beta:['male','qun',7,['xixi'],['qun']],

                //Diuse_Huang:['male','qun',5,[],['qun','hiddenboss','bossallowed']],

                Shengxiao_Zishu:['male','qun',5,['Boss_Shengxiao_Zishu'],['qun','hiddenboss','bossallowed']],
                Shengxiao_Chouniu:['male','qun',9,['Boss_Shengxiao_Chouniu'],['qun','hiddenboss','bossallowed']],
                Shengxiao_Yinhu:['male','qun',6,['Boss_Shengxiao_Yinhu'],['qun','hiddenboss','bossallowed']],
                Shengxiao_Maotu:['female','qun',5,['Boss_Shengxiao_Maotu'],['qun','hiddenboss','bossallowed']], 
                Shengxiao_Chenlong:['male','qun',6,['Boss_Shengxiao_Chenlong'],['qun','hiddenboss','bossallowed']],
                Shengxiao_Sishe:['female','qun',5,['Boss_Shengxiao_Sishe'],['qun','hiddenboss','bossallowed']], 
                Shengxiao_Wuma:['male','qun',6,['Boss_Shengxiao_Wuma'],['qun','hiddenboss','bossallowed']],
                Shengxiao_Weiyang:['female','qun',5,['Boss_Shengxiao_Weiyang'],['qun','hiddenboss','bossallowed']], 
                Shengxiao_Shenhou:['male','qun',5,['Boss_Shengxiao_Shenhou'],['qun','hiddenboss','bossallowed']],
                Shengxiao_Youji:['male','qun',5,['Boss_Shengxiao_Youji'],['qun','hiddenboss','bossallowed']],
                Shengxiao_Xvgou:['male','qun',6,['Boss_Shengxiao_Xvgou'],['qun','hiddenboss','bossallowed']],
                Shengxiao_Haizhu:['male','qun',7,['Boss_Shengxiao_Haizhu'],['qun','hiddenboss','bossallowed']],
    
                Nianshou_Dawei:['male','shen',10,['Nianshou_Fange'],['qun','hiddenboss','bossallowed']],
                Nianshou_Dashu:['male','shen',7,['Nianshou_Siyao','Nianshou_Hengsao'],['qun','hiddenboss','bossallowed']],
                Nianshou_Dawu:['female','shen',8,['Nianshou_Zhuyan','Nianshou_Xiaoji'],['qun','hiddenboss','bossallowed']], 
                Nianshou_Daqun:['male','shen',10,['Nianshou_Qunxiang','Nianshou_Tanshi'],['qun','hiddenboss','bossallowed']],
                Xishou_Dawei:['male','shen',9,['Xishou_Taoyuan'],['qun','hiddenboss','bossallowed']],
                Xishou_Dashu:['male','shen',8,['Xishou_Paoxiao','Xishou_Lizhan'],['qun','hiddenboss','bossallowed']],
                Xishou_Dawu:['female','shen',7,['Xishou_Mingzhe','Xishou_Tianxiang'],['qun','hiddenboss','bossallowed']], 
                Xishou_Daqun:['male','shen',8,['Xishou_Juxiang','Xishou_Shouxi'],['qun','hiddenboss','bossallowed']],
    
                Qingqing_Boss_Dongzhuo:['male','qun',10,['Qingqing_Boss_Jiuchi','Qingqing_Boss_Roulin','Qingqing_Boss_Baonue'],['qun','hiddenboss','bossallowed']],
                Qingqing_Boss_Dongzhuo_Difficulty:['male','qun',20,['Qingqing_Boss_Jiuchi','Qingqing_Boss_Roulin','Qingqing_Boss_Baonue_Difficulty','Qingqing_Boss_Qvbu'],['qun','hiddenboss','bossallowed']],
                Qingqing_Boss_Dongzhuo_Fucking:['male','qun',30,['Qingqing_Boss_Jiuchi','Qingqing_Boss_Roulin','Qingqing_Boss_Baonue_Fucking','Qingqing_Boss_Qvbu_Fucking'],['qun','hiddenboss','bossallowed']],
                Qingqing_Boss_Yuanshu:['male','qun',10,['Qingqing_Boss_Yongsi','Qingqing_Boss_Wangzun'],['qun','hiddenboss','bossallowed']],
                Qingqing_Boss_Yuanshu_Difficulty:['male','qun',20,['Qingqing_Boss_Yongsi','Qingqing_Boss_Wangzun','Qingqing_Boss_Duoxi'],['qun','hiddenboss','bossallowed']],
                Qingqing_Boss_Yuanshu_Fucking:['male','qun',30,['Qingqing_Boss_Yongsi','Qingqing_Boss_Wangzun_Fucking','Qingqing_Boss_Duoxi_Fucking'],['qun','hiddenboss','bossallowed']],
                Qingqing_Boss_Lvbu:['male','qun',10,['Qingqing_Boss_Mashu','Qingqing_Boss_Wushuang','Qingqing_Boss_Shenji'],['qun','hiddenboss','bossallowed']],
                Qingqing_Boss_Lvbu_Difficulty:['male','qun',20,['Qingqing_Boss_Mashu','Qingqing_Boss_Wushuang','Qingqing_Boss_Shenji','Qingqing_Boss_Zhanjia'],['qun','hiddenboss','bossallowed']],
                Qingqing_Boss_Lvbu_Fucking:['male','qun',30,['Qingqing_Boss_Mashu','Qingqing_Boss_Wushuang','Qingqing_Boss_Shenji_Fucking','Qingqing_Boss_Zhanjia'],['qun','hiddenboss','bossallowed']],
                Qingqing_Boss_Simayi:['male','qun',10,['Qingqing_Boss_Fankui','Qingqing_Boss_Guicai','Qingqing_Boss_Langgu'],['qun','hiddenboss','bossallowed']],
                Qingqing_Boss_Simayi_Difficulty:['male','qun',20,['Qingqing_Boss_Fankui','Qingqing_Boss_Guicai','Qingqing_Boss_Langgu','Qingqing_Boss_Yuanlv'],['qun','hiddenboss','bossallowed']],
                Qingqing_Boss_Simayi_Fucking:['male','qun',30,['Qingqing_Boss_Fankui','Qingqing_Boss_Guicai','Qingqing_Boss_Langgu_Fucking','Qingqing_Boss_Yuanlv'],['qun','hiddenboss','bossallowed']],
                Qingqing_Boss_Caocao:['male','qun',10,['Qingqing_Boss_Jianxiong','Qingqing_Boss_Lingba'],['qun','hiddenboss','bossallowed']],
                Qingqing_Boss_Caocao_Difficulty:['male','qun',20,['Qingqing_Boss_Jianxiong','Qingqing_Boss_Lingba','Qingqing_Boss_Ningshen'],['qun','hiddenboss','bossallowed']],
                Qingqing_Boss_Caocao_Fucking:['male','qun',30,['Qingqing_Boss_Jianxiong','Qingqing_Boss_Lingba_Fucking','Qingqing_Boss_Ningshen_Fucking'],['qun','hiddenboss','bossallowed']],
                Qingqing_Boss_Zhangjiao:['male','qun',10,['Qingqing_Boss_Guidao','Qingqing_Boss_Leiji','Qingqing_Boss_Jianzheng'],['qun','hiddenboss','bossallowed']],
                Qingqing_Boss_Zhangjiao_Difficulty:['male','qun',20,['Qingqing_Boss_Guidao','Qingqing_Boss_Leiji','Qingqing_Boss_Jianzheng','Qingqing_Boss_Yinlei'],['qun','hiddenboss','bossallowed']],
                Qingqing_Boss_Zhangjiao_Fucking:['male','qun',30,['Qingqing_Boss_Guidao','Qingqing_Boss_Leiji','Qingqing_Boss_Jianzheng_Fucking','Qingqing_Boss_Yinlei_Fucking'],['qun','hiddenboss','bossallowed']],
    
                Zhuogui_Boss_Baowei:['male','qun',7,['Zhuogui_Boss_Yinsha','Zhuogui_Boss_Eli'],['qun','hiddenboss','bossallowed']],
                Zhuogui_Boss_Baowei_Difficulty:['male','qun',10,['Zhuogui_Boss_Yinsha','Zhuogui_Boss_Eli','Zhuogui_Boss_Guimei'],['qun','hiddenboss','bossallowed']],
                Zhuogui_Boss_Baowei_Fucking:['male','qun',13,['Zhuogui_Boss_Yinsha','Zhuogui_Boss_Eli','Zhuogui_Boss_Guimei'],['qun','hiddenboss','bossallowed']],
                Zhuogui_Boss_Heibaiwuchang:['male','qun',7,['Zhuogui_Boss_Xixing','Zhuogui_Boss_Taiping','Zhuogui_Boss_Mizui'],['qun','hiddenboss','bossallowed']],
                Zhuogui_Boss_Heibaiwuchang_Difficulty:['male','qun',11,['Zhuogui_Boss_Xixing_Difficulty','Zhuogui_Boss_Taiping','Zhuogui_Boss_Mizui_Fucking','Zhuogui_Boss_Qiangzheng'],['qun','hiddenboss','bossallowed']],
                Zhuogui_Boss_Heibaiwuchang_Fucking:['male','qun',15,['Zhuogui_Boss_Xixing_Fucking','Zhuogui_Boss_Taiping_Fucking','Zhuogui_Boss_Mizui_Fucking','Zhuogui_Boss_Qiangzheng_Fucking'],['qun','hiddenboss','bossallowed']],
                Zhuigui_Boss_Huangfeng:['male','qun',7,['Zhuogui_Boss_Duzhen','Zhuogui_Boss_Mingchong','Zhuogui_Boss_Guimei'],['qun','hiddenboss','bossallowed']],
                Zhuigui_Boss_Huangfeng_Difficulty:['male','qun',10,['Zhuogui_Boss_Duzhen','Zhuogui_Boss_Mingchong','Zhuogui_Boss_Guimei'],['qun','hiddenboss','bossallowed']],
                Zhuigui_Boss_Huangfeng_Fucking:['male','qun',13,['Zhuogui_Boss_Duzhen','Zhuogui_Boss_Mingchong','Zhuogui_Boss_Guimei'],['qun','hiddenboss','bossallowed']],
                Zhuigui_Boss_Yanluowang:['male','qun',10,['Zhuogui_Boss_Tiemian','Zhuogui_Boss_Difu','Zhuogui_Boss_Zhennu'],['qun','hiddenboss','bossallowed']],
                Zhuigui_Boss_Yanluowang_Difficulty:['male','qun',13,['Zhuogui_Boss_Tiemian','Zhuogui_Boss_Difu','Zhuogui_Boss_Zhennu','Zhuogui_Boss_Xingpan'],['qun','hiddenboss','bossallowed']],
                Zhuigui_Boss_Yanluowang_Fucking:['male','qun',16,['Zhuogui_Boss_Tiemian','Zhuogui_Boss_Difu','Zhuogui_Boss_Zhennu','Zhuogui_Boss_Xingpan','Zhuogui_Boss_Dianwei'],['qun','hiddenboss','bossallowed']],
                Zhuogui_Boss_Yvsai:['female','qun',10,['Zhuogui_Boss_Guixi','Zhuogui_Boss_Anchao'],['qun','hiddenboss','bossallowed']],
                Zhuogui_Boss_Yvsai_Difficulty:['female','qun',13,['Zhuogui_Boss_Guixi','Zhuogui_Boss_Anchao','Zhuogui_Boss_Guimei_Female'],['qun','hiddenboss','bossallowed']],
                Zhuogui_Boss_Yvsai_Fucking:['female','qun',16,['Zhuogui_Boss_Guixi','Zhuogui_Boss_Anchao','Zhuogui_Boss_Guimei_Female'],['qun','hiddenboss','bossallowed']],
                Zhuogui_Boss_Niutoumamian:['male','qun',7,['Zhuogui_Boss_Xiaoshou','Zhuogui_Boss_Manji','Zhuogui_Boss_Shiyv'],['qun','hiddenboss','bossallowed']],
                Zhuogui_Boss_Niutoumamian_Difficulty:['male','qun',9,['Zhuogui_Boss_Xiaoshou_Difficulty','Zhuogui_Boss_Manji_Fucking','Zhuogui_Boss_Shiyv','Zhuogui_Boss_Guizhao'],['qun','hiddenboss','bossallowed']],
                Zhuogui_Boss_Niutoumamian_Fucking:['male','qun',11,['Zhuogui_Boss_Xiaoshou_Fucking','Zhuogui_Boss_Manji_Fucking','Zhuogui_Boss_Shiyv','Zhuogui_Boss_Guizhao'],['qun','hiddenboss','bossallowed']],
                Zhuogui_Boss_Niaozui:['male','qun',7,['Zhuogui_Boss_Bingyi','Zhuogui_Boss_Suoxue'],['qun','hiddenboss','bossallowed']],
                Zhuogui_Boss_Niaozui_Difficulty:['male','qun',9,['Zhuogui_Boss_Bingyi','Zhuogui_Boss_Suoxue','Zhuogui_Boss_Guimei'],['qun','hiddenboss','bossallowed']],
                Zhuogui_Boss_Niaozui_Fucking:['male','qun',11,['Zhuogui_Boss_Bingyi','Zhuogui_Boss_Suoxue','Zhuogui_Boss_Guimei'],['qun','hiddenboss','bossallowed']],
    
                Tianshu_Boss_Xuannv:['female','shen',12,['Tianshu_Boss_Dishi','Tianshu_Boss_Jiutian',],['qun','hiddenboss','bossallowed']],
                Tianshu_Boss_Xuannv_Difficulty:['female','shen',15,['Tianshu_Boss_Dishi','Tianshu_Boss_Jiutian','Tianshu_Boss_Xuanlie'],['qun','hiddenboss','bossallowed']],
                Tianshu_Boss_Xuannv_Fucking:['female','shen',19,['Tianshu_Boss_Dishi','Tianshu_Boss_Jiutian','Tianshu_Boss_Xuanlie','Tianshu_Boss_Shenqu'],['qun','hiddenboss','bossallowed']],
                Tianshu_Boss_Hanba:['female','shen',9,['Tianshu_Boss_Fenshi','Tianshu_Boss_Zhiri'],['qun','hiddenboss','bossallowed']],
                Tianshu_Boss_Hanba_Difficulty:['female','shen',11,['Tianshu_Boss_Fenshi','Tianshu_Boss_Zhiri','Tianshu_Boss_Xinji'],['qun','hiddenboss','bossallowed']],
                Tianshu_Boss_Hanba_Fucking:['female','shen',13,['Tianshu_Boss_Fenshi','Tianshu_Boss_Zhiri_Fuck','Tianshu_Boss_Xinji'],['qun','hiddenboss','bossallowed']],
                Tianshu_Boss_Shaohao:['male','shen',12,['Tianshu_Boss_Shenen','Tianshu_Boss_Baiyi'],['qun','hiddenboss','bossallowed']],
                Tianshu_Boss_Shaohao_Difficulty:['male','shen',15,['Tianshu_Boss_Shenen','Tianshu_Boss_Baiyi'],['qun','hiddenboss','bossallowed']],
                Tianshu_Boss_Shaohao_Fucking:['male','shen',19,['Tianshu_Boss_Shenen','Tianshu_Boss_Baiyi_Fucking'],['qun','hiddenboss','bossallowed']],
                Tianshu_Boss_Shuishengonggong:['male','shen',9,['Tianshu_Boss_Juehong'],['qun','hiddenboss','bossallowed']],
                Tianshu_Boss_Shuishengonggong_Difficulty:['male','shen',11,['Tianshu_Boss_Juehong'],['qun','hiddenboss','bossallowed']],
                Tianshu_Boss_Shuishengonggong_Fucking:['male','shen',13,['Tianshu_Boss_Juehong_Fucking'],['qun','hiddenboss','bossallowed']],
                Tianshu_Boss_Baiqi:['male','shen',9,['Tianshu_Boss_Wuan','Tianshu_Boss_Changsheng'],['qun','hiddenboss','bossallowed']],
                Tianshu_Boss_Baiqi_Difficulty:['male','shen',11,['Tianshu_Boss_Wuan','Tianshu_Boss_Changsheng','Tianshu_Boss_Shashen'],['qun','hiddenboss','bossallowed']],
                Tianshu_Boss_Baiqi_Fucking:['male','shen',13,['Tianshu_Boss_Wuan_Fucking','Tianshu_Boss_Changsheng','Tianshu_Boss_Shashen_Fucking'],['qun','hiddenboss','bossallowed']],
                Tianshu_Boss_Kuafu:['male','shen',12,['Tianshu_Boss_Zhuri','Tianshu_Boss_Yinjiang'],['qun','hiddenboss','bossallowed']],
                Tianshu_Boss_Kuafu_Difficulty:['male','shen',15,['Tianshu_Boss_Zhuri','Tianshu_Boss_Yinjiang','Tianshu_Boss_Lieben'],['qun','hiddenboss','bossallowed']],
                Tianshu_Boss_Kuafu_Fucking:['male','shen',19,['Tianshu_Boss_Zhuri','Tianshu_Boss_Yinjiang','Tianshu_Boss_Lieben','Tianshu_Boss_Shenqu_Kuafu'],['qun','hiddenboss','bossallowed']],
                Tianshu_Boss_Huoshenzhurong:['male','shen',9,['Tianshu_Boss_Xingxia'],['qun','hiddenboss','bossallowed']],
                Tianshu_Boss_Huoshenzhurong_Difficulty:['male','shen',11,['Tianshu_Boss_Xingxia'],['qun','hiddenboss','bossallowed']],
                Tianshu_Boss_Huoshenzhurong_Fucking:['male','shen',13,['Tianshu_Boss_Xingxia_Fucking'],['qun','hiddenboss','bossallowed']],


                Longzhou_Boss_Taoshen:['male','shen',12,['Longzhou_Boss_Tianqi','Longzhou_Boss_Nutao','Qingqing_Boss_Mashu'],['qun','hiddenboss','bossallowed']],
                Longzhou_Boss_Taoshen_Difficulty:['male','shen',15,['Longzhou_Boss_Tianqi','Longzhou_Boss_Nutao_Difficulty','Qingqing_Boss_Mashu','Longzhou_Boss_Yingzi','Qingqing_Boss_Wushuang'],['qun','hiddenboss','bossallowed']],
                Longzhou_Boss_Taoshen_Fucking:['male','shen',20,['Longzhou_Boss_Tianqi','Longzhou_Boss_Nutao_Fucking','Qingqing_Boss_Mashu','Longzhou_Boss_Xiongzi','Qingqing_Boss_Wushuang','Longzhou_Boss_Paoxiao'],['qun','hiddenboss','bossallowed']],
                Longzhou_Boss_Caoe:['female','shen',12,['Longzhou_Boss_Tianqi','Longzhou_Boss_Shoujiang','Qingqing_Boss_Mashu'],['qun','hiddenboss','bossallowed']],
                Longzhou_Boss_Caoe_Difficulty:['female','shen',15,['Longzhou_Boss_Tianqi','Longzhou_Boss_Shoujiang_Difficulty','Qingqing_Boss_Mashu','Longzhou_Boss_Luoshen','Longzhou_Boss_Biyue'],['qun','hiddenboss','bossallowed']],
                Longzhou_Boss_Caoe_Fucking:['female','shen',20,['Longzhou_Boss_Shoujiang_Fucking','Qingqing_Boss_Mashu','Longzhou_Boss_Luoshen','Longzhou_Boss_Biyue','Longzhou_Boss_Jizhi','Longzhou_Boss_Tianqi'],['qun','hiddenboss','bossallowed']],
    
                Xvni_Xiaosha:["female","qun",4,['Diuse_Xvni_Xiaosha_Guisha','Diuse_Xvni_Xiaosha_Zhuli','Diuse_Xvni_Xvxiang'],['qun','hiddenboss','bossallowed']],
                Xvni_Xiaoshan:["female","qun",4,['Diuse_Xvni_Xiaoshan_Shanwu','Diuse_Xvni_Xiaoshan_Xianli','Diuse_Xvni_Xvxiang'],['qun','hiddenboss','bossallowed']],
                Xvni_Xiaojiu:["female","qun",4,['Diuse_Xvni_Xiaojiu_Meiniang','Diuse_Xvni_Xiaojiu_Yaoli','Diuse_Xvni_Xvxiang'],['qun','hiddenboss','bossallowed']],
                Xvni_Xiaotao:["female","qun",4,['Diuse_Xvni_Xiaotao_TaoYan','Diuse_Xvni_Xiaotao_Yanli','Diuse_Xvni_Xvxiang'],['qun','hiddenboss','bossallowed']],
                Xvni_Xiaole:["female","qun",4,['Diuse_Xvni_Xiaole_Leyv','Diuse_Xvni_Xiaole_Yuanli','Diuse_Xvni_Xvxiang'],['qun','hiddenboss','bossallowed']],
            },
            translate:{
                Boss_Diuse_Tianshu:"天书乱斗",
                Boss_Diuse_Jiuzi:"九字真言",
                Boss_Diuse_Fengyun:"风云再起",
                beta:"测试将",
                Diuse_Huang:"黄巾兵",
                Shengxiao_Zishu:"子鼠",
                Shengxiao_Chouniu:"丑牛",
                Shengxiao_Yinhu:"寅虎",
                Shengxiao_Maotu:"卯兔",
                Shengxiao_Chenlong:"辰龙",
                Shengxiao_Sishe:"巳蛇",
                Shengxiao_Wuma:"午马",
                Shengxiao_Weiyang:"未羊",
                Shengxiao_Shenhou:"申猴",
                Shengxiao_Youji:"酉鸡",
                Shengxiao_Xvgou:"戌狗",
                Shengxiao_Haizhu:"亥猪",
                Nianshou_Dawei:"年兽大魏",
                Nianshou_Dashu:"年兽大蜀",
                Nianshou_Dawu:"年兽大吴", 
                Nianshou_Daqun:"年兽大群",
                Xishou_Dawei:"夕兽大魏",
                Xishou_Dashu:"夕兽大蜀",
                Xishou_Dawu:"夕兽大吴", 
                Xishou_Daqun:"夕兽大群",
    
                Zhuogui_Boss_Baowei:"豹尾",
                Zhuogui_Boss_Baowei_Difficulty:"豹尾",
                Zhuogui_Boss_Baowei_Fucking:"豹尾",
                Zhuogui_Boss_Heibaiwuchang:"黑白无常",
                Zhuogui_Boss_Heibaiwuchang_Difficulty:"黑白无常",
                Zhuogui_Boss_Heibaiwuchang_Fucking:"黑白无常",
                Zhuigui_Boss_Huangfeng:"黄蜂",
                Zhuigui_Boss_Huangfeng_Difficulty:"黄蜂",
                Zhuigui_Boss_Huangfeng_Fucking:"黄蜂",
                Zhuigui_Boss_Yanluowang:"阎罗王",
                Zhuigui_Boss_Yanluowang_Difficulty:"阎罗王",
                Zhuigui_Boss_Yanluowang_Fucking:"阎罗王",
                Zhuogui_Boss_Yvsai:"鱼鳃",
                Zhuogui_Boss_Yvsai_Difficulty:"鱼鳃",
                Zhuogui_Boss_Yvsai_Fucking:"鱼鳃",
                Zhuogui_Boss_Niutoumamian:"牛头马面",
                Zhuogui_Boss_Niutoumamian_Difficulty:"牛头马面",
                Zhuogui_Boss_Niutoumamian_Fucking:"牛头马面",
                Zhuogui_Boss_Niaozui:"鸟嘴",
                Zhuogui_Boss_Niaozui_Difficulty:"鸟嘴",
                Zhuogui_Boss_Niaozui_Fucking:"鸟嘴",
    
                Qingqing_Boss_Dongzhuo:"董卓",
                Qingqing_Boss_Dongzhuo_Difficulty:"董卓",
                Qingqing_Boss_Dongzhuo_Fucking:"董卓",
                Qingqing_Boss_Yuanshu:"袁术",
                Qingqing_Boss_Yuanshu_Difficulty:"袁术",
                Qingqing_Boss_Yuanshu_Fucking:"袁术",
                Qingqing_Boss_Lvbu:"吕布",
                Qingqing_Boss_Lvbu_Difficulty:"吕布",
                Qingqing_Boss_Lvbu_Fucking:"吕布",
                Qingqing_Boss_Simayi:"司马懿",
                Qingqing_Boss_Simayi_Difficulty:"司马懿",
                Qingqing_Boss_Simayi_Fucking:"司马懿",
                Qingqing_Boss_Caocao:"曹操",
                Qingqing_Boss_Caocao_Difficulty:"曹操",
                Qingqing_Boss_Caocao_Fucking:"曹操",
                Qingqing_Boss_Zhangjiao:"张角",
                Qingqing_Boss_Zhangjiao_Difficulty:"张角",
                Qingqing_Boss_Zhangjiao_Fucking:"张角",
    
                Tianshu_Boss_Xuannv:"玄女",
                Tianshu_Boss_Xuannv_Difficulty:"玄女",
                Tianshu_Boss_Xuannv_Fucking:"玄女",
                Tianshu_Boss_Hanba:"旱魃",
                Tianshu_Boss_Hanba_Difficulty:"旱魃",
                Tianshu_Boss_Hanba_Fucking:"旱魃",
                Tianshu_Boss_Shaohao:"少昊",
                Tianshu_Boss_Shaohao_Difficulty:"少昊",
                Tianshu_Boss_Shaohao_Fucking:"少昊",
                Tianshu_Boss_Shuishengonggong:"水神共工",
                Tianshu_Boss_Shuishengonggong_Difficulty:"水神共工",
                Tianshu_Boss_Shuishengonggong_Fucking:"水神共工",
                Tianshu_Boss_Huoshenzhurong:"火神祝融",
                Tianshu_Boss_Huoshenzhurong_Difficulty:"火神祝融",
                Tianshu_Boss_Huoshenzhurong_Fucking:"火神祝融",
                Tianshu_Boss_Baiqi:"白起",
                Tianshu_Boss_Baiqi_Difficulty:"白起",
                Tianshu_Boss_Baiqi_Fucking:"白起",
                Tianshu_Boss_Kuafu:"夸父",
                Tianshu_Boss_Kuafu_Difficulty:"夸父",
                Tianshu_Boss_Kuafu_Fucking:"夸父",

                Longzhou_Boss_Taoshen:"涛神",
                Longzhou_Boss_Taoshen_Difficulty:"涛神",
                Longzhou_Boss_Taoshen_Fucking:"涛神",
                Longzhou_Boss_Caoe:"曹娥",
                Longzhou_Boss_Caoe_Difficulty:"曹娥",
                Longzhou_Boss_Caoe_Fucking:"曹娥",
    
                Xvni_Xiaosha:"小杀",
                Xvni_Xiaoshan:"小闪",
                Xvni_Xiaojiu:"小酒",
                Xvni_Xiaotao:"小桃",
                Xvni_Xiaole:"小乐",
    
                Boss_Ordinary_Hankui:"普通旱魁",
                Boss_Difficulty_Hankui:"困难旱魁",
                Boss_Fucking_Hankui:"阴间旱魁",
                Boss_Ordinary_Baiqi:"普通白起",
                Boss_Difficulty_Baiqi:"困难白起",
                Boss_Fucking_Baiqi:"阴间白起",
                Boss_Ordinary_WangshenBaiqi:"普通亡神白起",
                Boss_Difficulty_WangshenBaiqi:"困难亡神白起",
                Boss_Fucking_WangshenBaiqi:"阴间亡神白起",
                Boss_Ordinary_Guiyanwang:"普通鬼阎王",
                Boss_Difficulty_Guiyanwang:"困难鬼阎王",
                Boss_Fucking_Guiyanwang:"困难鬼阎王",
            },
        },
        init:function(){
            for(var i in lib.character.character){
                if(lib.character.character[i][4].contains('hiddenboss')) continue;
                lib.character.character.config[i+'_boss_config']={
                    name:get.translation(i),
                    init:true,
                    unfrequent:true,
                }
            }
        },
        game:{ //Boss自定义函数处
            getSkillDialog:function(skills,prompt){ //GUI
                var dialog=ui.create.dialog('hidden','forcebutton');
                if(prompt) dialog.addText(prompt);
                for(var i=0;i<skills.length;i++){
                    dialog.add('<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【'+get.translation(skills[i])+'】</div><div>'+lib.translate[skills[i]+'_info']+'</div></div>');
                }
                dialog.addText(' <br> ');
                return dialog;
            },
            Diuse_skillsList:function(){ //普通技能
                var skills=[];
                var banned=[
                    'huoxin','jueqing','qinqing','beige','huashen','drlt_zhiti','olzhiti','xinfu_pdgyingshi','rebeige'
                ];
                var characters=[];
                for(var name in lib.character){
                    if(!lib.character[name]) continue;
                    if(lib.filter.characterDisabled(name)) continue;
                    if(name.indexOf('boss_')==0) continue;
                    var skillsx=lib.character[name][3];
                    if(lib.character[name][4]) lib.character[name][4].remove('hiddenSkill');
                    characters.push(name);
                    var list=skillsx;
                    for(var j=0;j<skillsx.length;j++){
                        var info=get.info(skillsx[j]);
                        if(!info){
                            skillsx.splice(j,1);
                            list.splice(j--,1);
                            continue;
                        }
                        if(typeof info.derivation=='string') list.push(info.derivation);
                        else if(Array.isArray(info.derivation)) list.addArray(info.derivation);
                    }
                    for(var j=0;j<list.length;j++){
                        if(skills.contains(list[j])||banned.contains(list[j])) continue;
                        var info=get.info(list[j]);
                        if(!info||info.charlotte||(info.unique&&!info.gainable)||info.juexingji||info.limited||info.zhuSkill||info.hiddenSkill||info.dutySkill) continue;
                        skills.push(list[j]);
                    }
                }
                _status.skillsList=skills;
            },
            Diuse_zhuSkillsList:function(){ //主动技能
                var skills=[];
                var banned=[
                    'huoxin','jueqing','qinqing','beige','huashen','drlt_zhiti','olzhiti','xinfu_pdgyingshi','rebeige'
                ];
                var characters=[];
                for(var name in lib.character){
                    if(!lib.character[name]) continue;
                    if(lib.filter.characterDisabled(name)) continue;
                    if(name.indexOf('boss_')==0) continue;
                    var skillsx=lib.character[name][3];
                    if(lib.character[name][4]) lib.character[name][4].remove('hiddenSkill');
                    characters.push(name);
                    var list=skillsx;
                    for(var j=0;j<skillsx.length;j++){
                        var info=get.info(skillsx[j]);
                        if(!info){
                            skillsx.splice(j,1);
                            list.splice(j--,1);
                            continue;
                        }
                        if(typeof info.derivation=='string') list.push(info.derivation);
                        else if(Array.isArray(info.derivation)) list.addArray(info.derivation);
                    }
                    for(var j=0;j<list.length;j++){
                        if(skills.contains(list[j])||banned.contains(list[j])) continue;
                        var info=get.info(list[j]);
                        if(!info||!info.enable||info.viewAs||info.limited||info.juexingji||info.zhuanhuanji||info.hiddenSkill||info.dutySkill) continue;
                        skills.push(list[j]);
                    }
                }
                _status.skillsList=skills;
            },
            Diuse_beiSkillsList:function(){ //被动技能
                var skills=[];
                var banned=[
                    'huoxin','jueqing','qinqing','beige','huashen','drlt_zhiti','olzhiti','xinfu_pdgyingshi','rebeige'
                ];
                var characters=[];
                for(var name in lib.character){
                    if(!lib.character[name]) continue;
                    if(lib.filter.characterDisabled(name)) continue;
                    if(name.indexOf('boss_')==0) continue;
                    var skillsx=lib.character[name][3];
                    if(lib.character[name][4]) lib.character[name][4].remove('hiddenSkill');
                    characters.push(name);
                    var list=skillsx;
                    for(var j=0;j<skillsx.length;j++){
                        var info=get.info(skillsx[j]);
                        if(!info){
                            skillsx.splice(j,1);
                            list.splice(j--,1);
                            continue;
                        }
                        if(typeof info.derivation=='string') list.push(info.derivation);
                        else if(Array.isArray(info.derivation)) list.addArray(info.derivation);
                    }
                    for(var j=0;j<list.length;j++){
                        if(skills.contains(list[j])||banned.contains(list[j])) continue;
                        var info=get.info(list[j]);
                        if(!info||info.enable||info.charlotte||(info.unique&&!info.gainable)||info.juexingji||info.limited||info.zhuSkill||info.hiddenSkill||info.dutySkill) continue;
                        skills.push(list[j]);
                    }
                }
                _status.skillsList=skills;
            },
            Diuse_hpAndH:function(Hp,Pai){ //全体角色给体力和牌
                for(var i=0;i<game.players.length;i++){
                    if(game.players[i].side) continue;
                    game.players[i].hujia=0;
                    //game.players[i].classList.remove('turnedover');
                    //game.players[i].removeLink();
                    game.players[i].recover(Hp);
                    game.players[i].draw(Pai);
                }
            },
            Diuse_playerDead:function(){ //复活
                var dnum=0;
                var dead=game.dead.slice(0);
                for(var i=0;i<dead.length;i++){
                    if(!dead[i].side&&dead[i].maxHp>0/*&&dead[i].parentNode==game.players[i].parentNode*/){
                        if(!lib.config.extension_术樱_tianshu_dead) if(dead[i].Diuse_bossTianshuName(0)) continue;
                        dead[i].revive(dead[i].maxHp);
                        dnum++;
                    }
                }
            },
            Diuse_cardsNumberUpDate:function(){ //刷新牌堆
                var cards=get.cards(ui.cardPile.childElementCount+1);
                for(var i=0;i<cards.length;i++){
                    ui.cardPile.insertBefore(cards[i],ui.cardPile.childNodes[get.rand(ui.cardPile.childElementCount)]);
                }
                game.updateRoundNumber();
            },
            Diuse_taskNum:function(numTask,taskList){ //弃用
                if(_status.Task==1&&numTask>=25&&taskList==1) {_status.Task=0; return 1;}
                if(_status.Task==1&&numTask>=8&&taskList==2) {_status.Task=0; return 1;}
                if(_status.Task==1&&numTask>=3&&taskList==3) {_status.Task=0; return 1;}
                if(_status.Task==2&&numTask>=45&&taskList==1) {_status.Task=0; return 1;}
                if(_status.Task==2&&numTask>=15&&taskList==2) {_status.Task=0; return 1;}
                if(_status.Task==2&&numTask>=7&&taskList==3) {_status.Task=0; return 1;}
                if(_status.Task==3&&numTask>=85&&taskList==1) {_status.Task=0; return 1;}
                if(_status.Task==3&&numTask>=25&&taskList==2) {_status.Task=0; return 1;}
                if(_status.Task==3&&numTask>=12&&taskList==3) {_status.Task=0; return 1;} 
                return 0;
            },
            Diuse_bossGainMaxHpCard:function(maxHp,card){
                for(var i=0;i<game.players.length;i++){
                    if(game.players[i].isFriendOf(game.boss)){
                        game.players[i].addSkill('Diuse_removeSkills');
                        if(maxHp){
                            game.players[i].gainMaxHp(maxHp);
                            game.players[i].recover(maxHp);
                        }
                        if(card){
                            game.players[i].draw(card,'gain2');
                        }
                        game.players[i].removeSkill('Diuse_removeSkills');
                    }
                }
            },
            newBoss:function(){ //重置回合等  现弃用
                while(_status.event.name!='phaseLoop'){
                    _status.event=_status.event.parent;
                }
                game.resetSkills();
                _status.paused=false;
                _status.event.player=game.boss;
                _status.event.step=0;
                _status.roundStart=game.boss;
                game.phaseNumber=0;
                game.roundNumber=0;
                if(game.bossinfo){
                    game.bossinfo.loopType=1;
                }
                return 0;
            },
            Diuse_tianshuNewBoss:function(nextName,checkPoint,livePlayer){ //重置回合等  天书调用
                while(_status.event.name!='phaseLoop'){
                    _status.event=_status.event.parent;
                }
                if(nextName.Diuse_bossTianshuName(0,0)) nextName=game.boss;
                if(nextName.Diuse_bossTianshuName(checkPoint,livePlayer)) nextName=game.boss;
                game.resetSkills();
                _status.paused=false;
                _status.event.player=nextName;
                _status.event.step=0;
                _status.roundStart=nextName;
                game.phaseNumber=0;
                game.roundNumber=0;
                return 0;
            },
            Diuse_changeSeatNew:function(){ //BETA
                if(game.me==game.boss){
                    game.boss.changeSeat(0);
                    game.boss.nextSeat.changeSeat(2);
                    game.boss.nextSeat.nextSeat.changeSeat(3);
                    game.boss.nextSeat.nextSeat.nextSeat.changeSeat(4);
                    game.boss.previousSeat.changeSeat(7);
                    game.boss.previousSeat.previousSeat.changeSeat(6);
                }
            },
            Diuse_showPop:function(){ //九子真言
                SkillList=['Boss_Diuse_Nine_Lin','Boss_Diuse_Nine_Bing','Boss_Diuse_Nine_Dou','Boss_Diuse_Nine_Zhe','Boss_Diuse_Nine_Jie','Boss_Diuse_Nine_Zhen','Boss_Diuse_Nine_Lie','Boss_Diuse_Nine_Qian','Boss_Diuse_Nine_Xing'];
                for(var i=0;i<game.players.length;i++){
                    for(var j=0;j<SkillList.length;j++){
                        game.players[i].removeSkill(SkillList[j]);
                    }
                }
                var type=get.rand(1,9);
                var type=5;
                game.me.$fullscreenpop('九字真言·'+['临','兵','斗','者','皆','阵','列','前','行'][type-1],'white');
                for(var i=0;i<game.players.length;i++){
                    switch(type){
                        case 1:{game.players[i].addSkill(SkillList[0]);break;}
                        case 2:{game.players[i].addSkill(SkillList[1]);break;}
                        case 3:{game.players[i].addSkill(SkillList[2]);break;}
                        case 4:{game.players[i].addSkill(SkillList[3]);break;}
                        case 5:{game.players[i].addSkill(SkillList[4]);break;}
                        case 6:{game.players[i].addSkill(SkillList[5]);break;}
                        case 7:{game.players[i].addSkill(SkillList[6]);break;}
                        case 8:{game.players[i].addSkill(SkillList[7]);break;}
                        case 9:{game.players[i].addSkill(SkillList[8]);break;}
                    }
                }
            },
            Diuse_cardLibrary:function(name){ //牌库
                var n=game.Diuse_search(name,'char',true,true);
                var cardList=[];
                if(n=='界刘备'){
                    cardList=[
                    ['sha','black',1,'fire',''],['sha','red',3,'thunder',''],['sha','black',5,'ice',''],['sha','red',9,'',''],
                    ['shan','black',2,'',''],['shan','black',4,'',''],['shan','black',6,'',''],
                    ['tao','black',13,'',''],
                    ['jiu','red',13,'',''],
                    ['shunshou','black',4,'',''],
                    ['guohe','black',7,'',''],
                    ['tiesuo','red',13,'',''],
                    ['cixiong','red',1,'',''],
                    ];
                    return cardList;
                } else if(n=='界曹操'){
                    cardList=[
                        ['sha','black',1,'fire',''],['sha','red',3,'thunder',''],['sha','black',5,'ice',''],['sha','red',9,'',''],
                        ['shan','black',2,'',''],['shan','black',4,'',''],['shan','black',6,'',''],
                        ['tao','black',13,'',''],
                        ['jiu','red',13,'',''],
                        ['shunshou','black',4,'',''],
                        ['guohe','black',7,'',''],
                        ['tiesuo','red',13,'',''],
                        ['qibaodao','red',1,'','']
                    ];
                    return cardList;
                } else if(n=='界孙权'){
                    cardList=[
                        ['sha','black',1,'fire',''],['sha','red',3,'thunder',''],['sha','black',5,'ice',''],['sha','red',9,'',''],
                        ['shan','black',2,'',''],['shan','black',4,'',''],['shan','black',6,'',''],
                        ['tao','black',13,'',''],
                        ['jiu','red',13,'',''],
                        ['shunshou','black',4,'',''],
                        ['guohe','black',7,'',''],
                        ['tiesuo','red',13,'',''],
                        ['huogong','red',1,'','']
                    ];
                    return cardList;
                } else {
                    cardList=[
                        ['sha','black',1,'fire',''],['sha','red',3,'thunder',''],['sha','black',5,'ice',''],['sha','red',9,'',''],['sha','red',10,'thunder',''],
                        ['shan','black',2,'',''],['shan','black',4,'',''],['shan','black',6,'',''],
                        ['tao','black',13,'',''],
                        ['jiu','red',13,'',''],
                        ['juedou','black',4,'',''],
                        ['fangtian','black',7,'',''],
                        ['tiesuo','red',13,'',''],
                        ['chitu','black',7,'',''],
                    ];
                    return cardList;
                }
            },
            Diuse_search:function(name,type,tran,bool){ //找牌或者武将 1、名字 2、牌or武将 3、翻译还是原名 4、返回翻译还是原名
                if(type=='card'){
                    for (var a in lib.card) {
                        if(tran){
                            if(a=name) if(bool) return lib.translate[a]; else return a;
                        } else {
                            if(bool) return lib.translate[a]; else return a;
                        }
                    }
                } else {
                    for (var a in lib.character) {
                        if(tran){
                            if(a=name) if(bool) return lib.translate[a]; else return a;
                        } else {
                            if (lib.translate[a]==name) if(bool) return lib.translate[a]; else return a;
                        }
                    }
                }
            },
            Diuse_treasure:function(){

            },
            Diuse_treasureList:function(level){ //宝物列表
                var S=['wuzhong','Diuse_Liannu','tao'];

                if(level==0) return S.randomGet();
            },
            Diuse_getTranslate:function(name,type){ //宝物描述
                if(type=='treasure'){
                    if(name=='wuzhong') return '战斗开始时，你摸两张牌';
                    if(name=='tao') return '你体力上限+1';
                    return '前三个战斗回合出杀次数+1';
                } else if(type=='dialogText'){

                }
            },
            Diuse_shopPrice:function(name,type){ //商店价格
                if(type=='weapon'){
                    switch(name){
                        case '红缎枪': return '2两100文';
                        case '烈淬刀':  return '3两700文';
                        case '水波剑':  return '1两600文';
                        case '混毒弯匕':  return '2两600文';
                        case '天雷刃':  return '5两';
                        case '寒冰剑':  return '3两';
                        case '雌雄双股剑':  return '2两';
                        case '方天画戟':  return '1两';
                        case '贯石斧':  return '5两500文';
                        case '麒麟弓':  return '2两200文';
                        case '青釭剑':  return '2两500文';
                        case '丈八蛇矛':  return '2两100文';
                        case '青龙偃月刀':  return '3两500文';
                    }
                }
            },
            Diuse_storeCard:function(type){ //商店售卖概率
                var num=game.Diuse_numRandom();
                if(type=='puyuan'){
                    var puyuanStore=['红缎枪','水波剑','混毒弯匕','天雷刃'].randomGet();
                    var card=['寒冰剑','雌雄双股剑','方天画戟','麒麟弓','青釭剑','丈八蛇矛','青龙偃月刀'].randomGet();
                    var shen=['烈淬刀','贯石斧'].randomGet();
                    if(num<=5) return shen;
                    if(num<25) return puyuanStore;
                    return card;
                }
            },
            Diuse_moneyTranslate:function(type,char){ //翻译金额
                if(type=='zh'){
                    var list=[];
                    var wen,liang;
                    if(char.length>4){
                        for(var i=0;i<char.length;i++){
                            if(char[i]=='两'){
                                for(var j=0;j<i;j++) list.push(char[j]);
                                wen=char.slice(i+1,char.length-1);
                                continue;
                            }
                        }
                        liang=parseInt(list);
                        var num=(parseInt((liang*1000))+parseInt(wen));
                        return num;
                    } else {
                        for(var i=0;i<char.length;i++){
                            if(char[i]=='两'){
                                liang=parseInt(char.slice(0,char.length-1));
                                num=parseInt(liang*1000);
                                return num;
                            }
                        }
                        wen=char.slice(0,char.length-1);
                        num=(parseInt(wen));
                        return num;
                    }
                } else {
                    var num=_status.Diuse_money;
                    if(num==0) return '0文';
                    if(num<1000) return num+'文';
                    if(num==1000) return '1两';
                    if(num%1000==0) return Math.floor(num/1000)+'两';
                    return Math.floor(num/1000)+'两'+num%1000+'文';
                }
            },
            Diuse_addNewCard:function(name,type){ //加新牌
                var card=[];
                if(type=='equip'){
                    for (var a in lib.card) {
                        if (a==name){
                            var num=get.number(a);
                            var color=get.color(a);
                            if(color=='red') color='black';
                            else if(color=='black') color='red';
                            else color=['red','black'].randomGet();
                            card.push(a);
                            card.push(color);
                            card.push(num);
                            card.push('');
                            _status.Diuse_cardLibrary.push(card);
                            continue;
                        }
                    }
                }
            },
            Diuse_getEventType(){
                var num=_status.Diuse_newEvent;
                if(num==undefined||num.slice(4,5)=='0'){ //0是奖励
                    return 'treasure';
                } else if(num.slice(4,5)=='1') {  //1是怪
                    return 'monster';
                } else {  //否则就是事件
                    return 'event';
                }
            },
            Diuse_generateSequence:function(name){
                var level_1=[];
                for(var i=0;i<13;i++){
                    if(i==0){
                        var tarlentList=[];
                        while(tarlentList.length<3){
                            tarlentList.add(game.Diuse_treasureList(0));
                        }
                        level_1.push(['talent',3,tarlentList]);
                    } else if(i==2){
                        level_1.push(['character',1,'']);
                    } else if(i==12){
                        level_1.push(['boss',1,['Diuse_Fengyun_Zhangjiao',8,8,'Buff','Text']]);
                    } else if(i==11){
                        level_1.push(['recover',1,'']);
                    } else {
                        if(i%2==0){
                            var nextEvent=game.Diuse_randomAward();
                            level_1.push('award',1,nextEvent);
                        } else {
                            var nextMobs=game.Diuse_randomMobs();
                            level_1.push(['monster',1,[nextMobs[0],nextMobs[1],nextMobs[2],4,4]]);  //当前事件类型 几个选项 事件内容
                        }
                    }
                }
                _status.Diuse_Fengyun_checkPoint=[...level_1];
            },
            Diuse_randomAward:function(){
                var awardList=['cardBuff','talent','characterBuff','shop','event','recover','gold'];
                var random=awardList.randomGet();
                if(random=='evcent'){
                    var eventList=['god','hell','heaven','civilian'].randomGet();
                    return eventList;
                } else {
                    return random;
                }
            },
            Diuse_randomMobs:function(){
                var mobs=['Diuse_Huang','Shengxiao_Zishu','Shengxiao_Chouniu'].randomGet();
                var buff=['wusheng','paoxiao','zhiheng'].randomGet();
                var text;
                
                if(mobs=='Diuse_Huang'){
                    text='黄巾作乱-黄巾军';
                } else if(mobs=='Shengxiao_Zishu'){
                    text='十二生肖-子鼠';
                } else {
                    text='十二生肖-丑牛';
                }

                return [mobs,buff,text];
            },
            Diuse_nextEventText:function(){ //下关事件文本
                var num=_status.Diuse_newEvent;
                var text='下关事件：';
                switch(num){
                    case undefined: return (text+'战斗');
                    case '1.2.1.0': return (text+'支援伙伴');
                    case '1.0.0.2': return (text+'战斗');
                    case '1.0.0.3': return (text+'战斗');
                }
            },
            Diuse_nextEvent:function(bool){ //下一个事件
                var num=_status.Diuse_newEvent;
                switch(num){
                    case '1.0.0.0': _status.Diuse_newEvent='1.0.0.1';break;
                    case '1.0.0.1': _status.Diuse_newEvent='1.0.0.2';break;
                    case '1.0.0.2': _status.Diuse_newEvent='1.0.0.3';break;
                    case '1.0.0.3': _status.Diuse_newEvent='1.0.0.4';break;
                }
            },
            Diuse_buffEvent:function(){ //
                var num=_status.Diuse_newEvent;
                switch(num){
                    case '1.0.0.2': if(_status.Diuse_buffEvent!='1.0.0.2') _status.Diuse_buffEvent='1.0.0.2'; return 1;
                }
                return false;
            },
            Diuse_imageEvent:function(){ //事件头像
                var num=_status.Diuse_newEvent;
                switch(num){
                    case '1.0.0.0': return'黄巾兵';
                    case '1.0.0.1': return'黄巾兵';
                    case '1.0.0.2': return'界刘备';
                    case '1.0.0.3': return'界刘备';
                }
            },
            Diuse_nextEventFilter:function(){ //下个事件是否继续
                var num=_status.Diuse_newEvent;
                switch(num){
                    case '1.0.0.0': return true;
                    case '1.0.0.1': return false;
                    case '1.0.0.2': return true;
                    case '1.0.0.3': return false;
                    case '1.0.0.4': return false;
                }
            },
            Diuse_eventBoss:function(){
                var num=_status.Diuse_newEvent;
                switch(num){
                    case '1.0.0.2': return ['Diuse_Huang',7,false];
                    case '1.0.0.4': return ['Diuse_Liubei',2,true];
                }
            },
            Diuse_eventText:function(){
                if(_status._aozhan) return;
                if(!ui.Diuse_eventText){
                    ui.Diuse_eventText=ui.create.div('.touchinfo.left',ui.window);
                    if(ui.time3) ui.time3.style.display='none';
                }
                ui.Diuse_eventText.setAttribute("style", "text-align:center;width:calc(25%);height:calc(5%);left:calc(40%)");
                ui.Diuse_eventText.innerHTML='<br>'+'金币：'+parseInt(_status.Diuse_money)+'   等级：'+parseInt(_status.Diuse_level)+'<br>经验：'+parseInt(_status.Diuse_exp)+'/'+parseInt(game.Diuse_levelExp(_status.Diuse_level));
            },
            Diuse_levelExp:function(num){
                switch(num){
                    case 0: return 200;
                    case 1: return 400;
                    case 2: return 600;
                }
            },
        },
        boss:{
            Boss_Diuse_Tianshu:{
                chongzheng:0,
                init:function(){
                    _status.additionalReward=function(){
                        return 500;
                    }
                    lib.inpile.remove('shandian');
                    lib.inpile.remove('huoshan');
                    lib.inpile.remove('hongshui');
                    lib.inpile.remove('fulei');
                    lib.inpile.remove('lebu');
                    lib.inpile.remove('bingliang');
                    for(var i=0;i<ui.cardPile.childElementCount;i++){
                        var node=ui.cardPile.childNodes[i];
                        if(['huoshan','hongshui','fulei','lebu','bingliang','shandian'].contains(node.name)){
                            node.remove();
                        }
                    }
                    lib.inpile.sort(lib.sort.card);
                    _status.Diuse_Tianshu_Difficulty=0; //难度
                    _status.Diuse_Tianshu_checkPoint=0; //关卡
                    _status.Diuse_Tianshu_Bool=true; //天书判断
                    _status.Diuse_Xvni_Bool=true; //虚拟偶像
                    _status.Diuse_Tianshu_playerDieBool=false; //玩家角色全体阵亡
                    _status.Diuse_Tianshu_nextBool=false; //下关判断
                    _status.Diuse_Tianshu_fiveBool=false; //第五回合判断
                    _status.Diuse_Tianshu_Hp=0; //增加HP
                    _status.Diuse_Tianshu_Kaishi=0; //开始摸牌
                    _status.Diuse_Tianshu_Jieshu=0; //结束摸牌
                    _status.Diuse_Tianshu_Damage=0; //造成伤害
                    _status.Diuse_Tianshu_Recover=0; //开始时回复体力

                },
                loopFirst:function(){
                    return game.boss;
                },
                checkResult:function(player){
                    return false;
                },
            },
            Boss_Diuse_Jiuzi:{
                chongzheng:0,
                init:function(){
                    _status.additionalReward=function(){
                        return 500;
                    }
                    lib.inpile.remove('shandian');
                    lib.inpile.remove('huoshan');
                    lib.inpile.remove('hongshui');
                    lib.inpile.remove('fulei');
                    lib.inpile.remove('lebu');
                    lib.inpile.remove('bingliang');
                    for(var i=0;i<ui.cardPile.childElementCount;i++){
                        var node=ui.cardPile.childNodes[i];
                        if(['huoshan','hongshui','fulei','lebu','bingliang','shandian'].contains(node.name)){
                            node.remove();
                        }
                    }
                    lib.inpile.sort(lib.sort.card);
                    _status.Diuse_Jiuzi_Difficulty=0; //难度
                    _status.Diuse_Jiuzi_checkPoint=0; //关卡
                    _status.Diuse_Jiuzi_Bool=true; //九字判断
                    _status.Diuse_Jiuzi_playerDieBool=false; //玩家角色全体阵亡
                    _status.Diuse_Jiuzi_nextBool=false; //下关判断
                },
                loopFirst:function(){
                    return game.boss.nextSeat;
                },
                checkResult:function(player){
                    return false;
                },
            },
            Boss_Diuse_Fengyun:{
                chongzheng:0,
                init:function(){
                    _status.additionalReward=function(){
                        return 500;
                    }
                    lib.inpile.remove('huoshan');
                    lib.inpile.remove('hongshui');
                    lib.inpile.remove('fulei');
                    for(var i=0;i<ui.cardPile.childElementCount;i++){
                        var node=ui.cardPile.childNodes[i];
                        if(['huoshan','hongshui','fulei'].contains(node.name)){
                            node.remove();
                        }
                    }
                    lib.inpile.sort(lib.sort.card);
                    _status.Diuse_NewPVE=true;
                    _status.Diuse_cardLibrary=[];
                    _status.Diuse_newCard=[..._status.Diuse_cardLibrary];
                    _status.Diuse_money=0;
                    _status.Diuse_level=0;
                    _status.Diuse_exp=0;
                    _status.Diuse_newEventFilter=true;
                    game.Diuse_eventText();
                },
                loopFirst:function(){
                    return game.boss;
                },
                checkResult:function(player){
                    return false;
                },
            },
        },
        skill:{
            skill:{
                Diuse_skip:{
                    mode:['boss'],
                    trigger:{player:'phaseBefore'},
                    forced:true,
                    priority:100,
                    popup:false,
                    firstDo:true,
                    content:function(){
                        trigger.cancel();
                        player.phaseSkipped=true;
                        player.removeSkill('Diuse_skip');
                        game.roundNumber+=1;
                        event.trigger('roundStart');
                    },
                },
                Diuse_removeSkills:{
                    init:function(player,skill){
                        player.addSkillBlocker(skill);
                    },
                    onremove:function(player,skill){
                        player.removeSkillBlocker(skill);
                    },
                    charlotte:true,
                    skillBlocker:function(skill,player){
                        return true;
                    },
                },
                Tianshu_Skill:{
                    marktext:"标",
                    mark:true,
                    intro:{
                        content:function (storage,player,skill){
                            return '该标记无作用。'
                        },
                    },
                    locked:true,
                },
                Boss_Nine_Skills:{
                    mode:['boss'],
                    trigger:{global:'roundStart'},
                    forced:true,
                    filter:function(event,player){
                        return(player==game.boss)
                    },
                    content:function(){
                        game.Diuse_showPop();
                    },
                },
                livePlayer:{
                    mode:['boss'],
                    marktext:"度",
                    mark:true,
                    intro:{
                        content:function(event,player){
                            var num =_status.Diuse_Tianshu_Difficulty;
                            if(num==undefined||num==0){
                                return '难度暂未选择';
                            } else if(num==1){
                                return '简单难度';
                            } else if(num==2){
                                return '困难难度';
                            } else {
                                return '阴间难度';
                            }
                        },
                    },
                    locked:true,
                    trigger:{global:"gameDrawBefore"},
                    forced:true,
                    popup:false,
                    fixed:true,
                    unique:true,
                    filter:function(event,player){return player!=game.boss;},
                    content:function(){
                        var livelist=['Xvni_Xiaotao','Xvni_Xiaosha','Xvni_Xiaojiu','Xvni_Xiaoshan','Xvni_Xiaole'];
                        switch(lib.config.extension_术樱_tianshu_xvni){
                            case 'Xiaojiu':{
                                livelist='Xvni_Xiaojiu';
                                break;
                            }
                            case 'Xiaosha':{
                                livelist='Xvni_Xiaosha';
                                break;
                            }
                            case 'Xiaoshan':{
                                livelist='Xvni_Xiaoshan';
                                break;
                            }
                            case 'Xiaole':{
                                livelist='Xvni_Xiaole';
                                break;
                            }
                            case 'Xiaotao':{
                                livelist='Xvni_Xiaotao';
                                break;
                            }
                            case 'off':{
                                _status.Diuse_Xvni_Bool=false;
                            }
                            default:{
                                livelist=livelist.randomGet();
                                break;
                            }
                        }
                        var newSeat=6;
                        "step 0"
                        if(game.me==game.boss){
                            //game.boss.changeSeat(2);
                            game.boss.nextSeat.nextSeat.changeSeat(3);
                            if(game.boss.previousSeat.Diuse_bossTianshuName(0)){ 
                                game.boss.previousSeat.previousSeat.changeSeat(4);
                            } else {
                                game.boss.previousSeat.changeSeat(4);
                            }
                            newSeat=7;
                        }
                        if(_status.Diuse_Xvni_Bool){
                            var fellow=game.addFellow(newSeat,livelist,'zoominanim');
                            fellow.side=player.side;
                            //fellow.classList.add('turnedover');
                            event.source=fellow;
                            if(fellow.hasSkillTag('noPhaseDelay')||event.delay===false){fellow.noPhaseDelay=true;}
                            event.trigger('fellow');
                            event.result=event.source;
                        }
                        "step 1"
                        game.players[0].chooseControl('普通','困难','阴间');
                        "step 2"
                        if(result.control=='普通'){
                            _status.Diuse_Tianshu_Difficulty=1;
                        } else if(result.control=='困难'){
                            _status.Diuse_Tianshu_Difficulty=2;
                        } else {
                            _status.Diuse_Tianshu_Difficulty=3;
                        }
                        _status.noswap=true;
                        game.addVideo('reinit2',player,player.name);
                        "step 3"
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i].Diuse_bossTianshuName(0)){
                                game.players[i].markSkill('nextCheckPoint');
                                game.players[i].markSkill('livePlayer');
                                break;
                            }
                        }
                        "step 4"
                        player.removeSkill('livePlayer');
                        player.unmarkSkill('livePlayer');
                    },
                },
                nextCheckPoint:{
                    mode:['boss'],
                    marktext:"关",
                    mark:true,
                    intro:{content:function(event,player){
                        var list=_status.Diuse_Tianshu_Bosslist;
                        var str='',num=1;;
                        for(var i=0;i<list.length;i+=2){
                            str=str+'第'+num+'关：'+get.translation(list[i])+'、'+get.translation(list[i+1])+'<br>';
                            num++;
                        }
                        return "<center>"+"第"+_status.Diuse_Tianshu_checkPoint+'关'+'<br>'+'<br>'+str;
                        },
                    },
                    locked:true,
                },
                Boss_Diuse_Tianshu_Go:{
                    mode:['boss'],
                    trigger:{global:'gameStart'},
                    forced:true,
                    popup:false,
                    fixed:true,
                    unique:true,
                    content:function(){
                        'step 0' 
                        for(var i=0;i<game.players.length;i++){ //删必崩 我也不知道为什么
                            if(game.players[i].Diuse_bossTianshuName(0)){
                                game.players[i].hide();
                                game.players[i].die();
                            }
                        }
                        'step 1'
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            if(game.players[i]==game.boss) continue;

                            game.players[i].addSkill('livePlayer');
                            break;
                        }
                        'step 2'
                        player.smoothAvatar();
                    }
                },
                Boss_Diuse_Jiuzi_Go:{
                    mode:['boss'],
                    trigger:{global:'gameStart'},
                    forced:true,
                    popup:false,
                    fixed:true,
                    unique:true,
                    content:function(){
                        'step 0' 
                        for(var i=0;i<game.players.length;i++){ //删必崩 我也不知道为什么
                            if(game.players[i].Diuse_bossTianshuName(0)){
                                game.players[i].hide();
                                game.players[i].die();
                            }
                        }
                        'step 1'
                        player.smoothAvatar();
                        game.addGlobalSkill('Boss_Nine_Skills');
                    },
                },
                Boss_Diuse_Fengyun_Go:{
                    mode:['boss'],
                    trigger:{global:'gameStart'},
                    forced:true,
                    popup:false,
                    fixed:true,
                    unique:true,
                    content:function(){
                        for(var i=game.players.length-1;i>=0;i--){
                            game.players[i].clearSkills();
                            if(i!=0){
                                game.players[i].die();
                                game.players[i].hide();
                            } else {
                                // if(game.players[i].maxHp>2) game.players[i].loseMaxHp(game.players[i].maxHp-2);
                                // if(game.players[i].maxHp<2) game.players[i].gainMaxHp(2-game.players[i].maxHp);
                                _status.Diuse_PVEPlayer=game.players[i];
                                _status.Diuse_PVEPlayer.Diuse_showCharacter();
                                _status.Diuse_PVEPlayer.addSkill('Diuse_newCard');
                                _status.Diuse_PVEPlayer.addSkill('Diuse_Info');
                                _status.Diuse_PVEPlayer.addSkill('Diuse_Shop');
                                _status.Diuse_PVEPlayer.addSkill('Diuse_newEvent');
                                _status.Diuse_PVEPlayer.draw(4);
                            }
                        }
                    },
                },
                Diuse_newCard:{
                    trigger:{player:["drawBefore"]},
                    forced:true,
                    charlotte:true,
                    firstDo:true,
                    audio:false,
                    sub:true,
                    popup:false,
                    content:function(){
                        var num=trigger.num;
                        var card=[];
                        trigger.cancel();
                        for(var i=0;i<num;i++){
                            if(_status.Diuse_newCard.length<=0){
                                _status.Diuse_newCard=[];
                                _status.Diuse_newCard=[..._status.Diuse_cardLibrary];
                            }
                            var rand=game.Diuse_randomNum(_status.Diuse_newCard.length-1,0);
                            if(_status.Diuse_newCard.length==1) rand=0;
                            var newCard=_status.Diuse_newCard[rand];
                            var newCard1=game.createCard(newCard[0],newCard[1],newCard[2],newCard[3]);
                            card.push(newCard1);
                            _status.Diuse_newCard.splice(rand,1);
                        }
                        if(card){
                            player.gain(card,'draw').gaintag.add('Diuse_newCard');
                            game.log(player,'摸了'+get.cnNumber(num)+'张牌');
                        }
                    },
                },
                Diuse_newEvent:{
                    enable:"phaseUse",
                    popup:false,
                    filter:function(){
                        return _status.Diuse_newEventFilter;
                    },
                    content:function(){
                        player.Diuse_nextEvent();
                        //player.Diuse_showEvent();
                    },
                    group:['Diuse_newEvent_autoNextEvent','Diuse_newEvent_eventBoss'],
                    subSkill:{
                        autoNextEvent:{
                            trigger:{player:"Diuse_showEventAfter"},
                            popup:false,
                            firstDo:true,
                            frequent:true,
                            forced:true,
                            filter:function(event){
                                _status.nextEvent=game.Diuse_nextEventFilter(); //判断是否自动播放事件
                                game.Diuse_nextEvent(true); //进入下一个事件
                                return _status.nextEvent;
                            },
                            content:function(){
                                //player.Diuse_showEvent(); //事件
                            }
                        },
                        eventBoss:{
                            trigger:{player:"Diuse_newEvent_autoNextEventAfter"},
                            popup:false,
                            firstDo:true,
                            frequent:true,
                            forced:true,
                            filter:function(event){
                                var bool=game.Diuse_eventBoss();
                                return bool;
                            },
                            content:function(){
                                var boss=game.Diuse_eventBoss();
                                if(boss[2]){
                                    var fellow=game.addFellow(boss[1],boss[0],'zoominanim');
                                    fellow.side=player.side;
                                    fellow.draw(4);
                                    if(fellow.hasSkillTag('noPhaseDelay')||event.delay===false){fellow.noPhaseDelay=true;}
                                } else {
                                    player.Diuse_reset();
                                    game.addBossFellow(boss[1],boss[0]);
                                }
                                event.trigger('fellow');
                                _status.Diuse_newEventFilter=false;
                            }
                        },
                    },
                },
                Diuse_Info:{
                    enable:"phaseUse",
                    popup:false,
                    filter:function(){
                        return _status.Diuse_newEventFilter;
                    },
                    content:function(){
                        player.Diuse_addExp(500);
                        //player.Diuse_newPveInfo();
                    },
                },
                Diuse_Shop:{
                    enable:"phaseUse",
                    popup:false,
                    filter:function(){
                        return _status.Diuse_newEventFilter;
                    },
                    content:function(){
                        player.Diuse_showShop();
                    },
                },
                Tianshu_Protect:{ //伤害免疫
                    mode:['boss'],
                    trigger:{player:'damageBefore'},
                    forced:true,
                    priority:100,
                    frequent:true,
                    content:function(){
                        trigger.cancel();
                        player.removeSkill('Tianshu_Protect');
                    },
                },
                Boss_Diuse_Tianshu_intro1:{nobracket:true},
                Boss_Diuse_Tianshu_intro2:{nobracket:true},
                Boss_Diuse_Tianshu_intro3:{nobracket:true},
                Boss_Diuse_Tianshu_intro4:{nobracket:true},
                Boss_Diuse_Tianshu_intro5:{nobracket:true},
    
                Boss_Diuse_Nine_Lin:{
                    mode:['boss'],
                    group:['Boss_Diuse_Nine_Lin_Damage','Boss_Diuse_Nine_Lin_Discard'],
                    subSkill:{
                        Damage:{
                            trigger:{player:'damageBefore'},
                            forced:true,
                            sub:true,
                            filter:function(event,player){if(get.type(event.card,'trick')!='trick')return true},
                            content:function(){trigger.num--;}
                        },
                        Discard:{
                            trigger:{player:'phaseDiscardBefore'},
                            forced:true,
                            sub:true,
                            filter:function(event,player){if(player.countCards('h')<player.hp) return true;},
                            content:function(){player.chooseToDiscard(1,true);},
                        },
                    }
                },
                Boss_Diuse_Nine_Bing:{
                    mode:['boss'],
                    trigger:{source:"damageBefore",},
                    forced:true,
                    round:1,
                    filter:function(event,player){return _status.currentPhase==player;},
                    content:function(){if(player.hp!=player.maxHp){player.recover();}else{player.draw(2);}},
                },
                Boss_Diuse_Nine_Dou:{
                    mode:['boss'],
                    group:['Boss_Diuse_Nine_Dou_Damage','Boss_Diuse_Nine_Dou_Draw'],
                    subSkill:{
                        Damage:{
                            trigger:{player:'damageBefore'},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                if(event.card&&event.card.name!='sha') return true;
                            },
                            content:function(){trigger.num--;}
                        },
                        Draw:{
                            trigger:{player:'phaseDiscardAfter'},
                            forced:true,
                            sub:true,
                            filter:function(event,player){if(player.countCards('h')<player.hp) return true;},
                            content:function(){player.draw();},
                        },
                    }
                },
                Boss_Diuse_Nine_Zhe:{
                    mode:['boss'],
                    group:['Boss_Diuse_Nine_Zhe_Damage','Boss_Diuse_Nine_Zhe_Use'],
                    subSkill:{
                        Damage:{
                            trigger:{player:'damageBefore'},
                            forced:true,
                            sub:true,
                            content:function(){trigger.num++;}
                        },
                        Use:{
                            trigger:{player:'phaseUseEnd'},
                            forced:true,
                            sub:true,
                            round:1,
                            filter:function(event,player){if(player.hp!=player.maxHp) return true;},
                            content:function(){
                                var next=trigger.player.phaseUse();
                                event.next.remove(next);
                                trigger.getParent('phase').next.push(next);
                                trigger.player.draw(2);
                            },
                        },
                    }
                },
                Boss_Diuse_Nine_Jie:{
                    mode:['boss'],
                    trigger:{player:"phaseDrawBegin2",},
                    forced:true,
                    filter:function(event,player){ return !event.numFixed;},
                    content:function(){
                        trigger.num++;
                        alert('Boss正在赶来的路上, 请耐心等待. 即将重启');
                        setTimeout(function(){
                            setTimeout(game.reload,1500);
                        }, 1500);
                    },
                    mod:{
                        maxHandcardBase:function(player,num){
                            return player.maxHp;
                        },
                        cardUsable:function(card,player,num){
                            if(card.name=='sha') return num+1;
                        },
                    },
                },
                Boss_Diuse_Nine_Zhen:{
                    mode:['boss'],
                    round:1,
                    trigger:{player:'phaseUseBefore'},
                    content:function(){
                        var list=[];	
                        'step 0'
                        if(!_status.skillsList){game.Diuse_skillsList();}
                        for(var A=0;A<6;A++){
                            var Diuse_Not = _status.skillsList.randomGet();
                            list.push(Diuse_Not);
                            if(list.length==5) break;
                        }
                        if(!list.length){event.finish();return;}
                        event.list=list;
                        var dialog=game.getSkillDialog(event.list,'选择临时获得一个技能');
                        player.chooseControl(event.list).set('ai',function(){
                            return 0;
                        }).dialog=dialog;
                        'step 1'
                        event.skill=result.control
                        game.log(player.name,'临时获得了【',event.skill,'】技能');
                        player.addTempSkill(event.skill,'phaseAfter');
                        event.list=[];
                    },
                },
                Boss_Diuse_Nine_Lie:{
                    mode:['boss'],
                    enable:"phaseUse",
                    usable:1,
                    round:1,
                    position:'he',
                    selectCard:2,
                    filterCard:function(card){return true;},
                    filter:function(event,player){return player.hp!=player.maxHp},
                    content:function(){player.draw();player.recover();},
                },
                Boss_Diuse_Nine_Qian:{
                    mode:['boss'],
                    trigger:{player:'phaseUseBefore'},
                    content:function(){
                        event.Empty_List=[]
                        "step 0"
                        var equip=get.cardPile(function(card){
                            var bool1=true;
                            for(var i=0;i<event.Empty_List.length;i++){
                                if(get.type(card)=='equip'&&get.subtype(card)==get.subtype(event.Empty_List[i])) bool1=false;
                            }
                            return (get.type(card)=='equip'&&!event.Empty_List.contains(card)&&player.isEmpty(get.subtype(card))&&bool1);
                        });
                        if(equip) event.Empty_List.push(equip);
                        for (var i=0;i<event.Empty_List.length;i++){
                            player.chooseUseTarget(event.Empty_List[i],true).set('animate',false).set('nopopup',true);
                        }
                    },
                },
                Boss_Diuse_Nine_Xing:{},
    
                Boss_Shengxiao_Zishu:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    enable:"phaseUse",
                    usable:1,
                    filter:function(event,player){
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            if(game.players[i].countCards('h')>=player.countCards('h')) return true;
                        }
                        return false;
                    },
                    content:function(event){
                        'step 0'
                        player.chooseTarget(get.prompt('Boss_Shengxiao_Zishu'),'选择一名手牌比自己多的角色',function(event,player,target){
                            return player!=target&&target.countCards('h')>=player.countCards('h');
                        }).set('ai',function(target){
                            if(get.attitude(_status.event.player,target)>0){ return false; }
                            return true;
                        });
                        'step 1'
                        if(result.bool){
                            player.gainPlayerCard(result.targets[0],'h',true);
                            for(var i=0;i<game.players.length;i++){
                                if(game.players[i]==player) continue;
                                if(game.players[i].countCards('h')>=player.countCards('h')) event.goto(0);
                            }
                        }
                    },
                    ai:{
                        threaten:10,
                        order:8,
                        result:{
                            player:function (player,target){
                                if(get.attitude(player,target)<=0){
                                    return 1;
                                } else {
                                    return -1;
                                }  
                            },
                        },
                    },
                },
                Boss_Shengxiao_Chouniu:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    forced:true,
                    trigger:{player:"phaseAfter"},
                    filter:function(event,player){
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            if(player.hp>game.players[i].hp) return false;
                        };
                        return true;
                    },
                    content:function(){
                        player.recover(1);
                    }
                },
                Boss_Shengxiao_Yinhu:{
                    mode:["boss"],
                    group:['Boss_Shengxiao_Yinhu_Use','Boss_Shengxiao_Yinhu_After'],
                    subSkill:{
                        Use:{
                            audio:"ext:术樱:2",
                            enable:"phaseUse",
                            position:"he",
                            sub:true,
                            usable:4,
                            selectCard:1,
                            selectTarget:1,
                            filterTarget:function(event,player,target){return target!=player},
                            filterCard:function(card,player){
                                if(player.storage.Yinhu&&player.storage.Yinhu.contains(get.type2(card))){return false;}
                                return true;
                            },
                            content:function(){
                                if(!player.storage.Yinhu){player.storage.Yinhu=[];}
                                player.storage.Yinhu.push(get.type2(cards[0],cards[0].original=='h'?player:false));
                                target.damage(1);
                            },
                            ai:{
                                threaten:10,
                                order:8,
                                result:{
                                    player:function (player,target){
                                        if(get.attitude(player,target)<=0){
                                            return 1;
                                        } else {
                                            return -1;
                                        }  
                                    },
                                },
                            },
                        },
                        After:{
                            trigger:{player:"phaseJieshuBegin"},
                            silent:true,
                            sub:true,
                            forced:true,
                            popup:false,
                            content:function(){
                                delete player.storage.Yinhu;
                            }
                        },
                    },
                },
                Boss_Shengxiao_Maotu:{
                    mode:["boss"],
                    group:["Boss_Shengxiao_Maotu_a","Boss_Shengxiao_Maotu_b"],
                    subSkill:{
                        a:{
                            audio:"ext:术樱:2",
                            marktext:"卯",
                            mark:true,
                            locked:true,
                            intro:{
                                content:function(storage,player,skill){
                                    return "无法成为体力值大于你的角色使用牌的合法目标";
                                }
                            },
                            forced:true,
                            sub:true,
                            trigger:{global:"dieAfter"},
                            filter:function(event,player){
                                return event.player!=player;
                            },
                            content:function(event,player){
                                player.addMark('Boss_Shengxiao_Maotu_a',1);
                            },
                            mod:{
                                targetEnabled:function(event,card,player){
                                    var num=player.countMark("Boss_Shengxiao_Maotu_a");
                                    if(num>=1&&_status.currentPhase.hp>player.hp){
                                        return false;
                                    }
                                }
                            },
                        },
                        b:{
                            forced:true,
                            popup:false,
                            trigger:{player:"phaseJieshuBegin"},
                            silent:true,
                            sub:true,
                            filter:function(event,player){return player.countMark("Boss_Shengxiao_Maotu_a")},
                            content:function(event,player){
                                player.removeMark("Boss_Shengxiao_Maotu_a",player.countMark("Boss_Shengxiao_Maotu_a"));
                            }
                        },
                    },
                },
                Boss_Shengxiao_Chenlong:{
                    mode:["boss"],
                    group:['Boss_Shengxiao_Chenlong_a','Boss_Shengxiao_Chenlong_b'],
                    subSkill:{
                        a:{
                            audio:"ext:术樱:1",
                            enable:"phaseUse",
                            mark:true,
                            limited:true,
                            sub:true,
                            unique:true,
                            skillAnimation:true,
                            animationStr:"辰龙",
                            animationColor:"fire",
                            selectTarget:1,  
                            init:function(player){
                                player.storage.Chenlong=false;
                            },    
                            filter:function(event,player){
                                if(player.storage.Chenlong) return false;
                                if(event.parent.name=='phaseUse'){return true;}
                                return false;
                            },             
                            filterTarget:function(event,player,target){return target!=player},
                            content:function(event,player){
                                'step 0'
                                player.awakenSkill('Boss_Shengxiao_Chenlong_a');
                                player.storage.Chenlong=true;
                                player.chooseControl('1','2','3','4','5').set('prompt','请选择').set('ai',function(){
                                    return '5';
                                });
                                'step 1'
                                switch(result.control){
                                    case '1':
                                            player.loseHp(1);
                                            target.damage(1);
                                            break;
                                    case '2':
                                            player.loseHp(2);
                                            target.damage(2);
                                            break;
                                    case '3':
                                            player.loseHp(3);
                                            target.damage(3);
                                            break;
                                    case '4':
                                            player.loseHp(4);
                                            target.damage(4);
                                            break;
                                    case '5':
                                            player.loseHp(5);
                                            target.damage(5);
                                            break;
                                    default:
                                            break;
                                }
                            },
                            intro:{
                                content:"limited",
                            },  
                            ai:{
                                threaten:10,
                                order:8,
                                result:{
                                    player:function (player,target){
                                        if(target.hasSkill('Tianshu_Protect')) return false;
                                        if(get.attitude(player,target)<=0){
                                            return 1;
                                        } else {
                                            return -1;
                                        }  
                                    },
                                },
                            },
                        },
                        b:{
                            trigger:{player:"dying"},
                            forced:true,
                            sub:true,
                            check:function(event,player){return true;},
                            filter:function(event,player){
                                return event.getParent(2).name=='Boss_Shengxiao_Chenlong_a'&&_status.currentPhase==player;
                            },
                            content:function(event,player){
                                player.loseMaxHp(player.maxHp-1);
                                player.recover(1-player.hp);
                            },
                        },
                    },
                },
                Boss_Shengxiao_Sishe:{ 
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"damageAfter"},
                    forced:true,
                    filter:function(event,player){return event.source!=undefined},
                    content:function(){
                        trigger.source.damage(trigger.num);
                    },
                },
                Boss_Shengxiao_Wuma:{
                    mode:["boss"],
                    group:['Boss_Shengxiao_Wuma_Trick','Boss_Shengxiao_Wuma_Turnover','Boss_Shengxiao_Wuma_Use'],
                    subSkill:{
                        Trick:{
                            audio:"ext:术樱:2",
                            trigger:{target:"useCardToTargeted"},
                            forced:true,
                            sub:true,
                            filter:function(event,player){return get.type(event.card)=='trick'},
                            content:function(){player.draw()},
                        },
                        Turnover:{
                            audio:"ext:术樱:2",
                            trigger:{player:'turnOverBefore'},
                            priority:20,
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                return !player.isTurnedOver();
                            },
                            content:function(){
                                trigger.cancel();
                                game.log(player,'取消了翻面');
                            },
                        },
                        Use:{
                            audio:"ext:术樱:2",
                            trigger:{player:["phaseUseSkipped","PhaseUseCancelled"]},
                            forced:true,
                            sub:true,
                            content:function(){
                                var next=player.phaseUse();
                                event.next.remove(next);
                                trigger.next.push(next);
                            },
                        },
                    },
                },
                Boss_Shengxiao_Weiyang:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    enable:"phaseUse",
                    usable:1,
                    position:"he",
                    selectCard:[1,Infinity],
                    complexCard:true,
                    multitarget:true,
                    filterTarget:function(){return true;},
                    selectTarget:function(){return 1,ui.selected.cards.length;},
                    filterCard:function(card){
                        var cardTrick=get.type(card,'trick');
                        for(var i=0;i<ui.selected.cards.length;i++){                                
                            if(cardTrick==get.type(ui.selected.cards[i],'trick')) return false;
                        }
                        return true;
                    },
                    check:function(card){return 15-get.value(card)},
                    content:function(event,player){
                        'step 0'
                        event.delay=false;
                        for(var i=0;i<targets.length;i++){
                            targets[i].recover(1);
                            event.delay=true;
                        }
                    },
                    ai:{
                        threaten:10,
                        order:8,
                        result:{
                            player:function(player,target){
                                return get.attitude(player,target)>0&&target.hp!=target.maxHp;
                            },
                        },
                    },
                },
                Boss_Shengxiao_Shenhou:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{target:"useCardToTargeted"},
                    filter:function(event,player){return event.card.name=='sha'},
                    check:function(event,player){return true;},
                    content:function(){
                        "step 0"
                        player.judge(function(card){
                            var color=get.color(card);
                            if(color=='red') return 5;
                            return 0;
                        }).judge2=function(result){
                            var color=get.color(result.card);
                            if(color=='red') return result.bool=true;
                            return result.bool=false;
                        };
                        "step 1"
                        if(get.color(result.card)=='red'){
                            trigger.getParent().excluded.add(player);
                        } 
                    },
                },
                Boss_Shengxiao_Youji:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"phaseDrawBegin2"},
                    forced:true,
                    content:function(){
                        var round=game.roundNumber; 
                        if(round>=5) round=5
                        trigger.num+=round;
                    },
                },
                Boss_Shengxiao_Xvgou:{
                    mode:["boss"],
                    group:["Boss_Shengxiao_Xvgou_Sha","Boss_Shengxiao_Xvgou_Damage"],
                    subSkill:{
                        Sha:{
                            audio:"ext:术樱:2",
                            trigger:{target:"useCardToTargeted"},
                            forced:true,
                            sub:true,
                            filter:function(event,player){return event.card.name=='sha'&&get.color(event.card)=='red'},
                            content:function(){trigger.getParent().excluded.add(player)},
                            ai:{
                                effect:{
                                    target:function(card,player,target,current){
                                        if(card.name=='sha'&&get.color(card)=='red') return 'zeroplayertarget';
                                    }
                                }
                            },
                        },
                        Damage:{
                            audio:"ext:术樱:2",
                            trigger:{source:"damageBegin1",},
                            filter:function (event,player){
                                return event.card&&event.card.name=='sha'&&get.color(event.card)=='red'&&event.notLink();
                            },
                            forced:true,
                            sub:true,
                            content:function (){
                                trigger.num++;
                            },
                            ai:{
                                damageBonus:true,
                            },
                        },
                    },
                    mod:{
                        cardUsable:function(card,player){
                            if(get.color(card)=='red'&&card.name=='sha') return Infinity;
                        },
                        targetInRange:function(card,player){
                            if(get.color(card)=='red'&&card.name=='sha') return true;
                        }
                    },
                    onremove:true,
                },
                Boss_Shengxiao_Haizhu:{
                    mode:["boss"],
                    group:['Boss_Shengxiao_Haizhu_Lose','Boss_Shengxiao_Haizhu_Hp'],
                    subSkill:{
                        Lose:{
                            audio:"ext:术樱:2",
                            trigger:{global:"loseAfter"},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                if(event.type!='discard') return false;
                                if(event.player==player) return false;
                                for(var i=0;i<event.cards2.length;i++){
                                    if(get.position(event.cards2[i])=='d'&&get.color(event.cards[i])=='black'){
                                        return true;
                                    }
                                }
                                return false;
                            },
                            content:function(){
                                var cards=[];
                                for(var i=0;i<trigger.cards2.length;i++){
                                    if(get.position(trigger.cards2[i],true)=='d'&&get.color(trigger.cards2[i])=='black'){
                                        cards.push(trigger.cards2[i]);
                                    }
                                }
                                player.gain(cards,'gain2','log');
                            },
                        },
                        Hp:{
                            audio:"ext:术樱:2",
                            trigger:{player:"phaseBefore"},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                for(var s=0;s<game.players.length;s++){
                                    if(game.players[s]==player) continue;
                                    if(player.countCards('h')<game.players[s].countCards('h')) return false;
                                };
                                return true;
                            },
                            content:function(event,player){
                                player.loseHp(1);
                            },
                        },
                    },
                },
                Diuse_Xvni_Xvxiang:{
                    mode:['boss'],
                    audio:"ext:术樱:2",
                    trigger:{player:"damageBegin"},
                    forced:true,
                    content:function(){trigger.cancel();},
                    ai:{
                        effect:{
                            target:function(card,player,target,current){
                                if(player.hasSkillTag('jueqing',false,target)) return [1,-1.5];
                                if(_status.currentPhase!=target) return 'zeroplayertarget';
                            }
                        }
                    },
                },
                Diuse_Xvni_Xiaosha_Guisha:{
                    mode:['boss'],
                    audio:"ext:术樱:2",
                    trigger:{global:"useCard"},
                    check:function(event,player){return (get.attitude(player,event.player)>0);},
                    filter:function(event,player,target){
                        if(event.player==player) return false;
                        return event.card.name=='sha'&&player.countCards('he')>0&&event.player.isPhaseUsing();
                    },
                    content:function(){
                        'step 0'
                        player.chooseToDiscard(get.prompt('Diuse_Xvni_Xiaosha_Guisha'),'he','弃置一张牌使该【杀】伤害+1，且不计入出杀次数',true).set('ai',function(){
                            return true;
                        });
                        'step 1'
                        if(result.bool){
                            trigger.player.getStat().card.sha--;
                            trigger.baseDamage+=1;
                        }
                    },
                },
                Diuse_Xvni_Xiaosha_Zhuli:{
                    mode:['boss'],
                    audio:"ext:术樱:2",
                    usable:2,
                    trigger:{global:"damageEnd",},
                    check:function(event,player,source){
                        return (get.attitude(player,event.source)>0);
                    },
                    filter:function(event,player,source){
                        if(event.player==player) return false;
                        return event.source&&event.card&&event.card.name=='sha'&&event.source!=player;
                    },
                    logTarget:"source",
                    content:function(){
                        trigger.source.draw();
                        player.draw();
                    },
                },
                Diuse_Xvni_Xiaotao_TaoYan:{
                    mode:['boss'],
                    audio:"ext:术樱:2",
                    trigger:{player:"phaseBefore"},
                    check:function(event,player){return true;},
                    content:function(){
                        'step 0'
                        event.num=0
                        player.chooseTarget(get.prompt2('Diuse_Xvni_Xiaotao_TaoYan'),'令目标从牌堆获得一张【桃】并摸一张牌',[1,2],function(event,player,target){
                            return target!=player;
                        }).set('ai',function(target){
                            var att=get.attitude(_status.event.player,target);
                            return Math.max(att*(10-target.hp),att*5);
                        });
                        'step 1'
                        if(result.bool){
                            result.targets.sortBySeat();
                            event.targets=result.targets;
                        } else{
                            event.finish();
                        }
                        'step 2'
                        var card=get.cardPile(function(card){
                            return card.name=='tao';
                        });
                        if(card){
                            event.targets[event.num].gain(card,'gain2'); 
                        }
                        event.targets[event.num].draw();
                        event.num++;
                        'step 3'
                        if(event.num<event.targets.length) event.goto(2);
                    },
                },
                Diuse_Xvni_Xiaotao_Yanli:{
                    mode:['boss'],
                    audio:"ext:术樱:2",
                    trigger:{global:"dyingBegin"},
                    round:1,
                    check:function(event,player){return (get.attitude(player,event.player)>0);},
                    filter:function(event,player){return _status.currentPhase!=player;},
                    content:function(){
                        player.line(trigger.player);
                        trigger.player.recover(1-trigger.player.hp);
                        trigger.player.draw();
                    },
                },
                Diuse_Xvni_Xiaojiu_Meiniang:{
                    mode:['boss'],
                    audio:"ext:术樱:2",
                    trigger:{global:"phaseUseBegin"},
                    check:function(event,player){return (get.attitude(player,event.player)>0);},
                    filter:function(event,player){
                        if(player.storage.Xiaojiu_Meiniang==undefined) player.storage.Xiaojiu_Meiniang=[];
                        return event.player!=player;
                    },
                    content:function(){
                        player.line(trigger.player);
                        trigger.player.chooseUseTarget({name:'jiu'},true,'noTargetDelay','nodelayx');
                        player.storage.Xiaojiu_Meiniang.push('1');
                        trigger.player.addTempSkill('Diuse_Xvni_Xiaojiu_Jiu_Buff'); 
                    },
                    group:['Diuse_Xvni_Xiaojiu_Meiniang_Jieshu'],
                    subSkill:{
                        Jieshu:{
                            trigger:{global:"phaseJieshuBegin"},
                            forced:true,
                            sub:true,
                            popup:false,
                            content:function(){
                                player.storage.Xiaojiu_Meiniang=[];
                            },
                        },
                    },
                },
                Diuse_Xvni_Xiaojiu_Yaoli:{
                    mode:['boss'],
                    audio:"ext:术樱:2",
                    trigger:{global:"useCard"},
                    check:function(event,player){return (get.attitude(player,event.player)>0);},
                    filter:function(event,player){return event.player!=player&&event.card.name=='jiu';},
                    content:function(){
                        trigger.player.addTempSkill('Diuse_Xvni_Xiaojiu_Sha_Buff',{player:['shaAfter','phaseAfter']});
                    },
                },
                Diuse_Xvni_Xiaojiu_Jiu_Buff:{
                    mode:['boss'],
                    charlotte:true,
                    mod:{
                        cardUsable:function(card,player,num){
                            var number=1;
                            for(var i=0;i<game.players.length;i++){
                                if(game.players[i].storage.Xiaojiu_Meiniang==undefined){
                                    continue;
                                } else {
                                    number=game.players[i].storage.Xiaojiu_Meiniang.length;
                                }
                            }
                            if(card.name=='jiu') return num+number;
                        },
                    },
                },
                Diuse_Xvni_Xiaojiu_Sha_Buff:{
                    mode:['boss'],
                    trigger:{player:"useCard"},
                    forced:true,
                    popup:false,
                    charlotte:true,
                    filter:function(event,player){
                        return player.isPhaseUsing()&&(event.card.name=='sha');
                    },
                    content:function(){
                        trigger.directHit.addArray(game.players);
                    },
                    mod:{
                        selectTarget:function(card,player,range){
                            if(card.name=='sha'&&range[1]!=-1) range[1]++;
                        },
                    },
                },
                Diuse_Xvni_Xiaoshan_Shanwu:{
                    mode:['boss'],
                    audio:"ext:术樱:2",
                    trigger:{global:"useCardToTargeted",},
                    check:function(event,player){return (get.attitude(player,event.player)<0);},
                    filter:function(event,player,target){
                        if(event.card.name!=undefined&&event.card.name=='sha'&&target!=player&&player.countCards('h','shan')) return true;
                        return false;
                    },
                    content:function(){
                        "step 0"
                        var effect=0;
                        for(var i=0;i<trigger.targets.length;i++){
                            effect+=get.effect(trigger.targets[i],trigger.card,trigger.player,player);
                        }
                        var str='是否弃置一张【闪】取消该牌的全部目标'
                        var next=player.chooseToDiscard('h',function(card){
                            return card.name=='shan';
                        },str);
                        next.ai=function(card){
                            if(effect<0){
                                return 9-get.value(card);
                            }
                            return -1;
                        }
                        "step 1"
                        if(result.bool){
                            trigger.targets.length=0;
                            trigger.all_excluded=true;
                        }
                    },
                    ai:{
                        expose:0.2,
                    },
                },
                Diuse_Xvni_Xiaoshan_Xianli:{
                    mode:['boss'],
                    audio:"ext:术樱:2",
                    usable:2,
                    trigger:{player:["useCard","respond","loseAfter"],},
                    check:function(event,player){return true;},
                    filter:function(event,player){
                        if(player==_status.currentPhase) return false;
                        if(event.name!='lose') return get.color(event.card.name)=='shan';
                        if(event.type!='discard') return false;
                        if(event.cards2){
                            for(var i=0;i<event.cards2.length;i++){
                                if(event.cards2[i].name=='shan') return true;
                            }
                        }
                        return false;
                    },
                    content:function(){
                        var target=_status.currentPhase;
                        player.gainPlayerCard(target,'he',get.prompt('Diuse_Xvni_Xiaoshan_Xianli',target)).set('logSkill',['Diuse_Xvni_Xiaoshan_Xianli',target],true);
                    },
                },
                Diuse_Xvni_Xiaole_Leyv:{
                    mode:['boss'],
                    audio:"ext:术樱:2",
                    trigger:{global:"phaseBegin"},
                    check:function(event,player){return (get.attitude(player,event.player)<0);},
                    filter:function(event,player){return event.player!=player&&player.countCards('he')>=3;},
                    content:function(){
                        "step 0"
                        player.chooseToDiscard(true,3,'he');
                        trigger.player.judge(function(card){
                            var suit=get.suit(card);
                            if(suit=='heart') return -1;
                            return 0;
                        }).judge2=function(result){
                            var suit=get.suit(result.card);
                            if(suit=='heart') return result.bool=false;
                            return result.bool=true;
                        };
                        "step 1"
                        if(result.suit!='heart'){
                            trigger.player.skip('phaseUse');
                        }
                    },
                },
                Diuse_Xvni_Xiaole_Yuanli:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{global:["phaseUseSkipped","PhaseUseCancelled"]},
                    check:function(event,player){return true;},
                    content:function(){
                        'step 0'
                        player.chooseTarget(get.prompt2('Diuse_Xvni_Xiaole_Yuanli'),'令一名角色与你各摸一张牌',function(event,player,target){
                            return target!=player;
                        });
                        'step 1'
                        if(result.bool){
                            player.draw();
                            result.targets[0].draw();
                        }
                    },
                },
                Nianshou_Fange:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"damageAfter"},
                    filter:function(event,player){
                        return true;
                    },
                    content:function(){
                        'step 0'
                        event.cards=get.cards(2);
                        'step 1'
                        player.gain(event.cards,'draw');
                        var num=event.cards[0].number,num1=event.cards[1].number
                        if(trigger.source!=undefined&&Math.abs(num-num1)>=player.hp&&!trigger.source.isFriendOf(player)) trigger.source.damage();
                    },
                },
                Nianshou_Siyao:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"useCardToPlayered"},
                    multitarget:true,
                    filter:function(event,player){
                        if(!event.isFirstTarget) return false;
                        return event.card.name=='sha';
                    },
                    content:function(event,player,target){
                        for(var i=0;i<trigger.targets.length;i++){
                            trigger.targets[i].damage();
                        }
                        player.addTempSkill('Nianshou_Siyao_Buff','shaAfter');
                    },
                },
                Nianshou_Siyao_Buff:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{source:"damageAfter"},
                    forced:true,
                    charlotte:true,
                    multitarget:true,
                    filter:function(event,player){
                        return event.card&&event.card.name=='sha';
                    },
                    content:function(){
                        trigger.player.randomDiscard();
                    }
                },
                Nianshou_Hengsao:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"phaseUseBegin"},
                    forced:true,
                    filter:function(event,player){
                        return player.countCards('h')>=3&&player.countCards('h')<=6;
                    },
                    content:function(){
                        player.addTempSkill('Nianshou_Hengsao_Buff');
                    },
                },
                Nianshou_Hengsao_Buff:{
                    mode:['boss'],
                    mod:{
                        cardUsable:function(card,player,num){
                            if(card.name=='sha') return num+1;
                        },
                        selectTarget:function(card,player,range){
                            if(card.name!='sha') return false;
                            if(range[1]==-1) return false;
                            range[1]+=1;
                        },
                    },
                },
                Nianshou_Zhuyan:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"phaseDrawBefore"},
                    content:function(){
                        'step 0'
                        trigger.changeToZero();
                        event.cards=[]; 
                        event.num=0;
                        'step 1'
                        var card=get.cardPile(function(card){
                            if(event.cards.contains(card)) return false;
                            return true;
                        });
                        if(card) event.cards.push(card);
                        event.num++;
                        'step 2'
                        if(event.num<4) event.goto(1);
                        'step 3'
                        player.gain(event.cards,'gain2');
                    },
                },
                Nianshou_Xiaoji:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{
                        player:'loseAfter',
                        global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter'],
                    },
                    frequent:true,
                    filter:function(event,player){
                        var evt=event.getl(player);
                        return evt&&evt.player==player&&evt.es&&evt.es.length>0;
                    },
                    content:function(){
                        "step 0"
                        event.count=trigger.getl(player).es.length;
                        "step 1"
                        event.count--;
                        player.draw(2);
                        "step 2"
                        if(event.count>0){
                            player.chooseBool(get.prompt2('Nianshou_Xiaoji')).set('frequentSkill','Nianshou_Xiaoji').ai=lib.filter.all;
                        }
                        "step 3"
                        if(result.bool){
                            player.logSkill('Nianshou_Xiaoji');
                            event.goto(1);
                        }
                    },
                    ai:{
                        noe:true,
                        reverseEquip:true,
                        effect:{
                            target:function(card,player,target,current){
                                if(get.type(card)=='equip'&&!get.cardtag(card,'gifts')) return [1,3];
                            }
                        }
                    }
                },
                Nianshou_Qunxiang:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    group:['Nianshou_Qunxiang_ZhunBei','Nianshou_Qunxiang_End'],
                    subSkill:{
                        ZhunBei:{
                            trigger:{player:"phaseZhunbeiBegin"},
                            forced:true,
                            sub:true,
                            content:function(){
                                var num=[1,2].randomGet();
                                if(num==1){
                                    player.chooseUseTarget({name:'wanjian'},'是否视为使用一张【万箭齐发】？',true);
                                } else {
                                    player.chooseUseTarget({name:'nanman'},'是否视为使用一张【南蛮入侵】？',true);
                                }
                            },
                        },
                        End:{
                            trigger:{player:"phaseJieshuAfter"},
                            forced:true,
                            sub:true,
                            content:function(){
                                var num=[1,2].randomGet();
                                if(num==1){
                                    player.chooseUseTarget({name:'wanjian'},'是否视为使用一张【万箭齐发】？',true);
                                } else {
                                    player.chooseUseTarget({name:'nanman'},'是否视为使用一张【南蛮入侵】？',true);
                                }
                            },
                        },
                    },
                },
                Nianshou_Tanshi:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{source:"damageAfter"},
                    forced:true,
                    content:function(){
                        "step 0"
                        player.judge(function(card){
                            var color=get.color(card);
                            if(color=='black') return 1;
                            return 0;
                        }).judge2=function(result){
                            var color=get.color(result.card);
                            if(color=='black') return result.bool=true;
                            return result.bool=false;
                        };
                        "step 1"
                        if(get.color(result.card)=='black'){
                            if(player.hp==player.maxHp){
                                player.draw();
                            } else { player.recover(); }
                        }
                    },
                },
                Xishou_Taoyuan:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"damageAfter"},
                    content:function(){
                        'step 0'
                        event.cards=get.cards(2);
                        'step 1'
                        player.gain(event.cards,'draw');
                        var suit1=event.cards[0].suit,suit2=event.cards[1].suit
                        if(trigger.source!=undefined&&suit1!=suit2) {
                            if(!trigger.source.isFriendOf(player)){
                                var card1=trigger.source.getCards('h').randomGet();
                                player.gain(card1,trigger.source,'giveAuto','bySelf');
                            }
                        }
                    },
                },
                Xishou_Paoxiao:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    firstDo:true,
                    trigger:{player:"useCard1"},
                    forced:true,
                    filter:function(event,player){
                        return (!event.audioed||!player.hasSkill('Xishou_Paoxiao2'))&&event.card.name=='sha';
                    },
                    content:function(){
                        trigger.audioed=true;
                        player.addTempSkill('Xishou_Paoxiao2');
                    },
                    mod:{
                        cardUsable:function (card,player,num){
                            if(card.name=='sha') return Infinity;
                        },
                    },
                    ai:{
                        unequip:true,
                        skillTagFilter:function (player,tag,arg){
                            if(!get.zhu(player,'shouyue')) return false;
                            if(arg&&arg.name=='sha') return true;
                            return false;
                        },
                    },
                },
                Xishou_Paoxiao2:{
                    mode:['boss'],
                    charlotte:true,
                    mod:{
                        targetInRange:function (card,player){
                            if(card.name=='sha') return true;
                        },
                    },
                },
                Xishou_Lizhan:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"phaseUseBegin"},
                    content:function(){
                        var cards=[];
                        var card1=get.cardPile(function(card){
                            return card.name=='sha';
                        });
                        if(card1) cards.push(card1);
                        var card2=get.cardPile(function(card){
                            if(cards[0]=='') return;
                            return card.name=='sha'&&card!=cards[0];
                        });
                        if(card2) cards.push(card2);
                        player.gain(cards,'gain2');
                    },
                    group:['Xishou_Lizhan_Sha'],
                    subSkill:{
                        Sha:{
                            trigger:{player:"useCardAfter"},
                            sub:true,
                            usable:1,
                            filter:function(event,player){return event.card.name=='sha';},
                            content:function(){
                                "step 0"
                                event.sha=trigger.cards.slice(0).filterInD();
                                player.chooseTarget(get.prompt2('Xishou_Lizhan'),function(card,player,target){
                                    return target!=player;
                                }).set('ai',function(target){
                                    return get.attitude(_status.event.player,target);
                                }).set('source',trigger.targets);
                                "step 1"
                                if(result.bool){
                                    var target=result.targets[0];
                                    event.target=target;
                                    player.logSkill('Xishou_Lizhan',target);
                                    target.gain(event.sha,'gain2');
                                }
                                else{
                                    event.finish();
                                }
                            },
                        },
                    },
                },
                Xishou_Mingzhe:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{
                        player:["useCard","respond","loseAfter"],
                    },
                    frequent:true,
                    filter:function(event,player){
                        if(player==_status.currentPhase) return false;
                        if(event.name!='lose') return get.color(event.card)=='red';
                        if(event.type!='discard') return false;
                        if(event.cards2){
                            for(var i=0;i<event.cards2.length;i++){
                                if(get.color(event.cards2[i],player)=='red') return true;
                            }
                        }
                        return false;
                    },
                    content:function(){
                        "step 0"
                        event.count=1;
                        if(trigger.name=='lose'){
                            event.count=0;
                            for(var i=0;i<trigger.cards2.length;i++){
                                if(get.color(trigger.cards2[i],player)=='red') event.count++;
                            }
                        }
                        "step 1"
                        player.draw();
                        event.count--;
                        "step 2"
                        if(event.count){
                            player.chooseBool(get.prompt2('Xishou_Mingzhe')).set('frequentSkill','Xishou_Mingzhe');
                        }
                        else event.finish();
                        "step 3"
                        if(result.bool){
                            player.logSkill('Xishou_Mingzhe');
                            event.goto(1);
                        }
                    },
                    ai:{
                        threaten:0.7,
                    },
                },
                Xishou_Tianxiang:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"damageBegin4",},
                    direct:true,
                    filter:function(event,player){
                        return player.countCards('h',function(card){
                            return _status.connectMode||get.suit(card,player)=='heart';
                        })>0&&event.num>0;
                    },
                    content:function(){
                        "step 0"
                        player.chooseCardTarget({
                            filterCard:function(card,player){
                                return get.suit(card)=='heart'&&lib.filter.cardDiscardable(card,player);
                            },
                            filterTarget:function(card,player,target){
                                return player!=target;
                            },
                            ai1:function(card){
                                return 10-get.value(card);
                            },
                            ai2:function(target){
                                var att=get.attitude(_status.event.player,target);
                                var trigger=_status.event.getTrigger();
                                var da=0;
                                if(_status.event.player.hp==1){
                                    da=10;
                                }
                                var eff=get.damageEffect(target,trigger.source,target);
                                if(att==0) return 0.1+da;
                                if(eff>=0&&att>0){
                                    return att+da;
                                }
                                if(att>0&&target.hp>1){
                                    if(target.maxHp-target.hp>=3) return att*1.1+da;
                                    if(target.maxHp-target.hp>=2) return att*0.9+da;
                                }
                                return -att+da;
                            },
                            prompt:get.prompt('Xishou_Tianxiang'),
                            prompt2:lib.translate.Xishou_Tianxiang_info
                        });
                        "step 1"
                        if(result.bool){
                            player.discard(result.cards);
                            var target=result.targets[0];
                            player.chooseControlList(true,function(event,player){
                                var target=_status.event.target;
                                var att=get.attitude(_status.event.player,target);
                                if(target.hasSkillTag('maihp')) att=-att;
                                if(att>0){
                                    return 0;a
                                }
                                else{
                                    return 1;
                                }
                            },
                                ['令'+get.translation(target)+'受到伤害来源对其造成的1点伤害，然后摸X张牌（X为其已损失体力值且至多为5）',
                                '令'+get.translation(target)+'失去1点体力，然后获得'+get.translation(result.cards)]).set('target',target);
                            player.logSkill(event.name,target);
                            trigger.cancel();
                            event.target=target;
                            event.card=result.cards[0];
                        }
                        else{
                            event.finish();
                        }
                        "step 2"
                        if(typeof result.index=='number'){
                            event.index=result.index;
                            if(result.index){
                                event.related=event.target.loseHp();
                            }
                            else{
                                event.related=event.target.damage(trigger.source||'nosource','nocard');
                            }
                        }
                        else event.finish();
                        "step 3"
                        if(event.related.cancelled||target.isDead()) return;
                        if(event.index&&card.isInPile()) target.gain(card,'gain2');
                        else if(target.getDamagedHp()) target.draw(Math.min(5,target.getDamagedHp()));
                    },
                    ai:{
                        "maixie_defend":true,
                        effect:{
                            target:function(card,player,target){
                                if(player.hasSkillTag('jueqing',false,target)) return;
                                if(get.tag(card,'damage')&&target.countCards('he')>1) return 0.7;
                            },
                        },
                    },
                },
                Xishou_Juxiang:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    locked:true,
                    group:["Xishou_Juxiang_A","Xishou_Juxiang_B"],
                    subSkill:{
                        A:{
                            trigger:{target:"useCardToBefore",},
                            forced:true,
                            sub:true,
                            priority:15,
                            filter:function(event,player){
                                return (event.card.name=='nanman');
                            },
                            content:function(){
                                trigger.cancel();
                            },
                        },
                        B:{
                            trigger:{global:"useCardAfter",},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                return (event.card.name=='nanman'&&event.player!=player&&get.itemtype(event.cards)=='cards'&&get.position(event.cards[0],true)=='o');
                            },
                            content:function(){
                                player.gain(trigger.cards,'gain2');
                            },
                        },
                    },
                    ai:{
                        effect:{
                            target:function(card){
                                if(card.name=='nanman') return [0,1];
                            },
                        },
                    },
                },
                Xishou_Shouxi:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"useCardBegin",},
                    frequent:true,
                    filter:function(event){
                        return (get.type(event.card)=='trick'&&event.card.isCard&&get.color(event.card)=='black');
                    },
                    content:function(){
                        "step 0"
                        player.judge(function(card){
                            var color=get.color(card);
                            if(color=='red') return 1;
                            return 0;
                        }).judge2=function(result){
                            var color=get.color(result.card);
                            if(color=='red') return result.bool=true;
                            return result.bool=false;
                        };
                        "step 1"
                        if(get.color(result.card)=='red'){
                            player.recover();
                            player.gain(card,'gain2');
                        } else {
                            var playerFriend=[];
                            for(var i=0;i<game.players.length;i++){
                                if(game.players[i]==player) continue;
                                if(!game.players[i].isFriendOf(player)) playerFriend.push(i);
                            }
                            if(playerFriend){
                                var random=playerFriend.randomGet();
                                game.players[random].damage();
                            }
                        }
                    },
                    ai:{
                        threaten:1.4,
                        noautowuxie:true,
                    },
                },
                Zhuogui_Boss_Yinsha:{
                    mode:["boss"],
                    audio:"ext:术樱:1",
                    trigger:{global:"phaseUseBefore"},
                    forced:true,
                    filter:function(event,player){
                        if(event.player&&!event.player.isFriendOf(player)&&event.player.countCards('h')>event.player.maxHp) return true;
                        return false;
                    },
                    content:function(){
                        player.addTempSkill('Zhuogui_Boss_Yinsha_Buff');
                    },
                },
                Zhuogui_Boss_Yinsha_Buff:{
                    mod:{
                        targetEnabled:function(card,player,target,now){
                            if(card.name=='sha') return false;
                        },
                    },
                },
                Zhuogui_Boss_Eli:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{source:"damageBegin"},
                    usable:1,
                    forced:true,
                    filter:function(event,player){
                        if(event.player&&!event.player.isFriendOf(player)) return true;
                        return false;
                    },
                    content:function(){
                        "step 0"
                        player.judge(function(card){
                            var color=get.color(card);
                            if(color=='red') return 1;
                            return 0;
                        }).judge2=function(result){
                            var color=get.color(result.card);
                            if(color!=undefined) return result.bool=true;
                            return result.bool=false;
                        };
                        "step 1"
                        if(get.color(result.card)=='red'){
                            trigger.num++;
                        } else {
                            player.addTempSkill('Zhuogui_Boss_Wansha');
                        }
                    },
                },
                Zhuogui_Boss_Wansha:{
                    mode:['boss'],
                    locked:true,
                    global:'Zhuogui_Boss_Wansha_Buff',
                    trigger:{global:'dying'},
                    forced:true,
                    filter:function(event,player,name){
                        return _status.currentPhase==player&&event.player!=player;
                    },
                    content:function(){}
                },
                Zhuogui_Boss_Wansha_Buff:{
                    mod:{
                        cardSavable:function(card,player){
                            if(!_status.currentPhase) return;
                            if(_status.currentPhase.isAlive()&&_status.currentPhase.hasSkill('Zhuogui_Boss_Wansha')&&_status.currentPhase!=player){
                                if(card.name=='tao'&&!player.isDying()) return false;
                            }
                        },
                        cardEnabled:function(card,player){
                            if(!_status.currentPhase) return;
                            if(_status.currentPhase.isAlive()&&_status.currentPhase.hasSkill('Zhuogui_Boss_Wansha')&&_status.currentPhase!=player){
                                if(card.name=='tao'&&!player.isDying()) return false;
                            }
                        }
                    }
                },
                Zhuogui_Boss_Guimei:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:["phaseDrawSkipped","PhaseDrawCancelled"]},
                    forced:true,
                    content:function(){
                        player.draw();
                    },
                    group:["Zhuogui_Boss_Guimei_Use","Zhuogui_Boss_Guimei_Turnover"],
                    subSkill:{
                        Use:{
                            audio:"Zhuogui_Boss_Guimei",
                            trigger:{player:["phaseUseSkipped","PhaseUseCancelled"]},
                            forced:true,
                            sub:true,
                            content:function(){
                                player.addTempSkill('Zhuogui_Boss_Guimei_Buff');
                            },   
                        },
                        Turnover:{
                            audio:"Zhuogui_Boss_Guimei",
                            trigger:{player:'turnOverBefore'},
                            priority:20,
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                return !player.isTurnedOver();
                            },
                            content:function(){
                                trigger.cancel();
                                game.log(player,'取消了翻面');
                            },
                        },
                    },
                },
                Zhuogui_Boss_Guimei_Female:{
                    mode:["boss"],
                    audio:"ext:术樱:2", //用audioname不知道为什么不触发, 可能是我的问题?
                    trigger:{player:["phaseDrawSkipped","PhaseDrawCancelled"]},
                    forced:true,
                    content:function(){
                        player.draw();
                    },
                    group:["Zhuogui_Boss_Guimei_Female_Use","Zhuogui_Boss_Guimei_Female_Turnover"],
                    subSkill:{
                        Use:{
                            audio:"Zhuogui_Boss_Guimei_Female",
                            trigger:{player:["phaseUseSkipped","PhaseUseCancelled"]},
                            sub:true,
                            forced:true,
                            content:function(){
                                player.addTempSkill('Zhuogui_Boss_Guimei_Buff');
                            },   
                        },
                        Turnover:{
                            audio:"Zhuogui_Boss_Guimei_Female",
                            trigger:{player:'turnOverBefore'},
                            priority:20,
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                return !player.isTurnedOver();
                            },
                            content:function(){
                                trigger.cancel();
                                game.log(player,'取消了翻面');
                            },
                        },
                    },
                },
                Zhuogui_Boss_Guimei_Buff:{
                    mod:{
                        maxHandcardBase:function(player,num){
                            return Infinity;
                        },
                    },
                },
                Zhuogui_Boss_Xixing:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"phaseZhunbeiBegin"},
                    forced:true,
                    content:function(){
                        player.Diuse_playerHpMax().damage(1,'thunder');
                        player.recover();
                    },
                },
                Zhuogui_Boss_Xixing_Difficulty:{
                    mode:["boss"],
                    audio:"Zhuogui_Boss_Xixing",
                    trigger:{player:"phaseZhunbeiBegin"},
                    forced:true,
                    content:function(){
                        var num=[1,2].randomGet();
                        player.Diuse_playerHpMax().damage(num,'thunder');
                        player.recover();
                    },
                },
                Zhuogui_Boss_Xixing_Fucking:{
                    mode:["boss"],
                    audio:"Zhuogui_Boss_Xixing",
                    trigger:{player:"phaseZhunbeiBegin"},
                    forced:true,
                    content:function(){
                        for(var i=0;i<game.players.length;i++){
                            if(!game.players[i].isFriendOf(player)) game.players[i].damage(1,'thunder');
                        }
                    },
                },
                Zhuogui_Boss_Taiping:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"damageEnd"},
                    forced:true,
                    filter:function(event,player){
                        if(event.source==undefined) return false;
                        if(event.source==player) return false;
                        if(event.source.isFriendOf(player)) return false;
                        return true;
                    },
                    content:function(){
                        'step 0'
                        if(trigger.source.countCards()<=0){
                            trigger.source.loseHp();
                            event.finish();
                        }
                        event.videoId=lib.status.videoId++;
                        game.broadcastAll(function(player,id,cards,num){
                            str='太平：弃置两张花色不同的手牌，取消则失去一点体力';
                            var dialog=ui.create.dialog(str,cards);
                            dialog.videoId=id;
                        },trigger.source,event.videoId,trigger.source.getCards());
                        game.addVideo('delay',null,2);
                        "step 1"
                        var next=trigger.source.chooseButton();
                        next.set('dialog',event.videoId);
                        next.set('filterButton',function(button){
                            for(var i=0;i<ui.selected.buttons.length;i++){
                                if(get.suit(ui.selected.buttons[i].link)==get.suit(button.link)) return false;
                            }
                            return true;
                        });
                        next.set('selectButton',function(button){
                            return 2;
                        });
                        next.set('ai',function(button){
                            return get.value(button.link,_status.event.source);
                        });
                        "step 2"
                        if(result.bool&&result.links){
                            trigger.source.discard(result.links);
                        } else {trigger.source.loseHp();}
                        game.broadcastAll('closeDialog',event.videoId);
                    },
                },
                Zhuogui_Boss_Taiping_Fucking:{
                    mode:["boss"],
                    audio:"Zhuogui_Boss_Taiping",
                    trigger:{player:"damageEnd"},
                    forced:true,
                    filter:function(event,player){
                        if(event.source==undefined) return false;
                        if(event.source==player) return false;
                        if(event.source.isFriendOf(player)) return false;
                        return true;
                    },
                    content:function(){
                        "step 0"
                        event.Taiping=trigger.num;
                        "step 1"
                        event.Taiping--;
                        if(trigger.source.countCards()<=0){
                            trigger.source.loseHp();
                            event.goto(5);
                        }
                        "step 2"
                        event.videoId=lib.status.videoId++;
                        game.broadcastAll(function(player,id,cards,num){
                            str='太平：弃置两张花色不同的手牌，取消则失去一点体力';
                            var dialog=ui.create.dialog(str,cards);
                            dialog.videoId=id;
                        },trigger.source,event.videoId,trigger.source.getCards());
                        game.addVideo('delay',null,2);
                        "step 3"
                        var next=trigger.source.chooseButton();
                        next.set('dialog',event.videoId);
                        next.set('filterButton',function(button){
                            for(var i=0;i<ui.selected.buttons.length;i++){
                                if(get.suit(ui.selected.buttons[i].link)==get.suit(button.link)) return false;
                            }
                            return true;
                        });
                        next.set('selectButton',function(button){
                            return 2;
                        });
                        next.set('ai',function(button){
                            return get.value(button.link,_status.event.source);
                        });
                        "step 4"
                        if(result.bool&&result.links){
                            trigger.source.discard(result.links);
                        } else {trigger.source.loseHp();}
                        game.broadcastAll('closeDialog',event.videoId);
                        "step 5"
                        if(event.Taiping){
                            player.logSkill('Zhuogui_Boss_Taiping_Fucking');
                            event.goto(1);
                        }
                    },
                },
                Zhuogui_Boss_Mizui:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{source:"damageAfter"},
                    check:function(event,player){return (get.attitude(player,event.player)<0);},
                    filter:function(event,player){
                        if(!event.card) return false;
                        if(get.color(event.card)=='red'&&event.card.name=='sha') return true;
                        if(event.card.nature&&event.card.name=='sha') return true;
                        return false;
                    },
                    content:function(){
                        player.discardPlayerCard(trigger.player,1,'he',get.prompt('Zhuogui_Boss_Mizui',trigger.player),true).set('ai',function(button){
                            if(!_status.event.att) return 0;
                            if(get.position(button.link)=='e'){
                                if(get.subtype(button.link)=='equip2') return 2*get.value(button.link);
                                return get.value(button.link);
                            }
                            return 1;
                        }).set('att',get.attitude(player,trigger.player)<=0);
                    },
                },
                Zhuogui_Boss_Mizui_Fucking:{
                    mode:["boss"],
                    audio:"Zhuogui_Boss_Mizui",
                    trigger:{source:"damageAfter"},
                    check:function(event,player){return (get.attitude(player,event.player)<0);},
                    filter:function(event,player){
                        if(!event.card) return false;
                        if(get.color(event.card)=='red'&&event.card.name=='sha') return true;
                        if(event.card.nature&&event.card.name=='sha') return true;
                        return false;
                    },
                    content:function(){
                        player.discardPlayerCard(trigger.player,2,'he',get.prompt('Zhuogui_Boss_Mizui',trigger.player),true).set('ai',function(button){
                            if(!_status.event.att) return 0;
                            if(get.position(button.link)=='e'){
                                if(get.subtype(button.link)=='equip2') return 2*get.value(button.link);
                                return get.value(button.link);
                            }
                            return 1;
                        }).set('att',get.attitude(player,trigger.player)<=0);
                    },
                },
                Zhuogui_Boss_Qiangzheng:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"phaseJieshuBegin"},
                    forced:true,
                    filter:function(event,player){
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            if(game.players[i].isFriendOf(player)) continue;
                            if(game.players[i].countCards('h')==1) return true;
                        }
                        return false;
                    },
                    content:function(){
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            if(game.players[i].isFriendOf(player)) continue;
                            if(game.players[i].countCards('h')==1){
                                player.gain(game.players[i].getCards('h'),game.players[i],'giveAuto');
                            }
                        }
                    },
                },
                Zhuogui_Boss_Qiangzheng_Fucking:{
                    mode:["boss"],
                    audio:"Zhuogui_Boss_Qiangzheng",
                    trigger:{player:"phaseJieshuBegin"},
                    forced:true,
                    filter:function(event,player){
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            if(game.players[i].isFriendOf(player)) continue;
                            if(game.players[i].countCards('h')<=2) return true;
                        }
                        return false;
                    },
                    content:function(){
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            if(game.players[i].isFriendOf(player)) continue;
                            if(game.players[i].countCards('h')<=2){
                                player.gain(game.players[i].getCards('h'),game.players[i],'giveAuto');
                            }
                        }
                    },
                },
                Zhuogui_Boss_Duzhen:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"useCardToPlayered"},
                    forced:true,
                    filter:function(event,player){
                        if(event.targets.length!=1||event.getParent('phaseUse').player!=player||event.target==player||event.target.isFriendOf(player)) return false;
                        return true;
                    },
                    content:function(){
                        if(trigger.target.countCards('e')>=1){
                            trigger.target.discard(trigger.target.getCards('e').randomGet());
                        } else {
                            trigger.target.discard(trigger.target.getCards('h').randomGet());
                        }
                    },
                },
                Zhuogui_Boss_Mingchong:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"dieBegin"},
                    forced:true,
                    filter:function(event,player){
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i].isFriendOf(player)) return true;
                        }
                        return false;
                    },
                    content:function(){
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            if(game.players[i].isFriendOf(player)){
                                player.line(game.players[i]);
                                game.players[i].addSkill('Zhuogui_Boss_Duzhen');
                                game.log(game.players[i],'获得了技能');
                                break;
                            }
                        }
                    },
                },
                Zhuogui_Boss_Tiemian:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{target:"useCardToTargeted"},
                    forced:true,
                    filter:function(event,player){return event.card.name=='sha'&&get.color(event.card)=='red'},
                    content:function(){
                        var num=game.Diuse_numRandom();
                        if(num<=75){
                            game.log('Zhuogui_Boss_Tiemian','生效，取消成为目标。');
                            trigger.getParent().excluded.add(player);
                        } else {
                            event.finish();
                        }
                    },
                    ai:{
                        effect:{
                            target:function(card,player,target,current){
                                if(card.name=='sha'&&get.color(card)=='red') return 'zeroplayertarget';
                            }
                        }
                    },
                },
                Zhuogui_Boss_Difu:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{global:"phaseUseBegin"},
                    forced:true,
                    filter:function(event,player){
                        if(event.player==player||event.player.isFriendOf(player)) return false;
                        return event.player.countCards('h')>event.player.maxHp;
                    },
                    content:function(){
                        var num=trigger.player.countCards('h')-trigger.player.maxHp;
                        trigger.player.chooseToDiscard(num,true,'h');
                    },
                },
                Zhuogui_Boss_Zhennu:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"changeHp"},
                    forced:true,
                    filter:function(event,player){
                        if(player.storage.Zhennu==undefined) player.storage.Zhennu=[];
                        return player.storage.Zhennu.length==0&&player.hp<=8;
                    },
                    content:function(){
                        var evt=_status.event.getParent('phaseUse');
                        if(evt&&evt.name=='phaseUse'){
                            evt.skipped=true;
                        }
                        var evt=_status.event.getParent('phase');
                        if(evt&&evt.name=='phase'){
                            evt.finish();
                        }
                        player.markSkillCharacter('Zhuogui_Boss_Zhennu',player,'震怒','已经生效');
                        player.storage.Zhennu.push('true');
                        player.draw(4);
                        player.insertPhase();
                    },
                },
                Zhuogui_Boss_Xingpan:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"phaseBegin"},
                    forced:true,
                    content:function(){
                        "step 0"
                        player.judge(function(card){
                            var color=get.color(card);
                            if(color=='red') return 2;
                            return 1;
                        }).judge2=function(result){
                            var color=get.color(result.card);
                            if(color!=undefined) return result.bool=true;
                            return result.bool=false;
                        };
                        "step 1"
                        if(get.color(result.card)=='red'){
                            event.name=player.Diuse_playerCardMax();
                            var num=parseInt(event.name.countCards('h')/2);
                            event.name.chooseCard('h',true,'交给'+get.translation(player)+get.cnNumber(num)+'张牌',num).set('ai',function(card){
                                var evt=_status.event.getParent();
                                if(get.attitude(_status.event.player,evt.player)>2){
                                    if(card.name=='jiu') return 120;
                                    if(card.name=='tao') return 110;
                                }
                                return 100-get.value(card);
                            });
                        } else {
                            player.Diuse_playerHpMax().loseHp();
                            event.finish();
                        }
                        'step 2'
                        if(result.bool){
                            player.gain(result.cards,event.name,'giveAuto');
                        }
                    },
                },
                Zhuogui_Boss_Dianwei:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"phaseZhunbeiBegin"},
                    forced:true,
                    content:function(){
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            if(game.players[i].countCards('e')>0){
                                game.players[i].discard(game.players[i].getCards('e').randomGet());
                            } else {
                                player.useCard({name:'sha'},game.players[i]);
                            }
                        }
                    },
                },
                Zhuogui_Boss_Guixi:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"damageAfter"},
                    forced:true,
                    content:function(){
                        "step 0"
                        player.judge(function(card){
                            var suit=get.suit(card);
                            if(suit=='heart') return 2;
                            return 0;
                        }).judge2=function(result){
                            var suit=get.suit(result.card);
                            if(suit=='heart'){
                                return result.bool=true;
                            } else {
                                return result.bool=false;
                            }
                        };
                        "step 1"
                        if(get.suit(result.card)=='heart'){
                            player.recover();
                        } else {
                            player.loseHp();
                        }
                    }
                },
                Zhuogui_Boss_Anchao:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    marktext:"暗潮",
                    mark:true,
                    locked:true,
                    intro:{
                        content:function(storage,player,skill){
                            var num=player.countMark('Zhuogui_Boss_Anchao');
                            if(num==undefined) num=0;
                            return "摸牌阶段多摸"+num+"张牌，"+"造成的伤害增加+"+num+"点";
                        }
                    },
                    trigger:{global:"phaseJieshuBegin"},
                    forced:true,
                    filter:function(event,player){
                        if(event.player==player) return true;
                        if(!event.player.isFriendOf(player)) return false;
                        return true;
                    },
                    content:function(){
                        var numMark=trigger.player.countMark('Zhuogui_Boss_Anchao');
                        if(trigger.player.getStat('damage')&&numMark!=undefined){
                            trigger.player.removeMark('Zhuogui_Boss_Anchao',numMark);
                        } else {
                            trigger.player.addMark('Zhuogui_Boss_Anchao');
                        }
                    },
                    group:['Zhuogui_Boss_Anchao_Draw','Zhuogui_Boss_Anchao_Damage'],
                    subSkill:{
                        Draw:{
                            trigger:{global:"phaseDrawBegin"},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                var numMark=event.player.countMark('Zhuogui_Boss_Anchao');
                                if(event.player==player&&numMark) return true;
                                if(!event.player.isFriendOf(player)) return false;
                                return numMark;
                            },
                            content:function(){
                                var numMark=trigger.player.countMark('Zhuogui_Boss_Anchao');
                                trigger.num+=numMark;
                            },
                        },
                        Damage:{
                            trigger:{global:'damageBegin1'},
                            sub:true,
                            filter:function(event,player){
                                if(event.source==undefined) return false;
                                if(!event.source.isFriendOf(player)) return false;
                                if(event.player.isFriendOf(player)) return false;
                                var numMark=event.source.countMark('Zhuogui_Boss_Anchao');
                                if(event.source==player&&numMark) return true;
                                return numMark;
                            },
                            forced:true,
                            content:function(){
                                var numMark=trigger.source.countMark('Zhuogui_Boss_Anchao');
                                trigger.num+=numMark;
                            },
                            ai:{
                                damageBonus:true
                            }
                        },
                    },
                },
                Zhuogui_Boss_Bingyi:{
                    mode:['boss'],
                    audio:"ext:术樱:2",
                    trigger:{
                        player:"loseAfter",
                        global:["equipAfter","addJudgeAfter","gainAfter","loseAsyncAfter"],
                    },
                    forced:true,
                    preHidden:true,
                    filter:function(event,player){
                        if(player.countCards('h')) return false;
                        if(event.name=='gain'&&event.player==player) return false;
                        var evt=event.getl(player);
                        return evt&&evt.hs&&evt.hs.length>0;
                    },
                    content:function(){
                        player.draw(6);
                    },
                },
                Zhuogui_Boss_Suoxue:{
                    mode:['boss'],
                    audio:"ext:术樱:2",
                    shaRelated:true,
                    trigger:{
                        player:"useCardToPlayered",
                    },
                    filter:function(event,player){
                        if(event.targets.length!=1||event.card.name!='sha'||player.countCards('h')==event.targets[0].countCards('h')) return false;
                        return true;
                    },
                    content:function(){
                        var target=trigger.target;
                        "step 0"
                        if(target.countCards('h')<player.countCards('h')){
                            event.goto(2);
                        }
                        "step 1"
                        player.draw(target.countCards('h')-player.countCards('h'));
                        event.finish();
                        "step 2"
                        player.chooseToDiscard('h',get.prompt('Zhuogui_Boss_Suoxue',trigger.target),'是否弃置一张手牌令其无法响应该杀').set('ai',function(card){
                            if(get.attitude(_status.event.player,_status.event.target)<1) return 0;
                            return 9-get.value(card);
                        });
                        "step 3"
                        if(result.bool){
                            trigger.directHit.addArray(game.players);
                        }
                    },
                },
                Zhuogui_Boss_Xiaoshou:{
                    mode:['boss'],
                    audio:"ext:术樱:2",
                    trigger:{player:'phaseZhunbeiBegin'},
                    forced:true,
                    filter:function(event,player){
                        for(var i=0;i<game.players.length;i++){
                            if(!game.players[i].isFriendOf(player)){
                                if(game.players[i].hp>player.hp) return true;       
                            }
                        }
                        return false;
                    },
                    content:function(){
                        player.Diuse_damagePlayerHp(1);
                    },
                },
                Zhuogui_Boss_Xiaoshou_Difficulty:{
                    mode:['boss'],
                    audio:"huogui_Boss_Xiaoshou",
                    trigger:{player:'phaseZhunbeiBegin'},
                    forced:true,
                    filter:function(event,player){
                        for(var i=0;i<game.players.length;i++){
                            if(!game.players[i].isFriendOf(player)){
                                if(game.players[i].hp>player.hp) return true;       
                            }
                        }
                        return false;
                    },
                    content:function(){
                        player.Diuse_damagePlayerHp(2);
                    },
                },
                Zhuogui_Boss_Xiaoshou_Fucking:{
                    mode:['boss'],
                    audio:"huogui_Boss_Xiaoshou",
                    trigger:{player:'phaseZhunbeiBegin'},
                    forced:true,
                    filter:function(event,player){
                        for(var i=0;i<game.players.length;i++){
                            if(!game.players[i].isFriendOf(player)){
                                if(game.players[i].hp>=player.hp) return true;       
                            }
                        }
                        return false;
                    },
                    content:function(){
                        player.Diuse_damagePlayerHp(2,3);
                    },
                },
                Zhuogui_Boss_Manji:{
                    mode:['boss'],
                    audio:"ext:术樱:2",
                    shaRelated:true,
                    trigger:{
                        player:"useCardToPlayered",
                    },
                    filter:function(event,player){
                        if(event.targets.length==1&&event.card.name=='sha'&&event.targets[0].countCards('h')>=1) return true;
                        return false;
                    },
                    content:function(){
                        var target=trigger.target;
                        "step 0"
                        player.discardPlayerCard(target,1,'h',get.prompt('Zhuogui_Boss_Manji',target),true).set('ai',function(button){
                            if(!_status.event.att) return 0;
                            if(get.position(button.link)=='e'){
                                if(get.subtype(button.link)=='equip2') return 2*get.value(button.link);
                                return get.value(button.link);
                            }
                            return 1;
                        }).set('att',get.attitude(player,target)<=0);
                        "step 1"
                        if(result.links[0].name=='sha'){
                            trigger.getParent().baseDamage++;
                        }
                    },
                },
                Zhuogui_Boss_Manji_Fucking:{
                    mode:['boss'],
                    audio:"Zhuogui_Boss_Manji",
                    shaRelated:true,
                    trigger:{
                        player:"useCardToPlayered",
                    },
                    filter:function(event,player){
                        if(event.targets.length==1&&event.card.name=='sha'&&event.targets[0].countCards('h')>=1) return true;
                        return false;
                    },
                    content:function(){
                        var target=trigger.target;
                        "step 0"
                        player.discardPlayerCard(target,1,'h',get.prompt('Zhuogui_Boss_Manji',target),true).set('ai',function(button){
                            if(!_status.event.att) return 0;
                            if(get.position(button.link)=='e'){
                                if(get.subtype(button.link)=='equip2') return 2*get.value(button.link);
                                return get.value(button.link);
                            }
                            return 1;
                        }).set('att',get.attitude(player,target)<=0);
                        "step 1"
                        if(result.links[0].name=='sha'){
                            trigger.getParent().baseDamage++;
                        } else {
                            player.gain(result.links[0],'gain');
                        }
                    },
                },
                Zhuogui_Boss_Shiyv:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    forced:true,
                    trigger:{player:"phaseDrawBefore"},
                    content:function(){
                        'step 0'
                        trigger.changeToZero();
                        event.cards=[]; 
                        event.num=0;
                        'step 1'
                        var card=get.cardPile(function(card){
                            for(var i=0;i<event.cards.length;i++){
                                if(get.suit(card)==get.suit(event.cards[i])) return false;
                            }
                            return true;
                        });
                        if(card) event.cards.push(card);
                        event.num++;
                        'step 2'
                        if(event.num<4) event.goto(1);
                        'step 3'
                        player.gain(event.cards,'gain2');
                    },
                },
                Zhuogui_Boss_Guizhao:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:'useCardBegin'},
                    forced:true,
                    filter:function(event,player,name){
                        if(_status.currentPhase!=player) return false;
                        var type=get.type(event.card,'trick');
                        return player.getHistory('custom',function(evt){
                            return evt.Boss_Guizhao_name==type;
                        }).length==0;
                    },
                    content:function(){
                        var type=get.type(trigger.card,'trick');
                        player.draw();
                        player.getHistory('custom').push({Boss_Guizhao_name:type});
                    },	
                },
                Qingqing_Boss_Jiuchi:{
                    mode:['boss'],
                    audio:"jiuchi",
                    enable:"chooseToUse",
                    filterCard:function(card){
                        return get.suit(card)=='spade';
                    },
                    viewAs:{
                        name:"jiu",
                    },
                    viewAsFilter:function(player){
                        if(!player.countCards('hs',{suit:'spade'})) return false;
                    },
                    prompt:"将一张黑桃手牌当酒使用",
                    check:function(card){
                        if(_status.event.type=='dying') return 1/Math.max(0.1,get.value(card));
                        return 4-get.value(card);
                    },
                    ai:{
                        threaten:1.5,
                        basic:{
                            useful:function(card,i){
                                if(_status.event.player.hp>1){
                                    if(i==0) return 4;
                                    return 1;
                                }
                                if(i==0) return 7.3;
                                return 3;
                            },
                            value:function(card,player,i){
                                if(player.hp>1){
                                    if(i==0) return 5;
                                    return 1;
                                }
                                if(i==0) return 7.3;
                                return 3;
                            },
                        },
                        order:function(){
                            return get.order({name:'sha'})+0.2;
                        },
                        result:{
                            target:function(player,target){
                                if(target&&target.isDying()) return 2;
                                if(target&&!target.isPhaseUsing()) return 0;
                                if(lib.config.mode=='stone'&&!player.isMin()){
                                    if(player.getActCount()+1>=player.actcount) return 0;
                                }
                                var shas=player.getCards('h','sha');
                                if(shas.length>1&&(player.getCardUsable('sha')>1||player.countCards('h','zhuge'))){
                                    return 0;
                                }
                                shas.sort(function(a,b){
                                    return get.order(b)-get.order(a);
                                })
                                var card;
                                if(shas.length){
                                    for(var i=0;i<shas.length;i++){
                                        if(lib.filter.filterCard(shas[i],target)){
                                            card=shas[i];break;
                                        }
                                    }
                                }
                                else if(player.hasSha()&&player.needsToDiscard()){
                                    if(player.countCards('h','hufu')!=1){
                                        card={name:'sha'};
                                    }
                                }
                                if(card){
                                    if(game.hasPlayer(function(current){
                                        return (get.attitude(target,current)<0&&
                                            target.canUse(card,current,true,true)&&
                                            !current.hasSkillTag('filterDamage',null,{
                                                player:player,
                                                card:card,
                                                jiu:true,
                                            })&&
                                            get.effect(current,card,target)>0);
                                    })){
                                        return 1;
                                    }
                                }
                                return 0;
                            },
                        },
                        tag:{
                            save:1,
                        },
                    },
                },
                Qingqing_Boss_Roulin:{
                    mode:['boss'],
                    audio:"roulin",
                    trigger:{
                        player:"useCardToPlayered",
                        target:"useCardToTargeted",
                    },
                    forced:true,
                    filter:function(event,player){
                        if(event.card.name!='sha') return false;
                        if(player==event.player){
                            return event.target.sex=='female';
                        }
                        return event.player.sex=='female';
                    },
                    check:function(event,player){
                        return player==event.player;
                    },
                    content:function(){
                        var id=(player==trigger.player?trigger.target:player).playerid;
                        var map=trigger.getParent().customArgs;
                        if(!map[id]) map[id]={};
                        if(typeof map[id].shanRequired=='number'){
                            map[id].shanRequired++;
                        }
                        else{
                            map[id].shanRequired=2;
                        }
                    },
                    ai:{
                        "directHit_ai":true,
                        skillTagFilter:function(player,tag,arg){
                            if(arg.card.name!='sha'||arg.target.sex!='female'||arg.target.countCards('h','shan')>1) return false;
                        },
                    },
                },
                Qingqing_Boss_Baonue:{
                    mode:['boss'],
                    trigger:{player:"phaseUseBegin"},
                    forced:true,
                    multitarget:true,
                    content:function(){
                        event.Baonue=player.maxHp-player.hp;
                        if(event.Baonue>3) event.Baonue=3;
                        'step 0'
                        player.draw(event.Baonue);
                        if(event.Baonue==0) event.finish();
                        player.chooseTarget([1,event.Baonue],get.prompt('Qingqing_Boss_Baonue'),function(card,player,target){
                            return target!=player;
                        }).set('ai',function(target){
                            if(get.attitude(_status.event.player,target)>0){return false;} else{return true;}
                        });
                        'step 1'
                        if(result.bool){
                            skillTargets=result.targets;
                            for(var i=0;i<skillTargets.length;i++){
                                skillTargets[i].damage();
                            }
                        }
                        'step 2'
                        player.loseHp();
                    },
                },
                Qingqing_Boss_Baonue_Difficulty:{
                    mode:['boss'],
                    trigger:{player:"phaseUseBegin"},
                    forced:true,
                    multitarget:true,
                    content:function(){
                        event.Baonue=player.maxHp-player.hp;
                        if(event.Baonue>4) event.Baonue=4;
                        'step 0'
                        player.draw(event.Baonue);
                        if(event.Baonue==0) event.finish();
                        player.chooseTarget([1,event.Baonue],get.prompt('Qingqing_Boss_Baonue_Difficulty'),function(card,player,target){
                            return target!=player;
                        }).set('ai',function(target){
                            if(get.attitude(_status.event.player,target)>0){return false;} else{return true;}
                        });
                        'step 1'
                        if(result.bool){
                            skillTargets=result.targets;
                            for(var i=0;i<skillTargets.length;i++){
                                skillTargets[i].damage();
                            }
                        }
                        'step 2'
                        player.loseHp();
                    },
                },
                Qingqing_Boss_Baonue_Fucking:{
                    mode:['boss'],
                    trigger:{player:"phaseUseBegin"},
                    forced:true,
                    multitarget:true,
                    content:function(){
                        event.Baonue=player.maxHp-player.hp;
                        if(event.Baonue>5) event.Baonue=5;
                        'step 0'
                        player.draw(event.Baonue);
                        if(event.Baonue==0) event.finish();
                        player.chooseTarget([1,event.Baonue],get.prompt('Qingqing_Boss_Baonue_Fucking'),function(card,player,target){
                            return target!=player;
                        }).set('ai',function(target){
                            if(get.attitude(_status.event.player,target)>0){return false;} else{return true;}
                        });
                        'step 1'
                        if(result.bool){
                            skillTargets=result.targets;
                            for(var i=0;i<skillTargets.length;i++){
                                skillTargets[i].damage();
                            }
                        }
                        'step 2'
                        player.loseHp();
                    },
                },
                Qingqing_Boss_Qvbu:{
                    mode:['boss'],
                    trigger:{global:"shaBegin"},
                    forced:true,
                    multitarget:true,
                    filter:function(event,player){if(event.player.isFriendOf(player)) return true;},
                    content:function(){
                        "step 0"
                        trigger.player.judge(function(card){
                            var suit=get.suit(card);
                            if(suit=='spade') return 2;
                            return 0;
                        }).judge2=function(result){
                            var suit=get.suit(result.card);
                            if(suit=='spade') return result.bool=true;
                            return result.bool=false;
                        };
                        "step 1"
                        if(get.suit(result.card)=='spade'){
                            for(var i=0;i<trigger.targets.length;i++){
                                trigger.targets[i].damage(player||'nosource','nocard');
                            }
                        }
                    },
                },
                Qingqing_Boss_Qvbu_Fucking:{
                    mode:['boss'],
                    trigger:{global:"shaBegin"},
                    forced:true,
                    multitarget:true,
                    filter:function(event,player){if(event.player.isFriendOf(player)) return true;},
                    content:function(){
                        "step 0"
                        trigger.player.judge(function(card){
                            var color=get.color(card);
                            if(color=='black') return 2;
                            return 0;
                        }).judge2=function(result){
                            var color=get.color(result.card);
                            if(color=='black') return result.bool=true;
                            return result.bool=false;
                        };
                        "step 1"
                        if(get.color(result.card)=='black'){
                            for(var i=0;i<trigger.targets.length;i++){
                                trigger.targets[i].damage(player||'nosource','nocard');
                            }
                        }
                    },
                },
                Qingqing_Boss_Yongsi:{
                    mode:['boss'],
                    audio:'drlt_yongsi',
                    group:["Qingqing_Boss_Yongsi_1","Qingqing_Boss_Yongsi_2"],
                    subSkill:{
                        "1":{
                            trigger:{
                                player:"phaseDrawBegin2",
                            },
                            forced:true,
                            filter:function(event,player){
                                return !event.numFixed;
                            },
                            content:function(){
                                trigger.num=game.countGroup();
                            },
                            sub:true,
                        },
                        "2":{
                            trigger:{
                                player:"phaseUseEnd",
                            },
                            forced:true,
                            filter:function(event,player){
                                var num=0;
                                player.getHistory('sourceDamage',function(evt){
                                    if(evt.getParent('phaseUse')==event) num+=evt.num;
                                });
                                return !num||num>1;
                            },
                            content:function(){
                                var numx=0;
                                player.getHistory('sourceDamage',function(evt){
                                    if(evt.getParent('phaseUse')==trigger) numx+=evt.num;
                                });
                                if(!numx){
                                    var num=player.hp-player.countCards('h');
                                    if(num>0) player.draw(num);
                                }
                                else{
                                    player.addTempSkill('drlt_yongsi1',{player:'phaseDiscardAfter'});
                                };
                            },
                            sub:true,
                        },
                    },
                },
                Qingqing_Boss_Wangzun:{
                    mode:["boss"],
                    audio:'wangzun',
                    trigger:{global:"phaseJieshuBegin"},
                    forced:true,
                    filter:function(event,player){
                        if(player.storage.Wangzun_Damage==undefined) {
                            event.player.chooseToDiscard(1,'he',true);
                            return false;
                        }
                        if(player.storage.Wangzun_Damage.length==1) return false;
                        if(event.player==player) return false;
                        if(event.player.isFriendOf(player)) return false;
                        return true;
                    },
                    content:function(){
                        var lengthStor=player.storage.Wangzun_Damage;
                        if(lengthStor.length==0){
                            trigger.player.chooseToDiscard(1,'he',true);
                        } else {
                            trigger.player.damage();
                        }
                    },
                    group:['Qingqing_Boss_Wangzun_Damage','Qingqing_Boss_Wangzun_Zhunbei'],
                    subSkill:{
                        Damage:{
                            trigger:{player:"damageAfter"},
                            forced:true,
                            popup:false,
                            sub:true,
                            filter:function(event,player){
                                if(event.source!=undefined&&event.source==_status.currentPhase) return true;
                                return false;
                            },
                            content:function(){
                                for(var i=0;i<trigger.num;i++){
                                    player.storage.Wangzun_Damage.push('1');
                                }
                            },
                        },
                        Zhunbei:{
                            trigger:{global:"phaseZhunbeiBegin"},
                            forced:true,
                            popup:false,
                            sub:true,
                            content:function(){player.storage.Wangzun_Damage=[];},
                        },
                    },
                },
                Qingqing_Boss_Wangzun_Fucking:{
                    mode:["boss"],
                    trigger:{global:"phaseJieshuBegin"},
                    forced:true,
                    filter:function(event,player){
                        if(player.storage.Wangzun_Damage==undefined) {
                            event.player.chooseToDiscard(1,'he',true);
                            player.storage.Wangzun_Damage=[];
                            return false;
                        }
                        if(player.storage.Wangzun_Damage.length==1) return false;
                        if(event.player==player) return false;
                        if(event.player.isFriendOf(player)) return false;
                        return true;
                    },
                    content:function(){
                        var lengthStor=player.storage.Wangzun_Damage;
                        if(lengthStor.length==0){
                            trigger.player.chooseToDiscard(2,'he',true);
                        } else {
                            trigger.player.damage();
                        }
                        delete player.storage.Wangzun_Damage;
                    },
                    group:['Qingqing_Boss_Wangzun_Fucking_Damage'],
                    subSkill:{
                        Damage:{
                            trigger:{player:"damageAfter"},
                            forced:true,
                            sub:true,
                            popup:false,
                            filter:function(event,player){
                                if(player.storage.Wangzun_Damage==undefined) player.storage.Wangzun_Damage=[];
                                if(event.source!=undefined&&event.source==_status.currentPhase) return true;
                                return false;
                            },
                            content:function(){
                                for(var i=0;i<trigger.num;i++){
                                    player.storage.Wangzun_Damage.push('1');
                                }
                            },
                        },
                    },
                },
                Qingqing_Boss_Duoxi:{
                    mode:['boss'],
                    trigger:{global:"phaseDrawBegin"},
                    check:function(event,player){
                        if(!event.player.isFriendOf(player)&&player.hp>1) return true;
                        return false;
                    },
                    filter:function(event,player){
                        if(event.player==player) return false;
                        return true;
                    },
                    content:function(){
                        trigger.num=0;
                        player.loseHp();
                        player.draw();
                        trigger.player.draw();
                    },
                },
                Qingqing_Boss_Duoxi_Fucking:{
                    mode:['boss'],
                    trigger:{global:"phaseDrawBegin"},
                    check:function(event,player){
                        if(event.player==player) return false;
                        if(!event.player.isFriendOf(player)&&player.hp>1) return true;
                        return false;
                    },
                    filter:function(event,player){
                        if(event.player==player) return false;
                        return true;
                    },
                    content:function(){
                        trigger.num=0;
                        player.loseHp();
                        player.draw(2);
                    },
                },
                Qingqing_Boss_Jianxiong:{
                    mode:['boss'],
                    audio:"rejianxiong",
                    trigger:{player:"damageEnd"},
                    content:function (){
                        "step 0"
                        if(get.itemtype(trigger.cards)=='cards'&&get.position(trigger.cards[0],true)=='o'){
                            player.gain(trigger.cards,"gain2");
                        }
                        player.draw('nodelay');
                    },
                    ai:{
                        maixie:true,
                        "maixie_hp":true,
                        effect:{
                            target:function (card,player,target){
                                if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
                                if(get.tag(card,'damage')&&player!=target) return [1,0.6];
                            },
                        },
                    },
                },
                Qingqing_Boss_Lingba:{
                    mode:['boss'],
                    trigger:{player:'phaseUseBegin'},
                    forced:true,
                    filter:function(event,player){
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            if(game.players[i].countCards('h')>=player.countCards('h')) return false;
                        }
                        return true;
                    },
                    content:function(){
                        var hp=player.hp*2;
                        if(player.countCards('h')>=hp){
                            for(var i=0;i<game.players.length;i++){
                                if(game.players[i]==player) continue;
                                if(!game.players[i].isFriendOf(player)) game.players[i].damage(1);
                            }
                        } else {
                            var playerFriend=[];
                            for(var i=0;i<game.players.length;i++){
                                if(game.players[i]==player) continue;
                                if(!game.players[i].isFriendOf(player)) playerFriend.push(i);
                            }
                            if(playerFriend){
                                var random=playerFriend.randomGet();
                                game.players[random].damage();
                            }
                        }
                    },
                },
                Qingqing_Boss_Lingba_Fucking:{
                    mode:['boss'],
                    trigger:{player:'phaseUseBegin'},
                    forced:true,
                    filter:function(event,player){
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            if(game.players[i].countCards('h')>=player.countCards('h')) return false;
                        }
                        return true;
                    },
                    content:function(){
                        var hp=player.hp*2;
                        if(player.countCards('h')>=hp){
                            for(var i=0;i<game.players.length;i++){
                                if(game.players[i]==player) continue;
                                if(!game.players[i].isFriendOf(player)) game.players[i].damage(2);
                            }
                        } else {
                            var playerFriend=[];
                            for(var i=0;i<game.players.length;i++){
                                if(game.players[i]==player) continue;
                                if(!game.players[i].isFriendOf(player)) playerFriend.push(i);
                            }
                            if(playerFriend){
                                var random=playerFriend.randomGet();
                                game.players[random].damage(2);
                            }
                        }
                    },
                },
                Qingqing_Boss_Ningshen:{
                    mode:['boss'],
                    trigger:{player:"recoverBegin"},
                    check:function(event,player){
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            if(!game.players[i].isFriendOf(player)&&game.players[i].countCards('e')>=1&&player.hp>1){ return true; }
                        }
                        return false;
                    },
                    content:function(){
                        trigger.cancel();
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            if(!game.players[i].isFriendOf(player)&&game.players[i].countCards('e')>=1){
                                player.line(game.players[i]);
                                var es=game.players[i].getCards('e');
                                if(es){
                                    var esRandom=es.randomGet();
                                    player.gain(esRandom,"gain2");
                                }
                                break;
                            }
                        }
                    }
                },
                Qingqing_Boss_Ningshen_Fucking:{
                    mode:['boss'],
                    trigger:{player:"recoverBegin"},
                    check:function(event,player){
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            if(!game.players[i].isFriendOf(player)&&game.players[i].countCards('e')>=1&&player.hp>1){ return true; }
                        }
                        return false;
                    },
                    content:function(){
                        trigger.cancel();
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            if(!game.players[i].isFriendOf(player)&&game.players[i].countCards('e')>=1){
                                player.line(game.players[i]);
                                var es=game.players[i].getCards('e');
                                if(es){
                                    var esRandom=es.randomGet();
                                    player.gain(esRandom,"gain2");
                                }
                            }
                        }
                    }
                },
                Qingqing_Boss_Mashu:{
                    mod:{
                        globalFrom:function(from,to,distance){
                            return distance-1;
                        },
                    },
                },
                Qingqing_Boss_Wushuang:{
                    mode:['boss'],
                    audio:"wushuang",
                    trigger:{player:"useCardToPlayered",},
                    forced:true,
                    filter:function(event,player){
                        return event.card.name=='sha'&&!event.getParent().directHit.contains(event.target);
                    },
                    logTarget:"target",
                    content:function(){
                        var id=trigger.target.playerid;
                        var map=trigger.getParent().customArgs;
                        if(!map[id]) map[id]={};
                        if(typeof map[id].shanRequired=='number'){
                            map[id].shanRequired++;
                        }
                        else{
                            map[id].shanRequired=2;
                        }
                    },
                    ai:{
                        "directHit_ai":true,
                        skillTagFilter:function(player,tag,arg){
                            if(arg.card.name!='sha'||arg.target.countCards('h','shan')>1) return false;
                        },
                    },
                    group:["Qingqing_Boss_Wushuang_Juedou"],
                    subSkill:{
                        Juedou:{
                            mode:['boss'],
                            audio:"wushuang",
                            trigger:{
                                player:"useCardToPlayered",
                                target:"useCardToTargeted",
                            },
                            forced:true,
                            sub:true,
                            logTarget:function(trigger,player){
                                return player==trigger.player?trigger.target:trigger.player
                            },
                            filter:function(event,player){
                                return event.card.name=='juedou';
                            },
                            content:function(){
                                var id=(player==trigger.player?trigger.target:trigger.player)['playerid'];
                                var idt=trigger.target.playerid;
                                var map=trigger.getParent().customArgs;
                                if(!map[idt]) map[idt]={};
                                if(!map[idt].shaReq) map[idt].shaReq={};
                                if(!map[idt].shaReq[id]) map[idt].shaReq[id]=1;
                                map[idt].shaReq[id]++;
                            },
                            ai:{
                                "directHit_ai":true,
                                skillTagFilter:function(player,tag,arg){
                                    if(arg.card.name!='juedou'||Math.floor(arg.target.countCards('h','sha')/2)>player.countCards('h','sha')) return false;
                                },
                            },
                        },
                    },
                },
                Qingqing_Boss_Shenji:{
                    mode:['boss'],
                    trigger:{player:"judgeBefore"},
                    filter:function(event,player){
                        return player.countCards('h')>=2;
                    },
                    content:function(){
                        player.chooseToDiscard(2,'h',true);
                        player.discard(player.getCards('j'));
                    },
                    group:["Qingqing_Boss_Shenji_Draw","Qingqing_Boss_Shenji_Use"],
                    subSkill:{
                        Draw:{
                            trigger:{player:"phaseDrawBefore"},
                            sub:true,
                            content:function(){
                                trigger.num+=2;
                            },
                        },
                        Use:{
                            trigger:{player:"phaseUseBefore"},
                            sub:true,
                            content:function(){
                                player.addTempSkill('Qingqing_Boss_Shenji_Buff');
                            },
                        },
                    },
                },
                Qingqing_Boss_Shenji_Buff:{
                    mode:['boss'],
                    mod:{
                        selectTarget:function(card,player,range){if(card.name=='sha'&&range[1]!=-1) range[1]++;},
                        cardUsable:function(card,player,num){if(player.isEmpty(1)&&card.name=='sha') return num+1;},
                    },
                },
                Qingqing_Boss_Shenji_Fucking:{
                    trigger:{player:"phaseZhunbeiBegin"},
                    filter:function(event,player){
                        return player.countCards('h')>=2&&player.countCards('j')>=1;
                    },
                    content:function(){
                        player.chooseToDiscard(2,'h',true);
                        player.discard(player.getCards('j'));
                    },
                    group:["Qingqing_Boss_Shenji_Draw","Qingqing_Boss_Shenji_Use"],
                    subSkill:{
                        Draw:{
                            trigger:{player:"phaseDrawBegin"},
                            sub:true,
                            content:function(){
                                trigger.num+=2;
                            },
                        },
                        Use:{
                            trigger:{player:"phaseUseBefore"},
                            sub:true,
                            content:function(){
                                player.addTempSkill('Qingqing_Boss_Shenji_Buff_Fucking');
                            },
                        },
                    },
                },
                Qingqing_Boss_Shenji_Buff_Fucking:{
                    mode:['boss'],
                    mod:{
                        selectTarget:function(card,player,range){if(card.name=='sha'&&range[1]!=-1) range[1]+3;},
                        cardUsable:function(card,player,num){return num+2;},
                    },
                },
                Qingqing_Boss_Zhanjia:{
                    mode:['boss'],
                    trigger:{player:"damageBegin4"},
                    forced:true,
                    usable:1,
                    filter:function(event,player){
                        return event.num>2;
                    },
                    content:function(){
                        trigger.num=2;
                        player.draw(2);
                    },
                },
                Qingqing_Boss_Fankui:{
                    mode:['boss'],
                    trigger:{
                        player:"damageEnd",
                    },
                    audio:"refankui",
                    direct:true,
                    filter:function(event,player){
                        return (event.source&&event.source.countGainableCards(player,'he')&&event.num>0&&event.source!=player);
                    },
                    content:function(){
                        "step 0"
                        event.count=trigger.num;
                        "step 1"
                        event.count--;
                        player.gainPlayerCard(get.prompt('refankui',trigger.source),trigger.source,get.buttonValue,'he').set('logSkill',[event.name,trigger.source]);
                        "step 2"
                        if(result.bool&&event.count>0&&trigger.source.countGainableCards(player,'he')>0) event.goto(1);
                    },
                    ai:{
                        "maixie_defend":true,
                        effect:{
                            target:function(card,player,target){
                                if(player.countCards('he')>1&&get.tag(card,'damage')){
                                    if(player.hasSkillTag('jueqing',false,target)) return [1,-1.5];
                                    if(get.attitude(target,player)<0) return [1,1];
                                }
                            },
                        },
                    },
                },
                Qingqing_Boss_Guicai:{
                    mode:['boss'],
                    trigger:{
                        global:"judge",
                    },
                    direct:true,
                    filter:function(event,player){
                        return player.countCards('hes')>0;
                    },
                    content:function(){
                        "step 0"
                        player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
                        get.translation(trigger.player.judging[0])+'，'+get.prompt('reguicai'),'hes',function(card){
                            var player=_status.event.player;
                            var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
                            if(mod2!='unchanged') return mod2;
                            var mod=game.checkMod(card,player,'unchanged','cardRespondable',player);
                            if(mod!='unchanged') return mod;
                            return true;
                        }).set('ai',function(card){
                            var trigger=_status.event.getTrigger();
                            var player=_status.event.player;
                            var judging=_status.event.judging;
                            var result=trigger.judge(card)-trigger.judge(judging);
                            var attitude=get.attitude(player,trigger.player);
                            if(attitude==0||result==0) return 0;
                            if(attitude>0){
                                return result-get.value(card)/2;
                            }
                            else{
                                return -result-get.value(card)/2;
                            }
                        }).set('judging',trigger.player.judging[0]);
                        "step 1"
                        if(result.bool){
                            player.respond(result.cards,'reguicai','highlight','noOrdering');
                        }
                        else{
                            event.finish();
                        }
                        "step 2"
                        if(result.bool){
                            if(trigger.player.judging[0].clone){
                                trigger.player.judging[0].clone.classList.remove('thrownhighlight');
                                game.broadcast(function(card){
                                    if(card.clone){
                                        card.clone.classList.remove('thrownhighlight');
                                    }
                                },trigger.player.judging[0]);
                                game.addVideo('deletenode',player,get.cardsInfo([trigger.player.judging[0].clone]));
                            }
                            game.cardsDiscard(trigger.player.judging[0]);
                            trigger.player.judging[0]=result.cards[0];
                            trigger.orderingCards.addArray(result.cards);
                            game.log(trigger.player,'的判定牌改为',result.cards[0]);
                            game.delay(2);
                        }
                    },
                    ai:{
                        rejudge:true,
                        tag:{
                            rejudge:1,
                        },
                    },
                },
                Qingqing_Boss_Langgu:{
                    mode:["boss"],
                    trigger:{player:"gainAfter"},
                    filter:function(event,player){
                        if(player.hasSkill('Qingqing_Boss_Langgu_No')) return false;
                        if(event.source==undefined||event.source==player) return false;
                        return true;
                    },
                    check:function(event,player){
                        if(event.source.isFriendOf(player)) return false;
                        return true;
                    },
                    forced:true,
                    content:function(){
                        "step 0"
                        player.judge(function(card){
                            var suit=get.suit(card);
                            if(suit=='spade') return 5;
                            return 0;
                        }).judge2=function(result){
                            var suit=get.suit(result.card);
                            if(suit=='spade') return result.bool=true;
                            return result.bool=false;
                        };
                        "step 1"
                        if(result.suit=='spade'){
                            trigger.source.randomDiscard();
                        } else {
                            player.addTempSkill('Qingqing_Boss_Langgu_No','phaseUseEnd');
                        }
                    }
                },
                Qingqing_Boss_Langgu_Fucking:{
                    mode:["boss"],
                    trigger:{player:"gainAfter"},
                    filter:function(event,player){
                        if(player.hasSkill('Qingqing_Boss_Langgu_No')) return false;
                        if(event.source==undefined||event.source==player) return false;
                        return true;
                    },
                    check:function(event,player){
                        if(event.source.isFriendOf(player)) return false;
                        return true;
                    },
                    forced:true,
                    content:function(){
                        "step 0"
                        player.judge(function(card){
                            var color=get.color(card);
                            if(color=='black') return 5;
                            return 0;
                        }).judge2=function(result){
                            var color=get.color(result.card);
                            if(color=='black') return result.bool=true;
                            return result.bool=false;
                        };
                        "step 1"
                        if(get.color(result.card)=='black'){
                            trigger.source.randomDiscard();
                        } else {
                            player.addTempSkill('Qingqing_Boss_Langgu_No','phaseUseEnd');
                        }
                    }
                },
                Qingqing_Boss_Langgu_No:{}, //开关
                Qingqing_Boss_Yuanlv:{
                    mode:["boss"],
                    trigger:{source:"damageBegin3",},
                    check:function(event,player){
                        if(event.num>=2) return false;
                        if(event.player.countCards('e')>1&&player.hp>1) return true; 
                        return false;
                    },
                    filter:function(event,player){
                        return get.type(event.card)=='trick'&&!event.player.isFriendOf(player);
                    },
                    content:function(){
                        trigger.cancel();
                        player.draw();
                        player.damage(1,trigger.player);
                    },
                },
                Qingqing_Boss_Guidao:{
                    audio:'guidao',
                    trigger:{
                        global:"judge",
                    },
                    filter:function(event,player){
                        return player.countCards('hes',{color:'black'})>0;
                    },
                    direct:true,
                    content:function(){
                        "step 0"
                        player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
                        get.translation(trigger.player.judging[0])+'，'+get.prompt('guidao'),'hes',function(card){
                            if(get.color(card)!='black') return false;
                            var player=_status.event.player;
                            var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
                            if(mod2!='unchanged') return mod2;
                            var mod=game.checkMod(card,player,'unchanged','cardRespondable',player);
                            if(mod!='unchanged') return mod;
                            return true;
                        }).set('ai',function(card){
                            var trigger=_status.event.getTrigger();
                            var player=_status.event.player;
                            var judging=_status.event.judging;
                            var result=trigger.judge(card)-trigger.judge(judging);
                            var attitude=get.attitude(player,trigger.player);
                            if(attitude==0||result==0) return 0;
                            if(attitude>0){
                                return result;
                            }
                            else{
                                return -result;
                            }
                        }).set('judging',trigger.player.judging[0]);
                        "step 1"
                        if(result.bool){
                            player.respond(result.cards,'highlight','guidao','noOrdering');
                        }
                        else{
                            event.finish();
                        }
                        "step 2"
                        if(result.bool){
                            player.$gain2(trigger.player.judging[0]);
                            player.gain(trigger.player.judging[0]);
                            trigger.player.judging[0]=result.cards[0];
                            trigger.orderingCards.addArray(result.cards);
                            game.log(trigger.player,'的判定牌改为',result.cards[0]);
                        }
                        "step 3"
                        game.delay(2);
                    },
                    ai:{
                        rejudge:true,
                        tag:{
                            rejudge:1,
                        },
                    },
                },
                Qingqing_Boss_Leiji:{
                    audio:'releiji',
                    trigger:{
                        player:["useCard","respond"],
                    },
                    filter:function(event,player){
                        return event.card.name=='shan';
                    },
                    direct:true,
                    content:function(){
                        "step 0";
                        player.chooseTarget(get.prompt2('releiji'),function(card,player,target){
                         return target!=player;
                        }).ai=function(target){
                            if(target.hasSkill('hongyan')) return 0;
                            return get.damageEffect(target,_status.event.player,_status.event.player,'thunder');
                        };
                        "step 1"
                        if(result.bool){
                            player.logSkill('releiji',result.targets,'thunder');
                            event.target=result.targets[0];
                            event.target.judge(function(card){
                                var suit=get.suit(card);
                                if(suit=='spade') return -4;
                                if(suit=='club') return -2;
                                return 0;
                            }).judge2=function(result){
                                return result.bool==false?true:false;
                            };
                        }
                        else{
                            event.finish();
                        }
                        "step 2"
                        if(result.suit=='club'){
                            event.target.damage('thunder');
                            player.recover();
                        }
                        else if(result.suit=='spade'){
                            event.target.damage(2,'thunder');
                        }
                    },
                    ai:{
                        useShan:true,
                        effect:{
                            target:function(card,player,target,current){
                                if(get.tag(card,'respondShan')){
                                    var hastarget=game.hasPlayer(function(current){
                                        return get.attitude(target,current)<0;
                                    });
                                    var be=target.countCards('e',{color:'black'});
                                    if(target.countCards('h','shan')&&be){
                                        if(!target.hasSkill('guidao')) return 0;
                                        return [0,hastarget?target.countCards('he')/2:0];
                                    }
                                    if(target.countCards('h','shan')&&target.countCards('h')>2){
                                        if(!target.hasSkill('guidao')) return 0;
                                        return [0,hastarget?target.countCards('h')/4:0];
                                    }
                                    if(target.countCards('h')>3||(be&&target.countCards('h')>=2)){
                                        return [0,0];
                                    }
                                    if(target.countCards('h')==0){
                                        return [1.5,0];
                                    }
                                    if(target.countCards('h')==1&&!be){
                                        return [1.2,0];
                                    }
                                    if(!target.hasSkill('guidao')) return [1,0.05];
                                    return [1,Math.min(0.5,(target.countCards('h')+be)/4)];
                                }
                            },
                        },
                    },
                },
                Qingqing_Boss_Jianzheng:{
                    trigger:{
                        global:"useCardToPlayer",
                    },
                    filter:function(event,player){
                        if(!player.countCards('h')) return false;
                        return event.player!=player&&event.card.name=='sha'&&!event.targets.contains(player)&&
                        event.player.inRange(player);
                    },
                    direct:true,
                    content:function(){
                        "step 0"
                        var effect=0;
                        for(var i=0;i<trigger.targets.length;i++){
                            effect-=get.effect(trigger.targets[i],trigger.card,trigger.player,player);
                        }
                        if(effect>0){
                            if(get.color(trigger.card)!='black'){
                                effect=0;
                            }
                            else{
                                effect=1;
                            }
                            if(trigger.targets.length==1){
                                if(trigger.targets[0].hp==1){
                                    effect++;
                                }
                                if(effect>0&&trigger.targets[0].countCards('h')<player.countCards('h')){
                                    effect++;
                                }
                            }
                            if(effect>0){
                                effect+=6;
                            }
                        }
                        player.chooseCard('h',get.prompt2('Qingqing_Boss_Jianzheng',trigger.player)).set('ai',function(card){
                            if(_status.event.effect>=0){
                                var val=get.value(card);
                                if(val<0) return 10-val;
                                return _status.event.effect-val;
                            }
                            return 0;
                        }).set('effect',effect).set('logSkill',['Qingqing_Boss_Jianzheng',trigger.player]);
                        "step 1"
                        if(result.bool&&result.cards){
                            event.card=result.cards[0];
                            trigger.targets.length=0;
                            trigger.getParent().triggeredTargets1.length=0;
                        }
                        else{
                            event.finish();
                        }
                        "step 2"
                        if(!event.isMine()) game.delayx();
                        "step 3"
                        if(event.card){
                            player.logSkill('Qingqing_Boss_Jianzheng',trigger.player);
                            player.lose(event.card,ui.cardPile,'visible','insert');
                            player.$throw(event.card,1000);
                            game.log(player,'将',card,'置于牌堆顶');
                        }
                        "step 4"
                        if(get.color(trigger.card)!='black'){
                            trigger.getParent().targets.push(player);
                            trigger.player.line(player);
                            game.delay();
                        }
                    },
                    ai:{
                        threaten:1.1,
                        expose:0.25,
                    },
                },
                Qingqing_Boss_Jianzheng_Fucking:{
                    trigger:{
                        global:"useCardToPlayer",
                    },
                    filter:function(event,player){
                        if(!player.countCards('h')) return false;
                        return event.player!=player&&event.card.name=='sha'&&!event.targets.contains(player)&&
                        event.player.inRange(player);
                    },
                    direct:true,
                    content:function(){
                        "step 0"
                        var effect=0;
                        for(var i=0;i<trigger.targets.length;i++){
                            effect-=get.effect(trigger.targets[i],trigger.card,trigger.player,player);
                        }
                        if(effect>0){
                            if(get.color(trigger.card)!='black'){
                                effect=1;
                            }
                            else{
                                effect=1;
                            }
                            if(trigger.targets.length==1){
                                if(trigger.targets[0].hp==1){
                                    effect++;
                                }
                                if(effect>0&&trigger.targets[0].countCards('h')<player.countCards('h')){
                                    effect++;
                                }
                            }
                            if(effect>0){
                                effect+=6;
                            }
                        }
                        player.chooseCard('h',get.prompt2('Qingqing_Boss_Jianzheng',trigger.player)).set('ai',function(card){
                            if(_status.event.effect>=0){
                                var val=get.value(card);
                                if(val<0) return 10-val;
                                return _status.event.effect-val;
                            }
                            return 0;
                        }).set('effect',effect).set('logSkill',['Qingqing_Boss_Jianzheng',trigger.player]);
                        "step 1"
                        if(result.bool&&result.cards){
                            event.card=result.cards[0];
                            trigger.targets.length=0;
                            trigger.getParent().triggeredTargets1.length=0;
                        }
                        else{
                            event.finish();
                        }
                        "step 2"
                        if(!event.isMine()) game.delayx();
                        "step 3"
                        if(event.card){
                            player.logSkill('Qingqing_Boss_Jianzheng',trigger.player);
                            player.lose(event.card,ui.cardPile,'visible','insert');
                            player.$throw(event.card,1000);
                            game.log(player,'将',card,'置于牌堆顶');
                        }
                        "step 4"
                        trigger.getParent().targets.push(player);
                        trigger.player.line(player);
                        game.delay();
                    },
                    ai:{
                        threaten:1.1,
                        expose:0.25,
                    },
                },
                Qingqing_Boss_Yinlei:{
                    trigger:{
                        player:"loseEnd",
                    },
                    forced:true,
                    filter:function(event,player){
                        return _status.currentPhase!=player;
                    },
                    content:function(){
                        var num=game.players.length-1;
                        var rand=game.Diuse_randomNum(num,0);
                        if(!game.players[rand].isLinked()){
                            game.players[rand].link(true);
                        }
                    },
                    ai:{
                        effect:{
                            target:function(card){
                                if(get.tag(card,'loseCard')){
                                    return [0.5,1];
                                }
                            },
                        },
                    },
                },
                Qingqing_Boss_Yinlei_Fucking:{
                    trigger:{
                        player:"loseEnd",
                    },
                    forced:true,
                    content:function(){
                        var num=game.players.length-1;
                        var rand=game.Diuse_randomNum(num,0);
                        if(!game.players[rand].isLinked()){
                            game.players[rand].link(true);
                        }
                    },
                    ai:{
                        effect:{
                            target:function(card){
                                if(get.tag(card,'loseCard')){
                                    return [0.5,1];
                                }
                            },
                        },
                    },
                },
                Tianshu_Boss_Dishi:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"useCardToTarget"},
                    filter:function(event,player){
                        if(player.storage.DishiTarget!=undefined){
                            var lengthStor=player.storage.DishiTarget;
                            for(var i=0;i<lengthStor.length;i++){
                                if(event.target==lengthStor[i]) return false;
                            }
                            // if(event.targets.length==game.players.length){
                            //     for(var i=0;i<game.players.length;i++){
                            //         if(game.players[i]==player) continue;
                            //         player.storage.DishiTarget.add(game.players[i]);
                            //     }
                            //     return true;
                            // }
                        }
                        if(!event.targets) return false;
                        if(event.card.name!='sha'&&get.type(event.card)!='trick') return false;
                        return true;
                        
                    },
                    frequent:true,
                    content:function(){
                        'step 0'
                        if(player.storage.DishiTarget==undefined) player.storage.DishiTarget=[];
                        for(var i=0;i<trigger.targets.length;i++){player.storage.DishiTarget.add(trigger.targets[i]);}
                        var bool1=(trigger.targets.length>1);
                        if(bool1){ event.type='remove'; }else{ event.type='add'; }
                        'step 1'
                        if(event.type=='add'){
                            player.chooseTarget(event.unchosen?get.prompt('Tianshu_Boss_Dishi'):null,'为'+get.translation(trigger.card)+'增加一个目标',function(card,player,target){
                                var trigger=_status.event.getTrigger();
                                return !trigger.targets.contains(target)&&lib.filter.targetEnabled2(trigger.card,trigger.player,target);
                            }).set('ai',function(target){
                                var trigger=_status.event.getTrigger();
                                return get.effect(target,trigger.card,trigger.player,_status.event.player);
                            });
                        }
                        else{
                            player.chooseTarget(event.unchosen?get.prompt('Tianshu_Boss_Dishi'):null,'为'+get.translation(trigger.card)+'减少一个目标',function(card,player,target){
                                return _status.event.targets.contains(target);
                            }).set('ai',function(target){
                                var trigger=_status.event.getTrigger();
                                return -get.effect(target,trigger.card,trigger.player,_status.event.player);
                            }).set('targets',trigger.targets);
                        }
                        'step 2'
                        if(result.bool){
                            if(!event.isMine()&&!event.isOnline()) game.delayx();
                            event.target=result.targets[0];
                        }
                        else{
                            event.finish();
                        }
                        'step 3'
                        player.logSkill('Tianshu_Boss_Dishi',event.target);
                        if(event.type=='add'){
                            trigger.targets.push(event.target);
                            player.storage.DishiTarget.add(event.target)
                        }
                        else{
                            trigger.getParent().excluded.add(event.target);
                            player.storage.DishiTarget.add(event.target)
                        }
                    },
                    group:['Tianshu_Boss_Dishi_Targets'],
                    subSkill:{
                        Targets:{
                            trigger:{global:"useCardAfter"},
                            forced:true,
                            sub:true,
                            popup:false,
                            filter:function(event,player){
                                if(player.storage.DishiTarget==undefined||player.storage.DishiTarget=='') return false;
                                return true;
                            },
                            content:function(){
                                player.storage.DishiTarget=[];
                            },
                        },
                    },
                },
                Tianshu_Boss_Jiutian:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"phaseZhunbeiBegin"},
                    filter:function(event,player){
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            if(game.players[i].isFriendOf(player)) continue;
                            if(game.players[i].countCards('h')>=2) return true;
                        }
                        return false;
                    },
                    forced:true,
                    content:function(){
                        var suitSame=true;
                        player.storage.JiutianPlayers=[],player.storage.JiutianCards=[];
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            if(game.players[i].isFriendOf(player)) continue;
                            if(game.players[i].countCards('h')>=2){
                            var playerCard=game.players[i].getCards();
                                for(var j=0;j<playerCard.length;j++){
                                    for(var k=0;k<j;k++){
                                        if(get.suit(playerCard[j])!=get.suit(playerCard[k])){
                                            if(player.storage.JiutianPlayers.indexOf(game.players[i])==-1){player.storage.JiutianPlayers.add(game.players[i]);}
                                        }
                                    }
                                }
                            }
                        }
                        var lengthStor=player.storage.JiutianPlayers;
                        for(var i=0;i<lengthStor.length;i++){
                            var card=lengthStor[i].getCards('h').randomGet();
                            player.line(lengthStor[i]);
                            player.gain(card,lengthStor[i]);
                            game.log(player,"获得了",lengthStor[i],"的一张手牌");
                            player.storage.JiutianCards.add(card);
                        }
                        var lengthStor1=player.storage.JiutianCards;
                        for(var i=0;i<lengthStor1.length;i++){
                            for(var j=0;j<i;j++){
                                if(get.suit(lengthStor1[j])==get.suit(lengthStor1[i])) suitSame=false;
                            }
                        }
                        if(suitSame){for(var i=0;i<lengthStor.length;i++){lengthStor[i].damage();}}
                    },
                },
                Tianshu_Boss_Xuanlie:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    mark:true,
                    locked:false,
                    marktext:'玄烈',
                    intro:{
                        content:function(storage,player,skill){
                            var str='即将受伤的角色：';
                            if(player.storage.Tianshu_Boss_Xuanlie){
                                str+=get.translation(player.storage.Tianshu_Boss_Xuanlie);
                            } else {
                                player.storage.Tianshu_Boss_Xuanlie=[];
                                str+='无';
                            }
                            return str;
                        },
                    },
                    trigger:{player:"gainBegin"},
                    forced:true,
                    popup:false,
                    filter:function(event,player,source){
                        if(player.storage.Tianshu_Boss_Xuanlie==''||player.storage.Tianshu_Boss_Xuanlie==undefined) player.storage.Tianshu_Boss_Xuanlie=[]
                        if(event.source==undefined||event.source==''||_status.currentPhase!=player) return false;
                        return true;
                    },
                    content:function(){
                        if(trigger.source) player.storage.Tianshu_Boss_Xuanlie.add(trigger.source);
                    },
                    group:['Tianshu_Boss_Xuanlie_Jieshu'],
                    subSkill:{
                        Jieshu:{
                            trigger:{player:"phaseJieshuAfter"},
                            forced:true,
                            sub:true,
                            filter:function(event,player,source){
                                if(player.storage.Tianshu_Boss_Xuanlie==''||player.storage.Tianshu_Boss_Xuanlie==undefined) player.storage.Tianshu_Boss_Xuanlie=[]
                                return true;
                            },
                            content:function(){
                                var lengthStor=player.storage.Tianshu_Boss_Xuanlie;
                                for(var i=0;i<lengthStor.length;i++){
                                    lengthStor[i].damage();
                                }
                                player.storage.Tianshu_Boss_Xuanlie=[];
                            },
                        },
                    },
                },
                Tianshu_Boss_Shenqu:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"damageAfter"},
                    forced:true,
                    filter:function(event,player){return true;},
                    content:function(){
                        "step 0"
                        event.ShenquNum=trigger.num;
                        "step 1"
                        event.ShenquNum--;
                        "step 2"
                        var card=get.bottomCards()[0];
                        ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
                        player.judge(function(card){
                            if(get.color(card)=='red') return 2;
                            return 0;
                        }).judge2=function(result){
                            var color=get.color(result.card);
                            if(color=='red') return result.bool=true;
                            return result.bool=false;
                        };
                        "step 3"
                        if(get.color(result.card)=='red'){
                            player.draw();
                            if(trigger.source!=undefined) trigger.source.chooseToDiscard(1,true);
                        }
                        "step 4"
                        if(event.ShenquNum>0){
                            player.chooseBool(get.prompt2('Tianshu_Boss_Shenqu')).set('frequentSkill','Tianshu_Boss_Shenqu');
                        }
                        else event.finish();
                        "step 5"
                        if(result.bool){
                            player.logSkill('Tianshu_Boss_Shenqu');
                            event.goto(1);
                        }
                        game.updateRoundNumber();
                    },
                },
                Tianshu_Boss_Shenqu_Kuafu:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"damageAfter"},
                    forced:true,
                    filter:function(event,player){return true;},
                    content:function(){
                        "step 0"
                        event.ShenquNum=trigger.num;
                        "step 1"
                        event.ShenquNum--;
                        "step 2"
                        var card=get.bottomCards()[0];
                        ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
                        player.judge(function(card){
                            if(get.color(card)=='red') return 2;
                            return 0;
                        }).judge2=function(result){
                            var color=get.color(result.card);
                            if(color=='red') return result.bool=true;
                            return result.bool=false;
                        };
                        "step 3"
                        if(get.color(result.card)=='red'){
                            player.draw();
                            if(trigger.source!=undefined) trigger.source.chooseToDiscard(1,true);
                        }
                        "step 4"
                        if(event.ShenquNum>0){
                            player.chooseBool(get.prompt2('Tianshu_Boss_Shenqu')).set('frequentSkill','Tianshu_Boss_Shenqu');
                        }
                        else event.finish();
                        "step 5"
                        if(result.bool){
                            player.logSkill('Tianshu_Boss_Shenqu');
                            event.goto(1);
                        }
                        game.updateRoundNumber();
                    },
                },
                Tianshu_Boss_Fenshi:{
                    mode:["boss"],
                    trigger:{player:"phaseZhunbeiBegin"},
                    forced:true,
                    filter:function(event,player){
                        if(player.countCards('h')==player.hp) return false;
                        return true;
                    },
                    content:function(){
                        player.storage.FenshiName=[];
                        if(player.countCards('h')<player.hp){
                            player.draw(player.hp-player.countCards('h'));
                        } else {
                            var num=player.countCards('h')-player.hp;
                            if(num){
                                for(var i=0;i<game.players.length;i++){
                                    if(game.players[i]==player) continue;
                                    if(!game.players[i].isFriendOf(player)){player.storage.FenshiName.add(game.players[i]);}
                                }
                                var lengthStor=player.storage.FenshiName;
                                for(var i=0;i<lengthStor.length;i++){
                                    if(i==lengthStor.length-1&&num>0){
                                        lengthStor[i].damage(num);
                                        num-=num;
                                    } else {
                                        var randnum=game.Diuse_randomNum(num,0);
                                        if(randnum==0) continue;
                                        lengthStor[i].damage(randnum);
                                        num-=randnum;
                                    }
                                }
                            }
                        }
                    },
                },
                Tianshu_Boss_Zhiri:{
                    mode:["boss"],
                    trigger:{global:"useCardToPlayered"},
                    multitarget:true,
                    forced:true,
                    popup:false,
                    filter:function(event,player){
                        if(!event.isFirstTarget) return false;
                        return (get.type(event.card,'trick')=='trick'&&event.card.isCard&&get.color(event.card)=='red'&&!event.player.isFriendOf(player));
                    },
                    content:function(){
                        player.draw(2);
                    },
                },
                Tianshu_Boss_Zhiri_Fuck:{
                    mode:["boss"],
                    trigger:{global:"useCardToPlayered"},
                    forced:true,
                    popup:false,
                    multitarget:true,
                    filter:function(event,player){
                        if(!event.isFirstTarget) return false;
                        return (get.type(event.card,'trick')=='trick'&&event.card.isCard&&get.color(event.card)=='red'&&!event.player.isFriendOf(player));
                    },
                    content:function(){
                        player.draw(3);
                    },
                },
                Tianshu_Boss_Xinji:{
                    mode:["boss"],
                    trigger:{player:"loseAfter",},
                    filter:function(event,player){
                        if(event.type!='discard'||_status.currentPhase==player) return false;
                        return true;
                    },
                    forced:true,
                    content:function(){_status.currentPhase.damage();},
                },
                Tianshu_Boss_Shenen:{
                    mode:['boss'],
                    forced:true,
                    unique:true,
                    global:'Tianshu_Boss_Shenen_Buff'
                },
                Tianshu_Boss_Shenen_Buff:{
                    mod:{
                        targetInRange:function(card,player){if(player.side) return true;},
                        maxHandcard:function(player,num){if(player.side) return num+1;}
                    },
                },
                Tianshu_Boss_Baiyi:{
                    mode:['boss'],
                    trigger:{global:'roundStart'},
                    forced:true,
                    filter:function(event,player){return game.roundNumber==5;},
                    logTarget:function(event,player){
                        return player.getEnemies();
                    },
                    content:function(){
                        'step 0'
                        event.list=player.getEnemies();
                        'step 1'
                        if(event.list.length){
                            event.list.shift().damage(1,'thunder',player);
                            event.redo();
                        }
                    },
                    group:['Tianshu_Boss_Baiyi_Draw','Tianshu_Boss_Baiyi_Thunder'],
                    subSkill:{
                        Draw:{
                            trigger:{global:'phaseDrawBegin'},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                return game.roundNumber<3&&!event.player.isFriendOf(player);
                            },
                            content:function(){
                                trigger.num--;
                            }
                        },
                        Thunder:{
                            trigger:{player:'damageBegin4'},
                            filter:function(event,player){
                                return event.nature=='thunder'&&game.roundNumber<7&&event.player.isFriendOf(player);
                            },
                            forced:true,
                            sub:true,
                            content:function(){
                                trigger.num--;
                            },
                            ai:{
                                nothunder:true,
                                skillTagFilter:function(){
                                    return game.roundNumber<7;
                                },
                                effect:{
                                    target:function(card,player,target,current){
                                        if(get.tag(card,'thunderDamage')&&game.roundNumber<7) return 0;
                                    }
                                }
                            }
                        }
                    }
                },
                Tianshu_Boss_Baiyi_Fucking:{
                    mode:['boss'],
                    trigger:{global:'roundStart'},
                    forced:true,
                    filter:function(){return game.roundNumber==5;},
                    logTarget:function(event,player){
                        return player.getEnemies();
                    },
                    content:function(){
                        'step 0'
                        event.list=player.getEnemies();
                        'step 1'
                        if(event.list.length){
                            event.list.shift().damage(2,'thunder',player);
                            event.redo();
                        }
                    },
                    group:['Tianshu_Boss_Baiyi_Fucking_Draw','Tianshu_Boss_Baiyi_Fucking_Thunder'],
                    subSkill:{
                        Draw:{
                            trigger:{global:'phaseDrawBegin'},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                return game.roundNumber<3&&!event.player.isFriendOf(player);
                            },
                            content:function(){
                                trigger.num--;
                            }
                        },
                        Thunder:{
                            trigger:{global:'damageBegin4'},
                            filter:function(event,player){
                                return event.nature=='thunder'&&game.roundNumber<7&&event.player.isFriendOf(player);
                            },
                            forced:true,
                            sub:true,
                            content:function(){
                                trigger.cancel();
                            },
                            ai:{
                                nothunder:true,
                                skillTagFilter:function(){
                                    return game.roundNumber<7;
                                },
                                effect:{
                                    target:function(card,player,target,current){
                                        if(get.tag(card,'thunderDamage')&&game.roundNumber<7) return 0;
                                    }
                                }
                            }
                        }
                    }
                },
                Tianshu_Boss_Juehong:{
                    trigger:{
                        player:"phaseZhunbeiBegin",
                    },
                    forced:true,
                    logTarget:function(event,player){
                        return player.getEnemies();
                    },
                    content:function(){
                        'step 0'
                        event.list=player.getEnemies().sortBySeat();
                        'step 1'
                        if(event.list.length){
                            var target=event.list.shift();
                            if(target.countCards('he')){
                                var es=target.getCards('e');
                                if(es.length){
                                    target.discard(es);
                                }
                                else{
                                    player.discardPlayerCard(target,'h',true);
                                }
                            }
                            event.redo();
                        }
                    },
                },
                Tianshu_Boss_Juehong_Fucking:{
                    trigger:{
                        player:"phaseZhunbeiBegin",
                    },
                    forced:true,
                    logTarget:function(event,player){
                        return player.getEnemies();
                    },
                    content:function(){
                        'step 0'
                        event.list=player.getEnemies().sortBySeat();
                        'step 1'
                        if(event.list.length){
                            var target=event.list.shift();
                            if(target.countCards('he')){
                                var es=target.getCards('e');
                                if(es.length){
                                    target.discard(es);
                                }
                                else{
                                    player.discardPlayerCard(target,'h',2,true);
                                }
                            }
                            event.redo();
                        }
                    },
                },
    
                Longzhou_Boss_Tianqi_Mark:{
                    mode:["boss"],
                    marktext:"多云",
                    mark:true,
                    locked:true,
                    intro:{
                        content:function(storage,player,skill){
                            return "有其他天气正在传播，咱先歇会儿吧。"; 
                        }
                    },
                },
                Longzhou_Boss_Tianqi:{
                    mode:["boss"],
                    marktext:"天气",
                    mark:true,
                    locked:true,
                    intro:{
                        content:function(storage,player,skill){
                            if(player.storage.Boss_Tianqi==undefined) player.storage.Boss_Tianqi=[];
                            var num=player.storage.Boss_Tianqi[0];
                            if(num==undefined) num=0;
                            switch(num){
                                case 1:
                                    return "大雾：敌方计算与对方的距离+1。";
                                    break;
                                case 2:
                                    return "烈日：敌方每名角色的回合开始时，除非该角色弃置一张【闪】，否则受到1点火焰伤害";
                                    break;
                                case 3:
                                    return "雷电：敌方每名角色的回合开始时，除非该角色弃置一张装备区里的牌，否则横置。";
                                    break;
                                case 4:
                                    return "阴天：涛神或曹娥受到伤害后，其进行判定，若结果为红桃，回复1点体力。";
                                    break;
                                case 5:
                                    return "狂风：敌方受到伤害时，此伤害+1。";
                                    break;
                                case 6:
                                    return "巨浪：敌方不能使用或打出【闪】和【酒】。";
                                    break;
                                case 7:
                                    return "雷雨：敌方每次使用基本牌时，需要弃置一张手牌。";
                                    break;
                                case 8:
                                    return "大雨：敌方摸牌阶段摸牌数-1，涛神或曹娥摸牌阶段摸牌数+2。";
                                    break;
                                case -1:
                                    return "有其他天气正在传播，咱先歇会儿吧。";
                                    break;
                                default:
                                    return "晴天：什么都没有发生，但似乎又什么都发生了。";
                                    break;
                            }
                        }
                    },
                    trigger:{global:"roundStart"},
                    direct:true,
                    filter:function(event,player){
                        var list=['Longzhou_Boss_Taoshen','Longzhou_Boss_Taoshen_Difficulty','Longzhou_Boss_Taoshen_Fucking','Longzhou_Boss_Caoe','Longzhou_Boss_Caoe_Difficulty','Longzhou_Boss_Caoe_Fucking'];
                        if(player.hasSkill('Longzhou_Boss_Tianqi_Mark')) return false;
                        for(var i=0;i<list.length;i++){
                            if(player.name==list[i]||player==list[i]) return true;
                        }
                        return false;
                    },
                    content:function(){
                        var list=['Longzhou_Boss_Taoshen','Longzhou_Boss_Taoshen_Difficulty','Longzhou_Boss_Taoshen_Fucking','Longzhou_Boss_Caoe','Longzhou_Boss_Caoe_Difficulty','Longzhou_Boss_Caoe_Fucking'];
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            for(var j=0;j<list.length;j++){
                                if(game.players[i].name==list[j]||game.players[i]==list[j]){
                                    if(game.players[i].hasSkill('Longzhou_Boss_Tianqi')){
                                        game.players[i].addSkill('Longzhou_Boss_Tianqi_Mark');
                                    }
                                }
                            }
                        }
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i].hasSkill('Longzhou_Boss_Tianqi_Buff2')) game.players[i].removeSkill('Longzhou_Boss_Tianqi_Buff2');
                            if(game.players[i].hasSkill('Longzhou_Boss_Tianqi_Buff1')) game.players[i].removeSkill('Longzhou_Boss_Tianqi_Buff1');
                        }
                        var num=game.Diuse_randomNum(8,0);
                        if(num==6||num==1){
                            for(var i=0;i<game.players.length;i++){
                                if(game.players[i]==player) continue;
                                if(num==1){
                                    if(!game.players[i].isFriendOf(player)) game.players[i].addSkill('Longzhou_Boss_Tianqi_Buff2');
                                } else {
                                    if(!game.players[i].isFriendOf(player)) game.players[i].addSkill('Longzhou_Boss_Tianqi_Buff1');
                                }
                            }
                        } 
                        player.storage.Boss_Tianqi=[];
                        player.storage.Boss_Tianqi.push(num);
                    },
                    group:['Longzhou_Boss_Tianqi_Damage','Longzhou_Boss_Tianqi_PlayerDamage','Longzhou_Boss_Tianqi_Draw',
                    'Longzhou_Boss_Tianqi_Use','Longzhou_Boss_Tianqi_Discard','Longzhou_Boss_Tianqi_Die'],
                    subSkill:{
                        Damage:{ //狂风：敌方受到伤害时，此伤害+1。
                            trigger:{global:"damageBegin"},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                if(player.storage.Boss_Tianqi==undefined) return false;
                                if(event.player==undefined) return false;
                                if(event.player.isFriendOf(player)) return false;
                                var stor=player.storage.Boss_Tianqi[0];
                                if(stor==5) return true;
                                return false;;
                            },
                            content:function(){
                                trigger.num++;
                            },
                        },
                        PlayerDamage:{ //阴天：涛神或曹娥受到伤害后，其进行判定，若结果为红桃，回复1点体力。
                            trigger:{global:"damageAfter"},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                if(event.player==undefined) return false;
                                if(player.storage.Boss_Tianqi==undefined) return false;
                                var stor=player.storage.Boss_Tianqi[0];
                                var name=event.player.Diuse_bossTianshuName(255,0);
                                if(stor==4&&name) return true;
                                return false;
                            },
                            content:function(){
                                "step 0"
                                trigger.player.judge(function(card){
                                    var suit=get.suit(card);
                                    if(suit=='heart') return 5;
                                    return 0;
                                }).judge2=function(result){
                                    var suit=get.suit(result.card);
                                    if(suit=='heart') return result.bool=true;
                                    return result.bool=false;
                                };
                                "step 1"
                                if(get.suit(result.card)=='heart'){
                                    trigger.player.recover();
                                } 
                            },
                        },
                        Use:{ //雷电：敌方每名角色的回合开始时，除非该角色弃置一张装备区里的牌，否则横置。
                            trigger:{global:"phaseUseBegin"}, 
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                if(player.storage.Boss_Tianqi==undefined) return false;
                                if(event.player==player) return false;
                                if(event.player.isFriendOf(player)) return false;
                                var stor=player.storage.Boss_Tianqi[0];
                                if(stor==3||stor==2) return true; //烈日：敌方每名角色的回合开始时，除非该角色弃置一张【闪】，否则受到1点火焰伤害
                                return false;
                            },
                            content:function(){
                                var stor=player.storage.Boss_Tianqi[0];
                                var player=trigger.player;
                                "step 0"
                                if(stor==3){
                                    if(player.countCards('e')>0){
                                        player.chooseToDiscard('e').set('ai',function(card){
                                            return get.value(card);
                                        });
                                    } else {
                                        player.link(true);
                                    }
                                } else {
                                    player.chooseToDiscard('请弃置一张闪，否则受到一点火焰伤害。','h',function(card){
                                        return get.name(card)=='shan';
                                    }).set('ai',function(card){
                                        return get.value(card);
                                    });
                                }
                                "step 1"
                                if(!result.bool){
                                    if(stor==3){
                                        player.link(true);
                                    } else {
                                        player.damage(1,'fire');
                                    }
                                }
                            },
                        },
                        Draw:{ //大雨：敌方摸牌阶段摸牌数-1，涛神或曹娥摸牌阶段摸牌数+2。
                            trigger:{global:"phaseDrawBegin"},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                if(player.storage.Boss_Tianqi==undefined) return false;
                                var name=event.player.Diuse_bossTianshuName(255,0);
                                var stor=player.storage.Boss_Tianqi[0];
                                if(stor==8&&name) return true;
                                if(event.player.isFriendOf(player)) return false;
                                return false;
                            },
                            content:function(){
                                if(!trigger.player.isFriendOf(player)){
                                    trigger.num--;
                                } else if(trigger.player==player){
                                    trigger.num+=2;
                                }
                            },
                        },
                        Discard:{ //雷雨：敌方每次使用基本牌时，需要弃置一张手牌。
                            trigger:{global:"useCardEnd"},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                if(event.player==player) return false;
                                if(event.player.isFriendOf(player)) return false;
                                if(get.type(event.card)!='basic') return false;
                                if(player.storage.Boss_Tianqi==undefined) return false;
                                var stor=player.storage.Boss_Tianqi[0];
                                if(stor==7) return true;
                                return false;
                            },
                            content:function(){
                                trigger.player.chooseToDiscard(1,'h',true);
                            },
                        },
                        Die:{
                            trigger:{player:"dieBegin"},
                            forced:true,
                            sub:true,
                            popup:false,
                            content:function(){
                                for(var i=0;i<game.players.length;i++){
                                    if(game.players[i].hasSkill('Longzhou_Boss_Tianqi_Mark')) game.players[i].removeSkill('Longzhou_Boss_Tianqi_Mark');
                                    if(game.players[i].hasSkill('Longzhou_Boss_Tianqi_Buff2')) game.players[i].removeSkill('Longzhou_Boss_Tianqi_Buff2');
                                    if(game.players[i].hasSkill('Longzhou_Boss_Tianqi_Buff1')) game.players[i].removeSkill('Longzhou_Boss_Tianqi_Buff1');
                                }
                            },
                        },
                    },
                },
                Longzhou_Boss_Tianqi_Buff1:{ //巨浪：敌方不能使用或打出【闪】和【酒】。
                    mod:{
                        cardEnabled2:function(card,player){
                            if(get.name(card)=='shan'||get.name(card)=='jiu') return false;
                        },
                    },
                },
                Longzhou_Boss_Tianqi_Buff2:{ //大雾：敌方计算与对方的距离+1。
                    mod:{
                        globalFrom:function(from,to,distance){
                            if(!to.isFriendOf(from)) return distance+1;
                        },
                    },
                },
                Longzhou_Boss_Nutao:{ 
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"phaseUseBegin"},
                    forced:true,
                    content:function(){
                        player.Diuse_playerHpMax().damage(1,'thunder');
                    },
                },
                Longzhou_Boss_Nutao_Difficulty:{
                    mode:["boss"],
                    audio:"Longzhou_Boss_Nutao",
                    trigger:{player:"phaseUseBegin"},
                    forced:true,
                    content:function(){
                        var playerFriend=[];
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            if(!game.players[i].isFriendOf(player)) playerFriend.push(i);
                        }
                        if(playerFriend){
                            var random=playerFriend.randomGet();
                            game.players[random].damage(1,'thunder');
                        }
                    },
                },
                Longzhou_Boss_Nutao_Fucking:{
                    mode:["boss"],
                    audio:"Longzhou_Boss_Nutao",
                    trigger:{player:"phaseUseBegin"},
                    forced:true,
                    content:function(){
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            if(!game.players[i].isFriendOf(player)) {
                                game.players[i].damage(1,'thunder');
                            }
                        }
                    },
                },
                Longzhou_Boss_Yingzi:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{
                        player:"phaseDrawBegin2",
                    },
                    forced:true,
                    preHidden:true,
                    filter:function(event,player){
                        return !event.numFixed;
                    },
                    content:function(){
                        trigger.num++;
                    },
                    ai:{
                        threaten:1.5,
                    },
                    mod:{
                        maxHandcardBase:function(player,num){
                            return player.maxHp;
                        },
                    },
                },
                Longzhou_Boss_Xiongzi:{
                    mode:["boss"],
                    audio:"Longzhou_Boss_Yingzi",
                    trigger:{
                        player:"phaseDrawBegin2",
                    },
                    frequent:true,
                    filter:function(event,player){
                        return !event.numFixed;
                    },
                    content:function(){
                        if(player.countCards('h')<=2){
                            trigger.num+=3;
                        } else {trigger.num++;}
                    },
                    ai:{
                        threaten:1.3,
                    },
                },
                Longzhou_Boss_Paoxiao:{
                    mode:["boss"],
                    firstDo:true,
                    trigger:{player:"useCard1"},
                    forced:true,
                    filter:function(event,player){
                        return (!event.audioed||!player.hasSkill('Xishou_Paoxiao2'))&&event.card.name=='sha';
                    },
                    content:function(){
                        trigger.audioed=true;
                        player.addTempSkill('Xishou_Paoxiao2');
                    },
                    mod:{
                        cardUsable:function (card,player,num){
                            if(card.name=='sha') return Infinity;
                        },
                    },
                    ai:{
                        unequip:true,
                        skillTagFilter:function (player,tag,arg){
                            if(!get.zhu(player,'shouyue')) return false;
                            if(arg&&arg.name=='sha') return true;
                            return false;
                        },
                    },
                },
                Longzhou_Boss_Wushuang:{
                    mode:['boss'],
                    audio:"ext:术樱:2",
                    trigger:{player:"useCardToPlayered",},
                    forced:true,
                    filter:function(event,player){
                        return event.card.name=='sha'&&!event.getParent().directHit.contains(event.target);
                    },
                    logTarget:"target",
                    content:function(){
                        var id=trigger.target.playerid;
                        var map=trigger.getParent().customArgs;
                        if(!map[id]) map[id]={};
                        if(typeof map[id].shanRequired=='number'){
                            map[id].shanRequired++;
                        }
                        else{
                            map[id].shanRequired=2;
                        }
                    },
                    ai:{
                        "directHit_ai":true,
                        skillTagFilter:function(player,tag,arg){
                            if(arg.card.name!='sha'||arg.target.countCards('h','shan')>1) return false;
                        },
                    },
                    group:["Qingqing_Boss_Wushuang_Juedou"],
                    subSkill:{
                        Juedou:{
                            mode:['boss'],
                            audio:"Longzhou_Boss_Wushuang",
                            trigger:{
                                player:"useCardToPlayered",
                                target:"useCardToTargeted",
                            },
                            forced:true,
                            sub:true,
                            logTarget:function(trigger,player){
                                return player==trigger.player?trigger.target:trigger.player
                            },
                            filter:function(event,player){
                                return event.card.name=='juedou';
                            },
                            content:function(){
                                var id=(player==trigger.player?trigger.target:trigger.player)['playerid'];
                                var idt=trigger.target.playerid;
                                var map=trigger.getParent().customArgs;
                                if(!map[idt]) map[idt]={};
                                if(!map[idt].shaReq) map[idt].shaReq={};
                                if(!map[idt].shaReq[id]) map[idt].shaReq[id]=1;
                                map[idt].shaReq[id]++;
                            },
                            ai:{
                                "directHit_ai":true,
                                skillTagFilter:function(player,tag,arg){
                                    if(arg.card.name!='juedou'||Math.floor(arg.target.countCards('h','sha')/2)>player.countCards('h','sha')) return false;
                                },
                            },
                        },
                    },
                },
                Longzhou_Boss_Shoujiang:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"damageBegin4"},
                    forced:true,
                    usable:1,
                    filter:function(event,player){
                        return event.num>1;
                    },
                    content:function(){
                        trigger.num--;
                    },
                },
                Longzhou_Boss_Shoujiang_Difficulty:{
                    mode:["boss"],
                    audio:"Longzhou_Boss_Shoujiang",
                    trigger:{player:"damageBegin4"},
                    forced:true,
                    usable:1,
                    filter:function(event,player){
                        return event.num>1;
                    },
                    content:function(){
                        trigger.num--;
                        player.draw();
                    },
                },
                Longzhou_Boss_Shoujiang_Fucking:{
                    mode:["boss"],
                    audio:"Longzhou_Boss_Shoujiang",
                    trigger:{player:"damageBegin4"},
                    forced:true,
                    usable:1,
                    filter:function(event,player){
                        return event.num>1;
                    },
                    content:function(){
                        trigger.num=1;
                        player.draw(3);
                    },
                },
                Longzhou_Boss_Luoshen:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{
                        player:"phaseZhunbeiBegin",
                    },
                    frequent:true,
                    preHidden:true,
                    content:function(){
                        "step 0"
                        if(event.cards==undefined) event.cards=[];
                        var next=player.judge(function(card){
                            if(get.color(card)=='black') return 1.5;
                            return -1.5;
                        });
                        next.judge2=function(result){
                            return result.bool;
                        };
                        "step 1"
                        if(result.judge>0){
                            event.cards.push(result.card);
                            player.chooseBool('是否再次发动【洛神】？').set('frequentSkill','luoshen');
                        }
                        else{
                            for(var i=0;i<event.cards.length;i++){
                                if(get.position(event.cards[i],true)!='o'){
                                    event.cards.splice(i,1);i--;
                                }
                            }
                            if(event.cards.length){
                                player.gain(event.cards,'gain2');
                            }
                            event.finish();
                        }
                        "step 2"
                        if(result.bool){
                            event.goto(0);
                        }
                        else{
                            if(event.cards.length){
                                player.gain(event.cards,'gain2');
                            }
                        }
                    },
                },
                Longzhou_Boss_Biyue:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{
                        player:"phaseJieshuBegin",
                    },
                    frequent:true,
                    content:function(){
                        var num=1;
                        if(!player.countCards('h')){
                            num=2;
                        }
                        player.draw(num);
                    },
                },
                Longzhou_Boss_Jizhi:{
                    mode:["boss"],
                    trigger:{
                        player:"useCard",
                    },
                    frequent:true,
                    preHidden:true,
                    filter:function(event){
                        return (get.type(event.card)=='trick'&&event.card.isCard);
                    },
                    content:function(){
                        player.draw();
                    },
                    ai:{
                        threaten:1.4,
                        noautowuxie:true,
                    },
                },
                Tianshu_Boss_Zhuri:{
                    mode:["boss"],
                    audio:"ext:术樱:2",
                    trigger:{player:"phaseZhunbeiBegin"},
                    forced:true,
                    content:function(){
                        "step 0"
                        player.judge(function(card){
                            return true;
                        }).judge2=function(result){
                            return result.bool=true;
                        };
                        "step 1"
                        if(get.color(result.card)=='red'){
                            player.storage.Zhuri='red';
                        } else {
                            player.storage.Zhuri='black';
                        }
                    },
                    group:['Tianshu_Boss_Zhuri_Red','Tianshu_Boss_Zhuri_Black','Tianshu_Boss_Zhuri_Jieshu'],
                    subSkill:{
                        Red:{
                            trigger:{
                                player:["useCardAfter"],
                                target:"useCardToTargeted",
                            },
                            forced:true,
                            sub:true,
                            filter:function(event,player,name){
                                if(player.storage.Zhuri!='red') return false;
                                if(name=='useCardToTargeted'&&('equip'!=get.type(event.card)||event.player!=player)) return false;
                                if(name=='useCardAfter'&&['equip','delay'].contains(get.type(event.card))) return false;
                                if(get.color(event.card)=='red') return true;
                                return false;
                            },
                            content:function(){
                                "step 0"
                                event.cards=trigger.cards.filterInD();
                                if(event.cards.length>1){
                                    var next=player.chooseToMove('逐日：将牌按顺序置于牌堆底');
                                    next.set('list',[['牌堆底',event.cards]]);
                                    next.set('reverse',((_status.currentPhase&&_status.currentPhase.next)?get.attitude(player,_status.currentPhase.next)>0:false));
                                    next.set('processAI',function(list){
                                        var cards=list[0][1].slice(0);
                                        cards.sort(function(a,b){
                                            return (_status.event.reverse?1:-1)*(get.value(b)-get.value(a));
                                        });
                                        return [cards];
                                    });
                                }
                                "step 1"
                                if(result.bool&&result.moved&&result.moved[0].length) cards=result.moved[0].slice(0);
                                while(cards.length){
                                    var card=cards.pop();
                                    if(get.position(card,true)=='o'){
                                        card.fix();
                                        ui.cardPile.appendChild(card,ui.cardPile.firstChild);
                                        game.log(player,'将',card,'置于牌堆底');
                                    }
                                }
                                game.updateRoundNumber();
                            }
                        },
                        Black:{
                            trigger:{player:["useCardBegin"]},
                            forced:true,
                            sub:true,
                            filter:function(event,player,name){
                                if(player.storage.Zhuri!='black') return false;
                                if(get.color(event.card)=='black') return true;
                                return false;
                            },
                            content:function(){
                                player.draw();
                            }
                        },
                        Jieshu:{
                            trigger:{player:"phaseJieshuBegin"},
                            silent:true,
                            sub:true,
                            forced:true,
                            audio:false,
                            popup:false,
                            content:function(){
                                player.storage.Zhuri='';
                            }
                        },
                    },
                },
                Tianshu_Boss_Yinjiang:{
                    mode:["boss"],
                    trigger:{player:"gainAfter"},
                    forced:true,
                    filter:function (event,player){
                        if(!player.isPhaseUsing()) return false;
                        return event.getParent().name=='draw'&&event.getParent(2).name!='Tianshu_Boss_Yinjiang';
                    },
                    content:function (){
                        player.draw(1,'bottom');
                    },
                    group:['Tianshu_Boss_Yinjiang_Buff'],
                    subSkill:{
                        Buff:{
                            trigger:{player:"gainAfter"},
                            forced:true,
                            popup:false,
                            sub:true,
                            audio:false,
                            filter:function (event,player){
                                if(!player.isPhaseUsing()) return false;
                                return event.getParent().name=='draw'&&event.getParent(2).name=='Tianshu_Boss_Yinjiang';
                            },
                            content:function (){
                                if(get.color(trigger.cards[0])=='red'){
                                    player.Diuse_playerRandom().damage();
                                }
                            },
                        },
                    },
                },
                Tianshu_Boss_Lieben:{
                    mode:["boss"],
                    trigger:{player:"shaBegin"},
                    forced:true,
                    content:function(){
                        "step 0"
                        var card=get.bottomCards()[0];
                        ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
                        player.judge(function(card){
                            if(get.color(card)=='red') return 2;
                            return 0;
                        }).judge2=function(result){
                            var color=get.color(result.card);
                            if(color=='red') return result.bool=true;
                            return result.bool=false;
                        };
                        "step 1"
                        if(get.color(result.card)=='red'){
                            trigger.player.getStat().card.sha--;
                            trigger.baseDamage+=1;
                        }
                        game.updateRoundNumber();
                    }
                },
                Tianshu_Boss_Wuan:{
                    mode:["boss"],
                    trigger:{source:"damageBegin"},
                    forced:true,
                    content:function(){
                        trigger.num++;
                    },
                    mod:{
                        cardUsable:function(card,player,num){
                            if(card.name=='sha') return num+1;
                        },
                    },
                },
                Tianshu_Boss_Wuan_Fucking:{
                    mode:["boss"],
                    trigger:{source:"damageBegin"},
                    forced:true,
                    content:function(){
                        trigger.num++;
                    },
                    mod:{
                        cardUsable:function(card,player,num){
                            if(card.name=='sha') return num+2;
                        },
                    },
                },
                Tianshu_Boss_Changsheng:{
                    mode:["boss"],
                    mod:{
                        targetInRange:function(card,player){
                            if(get.color(card)=='red'&&card.name=='sha') return true;
                        }
                    },
                },
                Tianshu_Boss_Shashen:{
                    mode:["boss"],
                    locked:false,
                    enable:["chooseToRespond","chooseToUse"],
                    position:"h",
                    viewAs:{name:"sha"},
                    prompt:"将一张手牌当杀使用或打出",
                    filterCard:function(card,player){
                        return true;
                    },
                    check:function(card){
                        return 4-get.value(card);
                    },
                    group:["Tianshu_Boss_Shashen_Buff","Tianshu_Boss_Shashen_Buff1"],
                    subSkill:{
                        Buff:{
                            trigger:{player:"useCardToPlayered"},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                if(player.storage.ShashenBool) return false;
                                return event.card.name=='sha';
                            },
                            content:function(){
                                player.storage.Shashen=true;
                                player.storage.ShashenBool=true;
                            },
                        },
                        Buff1:{
                            trigger:{source:"damageBegin"},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                return player.storage.Shashen;
                            },
                            content:function(){
                                player.draw();
                                player.storage.Shashen=false;
                            },
                        },
                    },
                },
                Tianshu_Boss_Shashen_Fucking:{
                    mode:["boss"],
                    locked:false,
                    enable:["chooseToRespond","chooseToUse"],
                    position:"h",
                    viewAs:{name:"sha"},
                    prompt:"将一张手牌当杀使用或打出",
                    filterCard:function(card,player){
                        return true;
                    },
                    check:function(card){
                        return 4-get.value(card);
                    },
                    group:["Tianshu_Boss_Shashen_Buff","Tianshu_Boss_Shashen_Buff1"],
                    subSkill:{
                        Buff:{
                            trigger:{player:"useCardToPlayered"},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                if(player.storage.ShashenBool) return false;
                                return event.card.name=='sha';
                            },
                            content:function(){
                                player.storage.Shashen=true;
                                player.storage.ShashenBool=true;
                            },
                        },
                        Buff1:{
                            trigger:{source:"damageBegin"},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                return player.storage.Shashen;
                            },
                            content:function(){
                                player.draw(2);
                                player.storage.Shashen=false;
                            },
                        },
                    },
                },
                Tianshu_Boss_Xingxia:{
                    mode:['boss'],
                    trigger:{player:"phaseUseBegin"},
                    forced:true,
                    round:1,
                    content:function(){
                        'step 0'
                        event.list=[];
                        var bool=true;
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            if(game.players[i].isFriendOf(player)){
                                if(bool){
                                    game.players[i].damage(2,'fire');
                                    bool=false
                                }
                            } else {
                                event.list.push(i);
                            }
                        }
                        'step 1'
                        if(!event.list) event.finish();
                        'step 2'
                        event.target=game.players[event.list[0]];
                        player.line(event.target,'fire');
                        event.target.chooseToDiscard('he',{color:'red'},'弃置一张红色牌或受到一点火焰伤害').ai=function(card){
                            var player=_status.event.player;
                            var source=_status.event.parent.player;
                            if(get.damageEffect(player,source,player,'fire')>=0) return 0;
                            return 5-get.value(card);
                        }
                        'step 3'
                        if(!result.bool){
                            event.target.damage('fire');
                        }
                        event.list.shift();
                        'step 4'
                        if(event.list.length>=1) event.goto(2);
                    },
                },
                Tianshu_Boss_Xingxia_Fucking:{
                    mode:['boss'],
                    trigger:{player:"phaseUseBegin"},
                    forced:true,
                    content:function(){
                        'step 0'
                        event.list=[];
                        var bool=true;
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            if(game.players[i].isFriendOf(player)){
                                if(bool){
                                    game.players[i].damage(2,'fire');
                                    bool=false
                                }
                            } else {
                                event.list.push(i);
                            }
                        }
                        'step 1'
                        if(!event.list) event.finish();
                        'step 2'
                        event.target=game.players[event.list[0]];
                        player.line(event.target,'fire');
                        event.target.chooseToDiscard(2,'he',{color:'red'},'弃置两张红色牌或受到两点火焰伤害').ai=function(card){
                            var player=_status.event.player;
                            var source=_status.event.parent.player;
                            if(get.damageEffect(player,source,player,'fire')>=0) return 0;
                            return 5-get.value(card);
                        }
                        'step 3'
                        if(!result.bool){
                            event.target.damage(2,'fire');
                        }
                        event.list.shift();
                        'step 4'
                        if(event.list.length>=1) event.goto(2);
                    },
                },
            },
            translate:{
                Tianshu_Skill:"天书",
                nextCheckPoint:"关卡",
                livePlayer:"难度",
                Tianshu_Protect:"保护",
                Tianshu_Protect_info:'锁定技。无敌一次伤害，随后移除该技能。',

                制衡_info:'出牌阶段限一次，你可以弃置任意张牌并摸等量的牌。',
                武圣_info:'你可以将一张红色牌当做【杀】使用或打出。你使用的方片杀没有距离限制。',
                仁德_info:'出牌阶段，你可以将至少一张手牌交给其他角色，然后你于此阶段内不能再以此法交给该角色牌；若你于此阶段内给出的牌首次达到两张，你可以视为使用一张基本牌',
                英姿_info:'锁定技，摸牌阶段摸牌时，你额外摸一张牌；你的手牌上限为你的体力上限。',

                Tianshu_Boss_Ordinary_Chiyan:'赤炎',
                Tianshu_Boss_Ordinary_Chiyan_info:'锁定技，摸牌阶段你跳过摸牌；其他角色在出牌阶段获得X张牌后你摸X张。',
                Tianshu_Boss_Ordinary_Fali:'乏力',
                Tianshu_Boss_Ordinary_Fali_info:'锁定技，其他角色出牌阶段结束后，如果其手牌数大于当前体力值则你摸一张牌，否则其弃一张牌。',
                Tianshu_Boss_Difficulty_Chiyan:'赤炎',
                Tianshu_Boss_Difficulty_Chiyan_info:'锁定技，每轮限一次。你出牌阶段开始时，如果你已经受伤则你随机对一名其他角色造成一点伤害然后恢复一点体力。',
                Tianshu_Boss_Difficulty_Fali:'乏力',
                Tianshu_Boss_Difficulty_Fali_info:'锁定技，其他角色使用的转化牌均失效，然后你摸一张牌；其他角色出牌阶段开始时其当前手牌超出最大体力后必须给你一张牌。',
                Tianshu_Boss_Chiyan:'赤炎',
                Tianshu_Boss_Chiyan_info:'你使用或打出的牌无视距离限制，并且杀可以指定敌方全体。',
                Tianshu_Boss_Fali:'乏力',
                Tianshu_Boss_Fali_info:'锁定技。回合开始时清空标记。你受到的伤害始终为1并获得一个标记，如果标记等于五个或以上则跳过当前角色回合。',
                Tianshu_Boss_Rentu:'人屠',
                Tianshu_Boss_Rentu_1:'人屠',
                Tianshu_Boss_Rentu_1_info:'你的回合外有其他角色每次获得牌后你获得标记，如果标记超出八个则跳过当前角色所有回合。',
                Tianshu_Boss_Rentu_info:'锁定技。如果你手牌为全场最多，则你造成的伤害+1；场上除你之外的角色出牌阶段开始时，如果其手牌数大于体力上限则需弃置相应手牌；你的回合外有其他角色每次获得牌后你获得标记，如果标记超出八个则跳过当前角色所有回合。',
                Tianshu_Boss_Tusha:'屠杀',
                Tianshu_Boss_Tusha_info:'锁定技。你在造成伤害前判定：黑桃：该伤害+1；梅花：其弃置两张手牌；红桃：你恢复一点体力；方块：你摸两张牌。',
                Tianshu_Boss_Shangshi:'殇逝',
                Tianshu_Boss_Shangshi_info:'锁定技。你每受到一点体力流失就会恢复一点体力并摸一张牌。',
                Tianshu_Boss_Wangshen:'亡神',
                Tianshu_Boss_Wangshen_info:'锁定技。其他角色获得牌后必须弃置至体力上限；当你受到伤害后你跳过当前角色回合，包括自己。',
                Tianshu_Boss_Ordinary_Bumie:'不灭',
                Tianshu_Boss_Difficulty_Bumie:'不灭',
                Tianshu_Boss_Fucking_Bumie:'不灭',
                Tianshu_Boss_Ordinary_Bumie_info:'锁定技。当场上每有一名角色进入濒死状态前你恢复一点体力并摸三张牌，如果是你则替换为恢复99999体力；当你不因此技能减少体力上限后你恢复体力上限(详情看扩展说明)',
                Tianshu_Boss_Difficulty_Bumie_info:'锁定技。当场上每有一名角色进入濒死状态前你恢复一点体力并摸三张牌，如果是你则替换为恢复99999体力；当你不因此技能减少体力上限后你恢复体力上限(详情看扩展说明)',
                Tianshu_Boss_Fucking_Bumie_info:'锁定技。当场上每有一名角色进入濒死状态前你恢复一点体力并摸三张牌，如果是你则替换为恢复99999体力；当你不因此技能减少体力上限后你恢复体力上限(详情看扩展说明)',
                Tianshu_Task_1:'任务一',
                Tianshu_Task_2:'任务二',
                Tianshu_Task_3:'任务三',
                Tianshu_Boss_Shashen:'杀神',
                Tianshu_Boss_Shashen_info:'锁定技。出牌阶段开始时，如果你没有手牌则将手牌补至体力上限，如果有则再摸X张牌（X为你装备区的牌数）然后解封已封禁的装备区；出牌阶段你获得Y个标记（Y为你装备区的数量）造成伤害时增加Y',
                Tianshu_Boss_Difficulty_Shashen:'杀神',
                Tianshu_Boss_Difficulty_Shashen_info:'锁定技。出牌阶段开始时，如果你没有手牌则将手牌补至体力上限，如果有则再摸X+1张牌（X为你装备区的牌数）然后解封已封禁的装备区，然后你随机弃一张手牌根据弃置牌的花色场上对应点数的角色执行相应效果(BOSS为1，然后逆时针开始数，直至数字相对应)。红桃：恢复一点体力，黑桃：受到一点伤害，梅花：弃置一张牌，方块：摸两张牌。',
                Tianshu_Boss_Fucking_Shashen:'杀神',
                Tianshu_Boss_Fucking_Shashen_info:'锁定技。出牌阶段开始时，如果你没有手牌则将手牌补至体力上限，如果有则再摸X+2张牌（X为你装备区的牌数）然后解封已封禁的装备区，然后你随机弃一张手牌根据弃置牌的花色场上随机角色执行相应效果。红桃：恢复一点体力，黑桃：受到一点伤害，梅花：弃置当前手牌数一半的牌，方块：摸两张牌。',
                Tianshu_Boss_Difu:'地府',
                Tianshu_Boss_Difu_info:'锁定技。当场上每个角色受到伤害后其进行判定并根据判定结果执行效果（详细看扩展介绍）你受到伤害后有50%的概率将强制执行有益结果',
                Tianshu_Boss_Tiemian:'铁面',
                Tianshu_Boss_Tiemian_info:'锁定技。你于部分阶段有概率可以执行额外效果（详情看扩展介绍）',
    
                Boss_Shengxiao_Zishu:"子鼠",
                Boss_Shengxiao_Zishu_info:"出牌阶段限一次，你可以获得手牌数大于你的其他角色一张手牌，你可以重复此流程直到你的手牌数为全场最多。",
                Boss_Shengxiao_Chouniu:"丑牛",
                Boss_Shengxiao_Chouniu_info:"锁定技，结束阶段，若你的体力值为全场最小，则你回复1点体力。",
                Boss_Shengxiao_Yinhu:"寅虎",
                Boss_Shengxiao_Yinhu_info:"出牌阶段，你可以弃置一张手牌（以此法弃置的牌须类型各不相同），然后对一名其他角色造成1点伤害；若你以此法导致一名角色进入濒死状态，则此技能失效直到回合结束。",
                Boss_Shengxiao_Maotu:"卯兔",
                Boss_Shengxiao_Maotu_info:"锁定技，场上有角色死亡后，你获得卯兔标记。若你拥有卯兔标记则无法成为体力值大于你的角色使用牌的合法目标；你的出牌阶段结束后弃置卯兔标记。",
                Boss_Shengxiao_Chenlong:"辰龙",
                Boss_Shengxiao_Chenlong_info:"限定技，出牌阶段，你可以失去任意点体力（至多为5），然后对一名其他角色造成等量的伤害。若你以此法进入濒死状态，则你将体力值回复至1，然后将体力上限改为1。",
                Boss_Shengxiao_Sishe:"巳蛇",
                Boss_Shengxiao_Sishe_info:"当你受到伤害后，你可以对伤害来源造成等量伤害。",
                Boss_Shengxiao_Wuma:"午马",
                Boss_Shengxiao_Wuma_info:"锁定技，你不能被翻面；你的出牌阶段不能被跳过；当你成为其他角色使用锦囊牌的目标后，摸一张牌。",
                Boss_Shengxiao_Weiyang:"未羊",
                Boss_Shengxiao_Weiyang_info:"出牌阶段限一次，你可以弃置任意张不同类型的牌，然后令至多等量角色回复1点体力。",
                Boss_Shengxiao_Shenhou:'申猴',
                Boss_Shengxiao_Shenhou_info:'当你成为【杀】的目标时，你可以进行判定，若结果为红色，则此【杀】对你无效。',
                Boss_Shengxiao_Youji:"酉鸡",
                Boss_Shengxiao_Youji_info:"摸牌阶段，你多摸X张牌（X为游戏轮数）。",
                Boss_Shengxiao_Xvgou:"戌狗",
                Boss_Shengxiao_Xvgou_info:"锁定技，红色【杀】对你无效；你使用红色【杀】无距离限制且造成伤害+1。",
                Boss_Shengxiao_Haizhu:"亥猪",
                Boss_Shengxiao_Haizhu_info:"锁定技，当其他角色的黑色牌因弃置而置入弃牌堆后，你获得这些牌；准备阶段开始时，若你的手牌数为场上最多的或之一，你失去1点体力。",
                Nianshou_Fange:"反戈",
                Nianshou_Fange_info:"当你受到伤害后，你可以摸两张牌，然后若这两张牌点数之差大于等于你当前体力值，你对伤害来源造成1点伤害（对己方角色无效）。",
                Nianshou_Siyao:"撕咬",
                Nianshou_Siyao_info:"你使用【杀】指定目标后，你可以对此【杀】目标中的敌方角色各造成1点伤害。然后此杀造成伤害后，受伤角色随机弃置一张牌。",
                Nianshou_Hengsao:"横扫",
                Nianshou_Hengsao_Buff:"横扫",
                Nianshou_Hengsao_info:"锁定技，出牌阶段开始时，若你的手牌数为三到六张，你本阶段【杀】的次数+1，目标数+1。",
                Nianshou_Zhuyan:"朱颜",
                Nianshou_Zhuyan_info:"锁定技，摸牌阶段，你放弃摸牌，改为从牌堆中随机获得四张牌。",
                Nianshou_Xiaoji:"枭姬",
                Nianshou_Xiaoji_info:"当你失去装备区的一张牌后，你可以摸两张牌。",
                Nianshou_Qunxiang:"群响",
                Nianshou_Qunxiang_info:"锁定技，你准备阶段或结束阶段，你视为使用一张【南蛮入侵】或【万箭齐发】",
                Nianshou_Tanshi:"贪食",
                Nianshou_Tanshi_info:"当你造成伤害后，你可以进行一次判定，若为黑色，你回复1点体力（若你体力已满则改成摸一张牌） ",
                Xishou_Taoyuan:"饕怨",
                Xishou_Taoyuan_info:"当你受到伤害后，你可以摸两张牌，然后若这两张牌花色不同，你随机获得伤害来源1张手牌（对己方角色无效）",
                Xishou_Paoxiao:"咆哮",
                Xishou_Paoxiao2:"咆哮",
                Xishou_Paoxiao_info:"锁定技，你出【杀】无次数限制，你的出牌阶段，如果你已经使用过【杀】，你于此阶段使用【杀】无距离限制。",
                Xishou_Lizhan:"历战",
                Xishou_Lizhan_info:"出牌阶段开始时，获得牌堆中的2张【杀】；每回合限一次，你使用杀后，你可以将该杀交给一名其他角色。",
                Xishou_Mingzhe:"明哲",
                Xishou_Mingzhe_info:"每当你于回合外使用或打出或红色牌时，或于回合外因弃置而失去一张红色牌后，你可以摸一张牌。",
                Xishou_Tianxiang:"天香",
                Xishou_Tianxiang_info:"当你受到伤害时，你可以弃置一张红桃手牌，防止此次伤害并选择一名其他角色，若此做，你选择一项：令其受到伤害来源对其造成的1点伤害，然后摸X张牌（X为其已损失的体力且最多为5）；令其失去1点体力，然后其获得你弃置的牌。",
                Xishou_Juxiang:"巨象",
                Xishou_Juxiang_info:"锁定技，【南蛮入侵】对你无效；锁定技，每当其他角色使用的【南蛮入侵】因结算完毕而置入弃牌堆后，你获得之。",
                Xishou_Shouxi:"兽袭",
                Xishou_Shouxi_info:"当你使用黑色锦囊牌时可以进行一次判定，若判定结果为黑色，你随机对一名敌人造成1点伤害。若为红色，你回复一点体力并获得判定的牌。",
                Zhuogui_Boss_Yinsha:"隐煞",
                Zhuogui_Boss_Yinsha_info:"锁定技，敌方角色的出牌阶段开始时，若其手牌数大于其体力上限，你本回合不能成为【杀】的目标。",
                Zhuogui_Boss_Yinsha_Buff:"隐煞",
                Zhuogui_Boss_Eli:"恶力",
                Zhuogui_Boss_Eli_info:"锁定技，每回合限一次，你对敌方角色造成伤害时，你进行一次判断：若结果为红色，此伤害+1；若结果为黑色，你获得“完杀”直到回合结束。",
                Zhuogui_Boss_Wansha:"完杀",
                Zhuogui_Boss_Wansha_Buff:"完杀",
                Zhuogui_Boss_Guimei:"鬼魅",
                Zhuogui_Boss_Guimei_info:"锁定技，你不会被翻面；你跳过摸牌阶段时，你摸一张牌；你跳过出牌阶段时，本回合手牌上限无限制。",
                Zhuogui_Boss_Guimei_Female:"鬼魅",
                Zhuogui_Boss_Guimei_Female_info:"锁定技，你不会被翻面；你跳过摸牌阶段时，你摸一张牌；你跳过出牌阶段时，本回合手牌上限无限制。",
                Zhuogui_Boss_Guimei_Buff:"鬼魅",
                Zhuogui_Boss_Xixing:"吸星",
                Zhuogui_Boss_Xixing_info:"锁定技，准备阶段，你对敌方体力最多的一名角色造成1点雷电伤害，然后回复1点体力。",
                Zhuogui_Boss_Xixing_Difficulty:"吸星",
                Zhuogui_Boss_Xixing_Difficulty_info:"锁定技，准备阶段，你对敌方体力最多的一名角色造成1~2点雷电伤害，然后回复1点体力。",
                Zhuogui_Boss_Xixing_Fucking:"吸星",
                Zhuogui_Boss_Xixing_Fucking_info:"锁定技，准备阶段，你对所有敌方角色的一名角色造成1点雷电伤害，然后回复1点体力。",
                Zhuogui_Boss_Taiping:"太平",
                Zhuogui_Boss_Taiping_info:"锁定技，当你受到敌方角色造成的伤害后，伤害来源需弃置两张花色不同的手牌，否则失去1点体力。",
                Zhuogui_Boss_Taiping_Fucking:"太平",
                Zhuogui_Boss_Taiping_Fucking_info:"锁定技，当你受到敌方角色造成的1点伤害后，伤害来源需弃置两张花色不同的手牌，否则失去1点体力。",
                Zhuogui_Boss_Mizui:"迷醉",
                Zhuogui_Boss_Mizui_info:"你的红色【杀】或属性【杀】造成伤害后，你可以弃置受伤角色一张牌。",
                Zhuogui_Boss_Mizui_Fucking:"迷醉",
                Zhuogui_Boss_Mizui_Fucking_info:"你的红色【杀】或属性【杀】造成伤害后，你可以弃置受伤角色两张牌。",
                Zhuogui_Boss_Qiangzheng:"强征",
                Zhuogui_Boss_Qiangzheng_info:"锁定技，结束阶段，若敌方有角色的手牌数为1，则你获得其手牌。",
                Zhuogui_Boss_Qiangzheng_Fucking:"强征",
                Zhuogui_Boss_Qiangzheng_Fucking_info:"锁定技，结束阶段，若敌方有角色的手牌数小于等于2，则你获得其手牌。",
                Zhuogui_Boss_Duzhen:"毒针",
                Zhuogui_Boss_Duzhen_info:"锁定技，你的回合内，当你使用牌指定单一敌方角色为目标后，该角色随机弃置一张牌（优先装备区的牌）",
                Zhuogui_Boss_Mingchong:"冥虫",
                Zhuogui_Boss_Mingchong_info:"锁定技，你死亡时，若有其他己方单位存活，则该角色获得技能“毒针”。",
                Zhuogui_Boss_Tiemian:"铁面",
                Zhuogui_Boss_Tiemian_info:"锁定技，红色【杀】有75%的概率对你无效。",
                Zhuogui_Boss_Difu:"地府",
                Zhuogui_Boss_Difu_info:"锁定技，敌方角色的出牌阶段开始时，若其手牌数大于体力上限，则将手牌弃置与体力上限相同。",
                Zhuogui_Boss_Zhennu:"震怒",
                Zhuogui_Boss_Zhennu_info:"锁定技，当你体力值第一次降至8点或以下，则结束当前角色回合立即开始你的回合并摸四张牌。",
                Zhuogui_Boss_Xingpan:"刑判",
                Zhuogui_Boss_Xingpan_info:"锁定技，出牌阶段开始时，你进行一次判定：若结果为红色，敌方手牌最多的角色将一半数量的手牌交给你（向下取整）；若为黑色，敌方体力最多的角色失去1点体力。",
                Zhuogui_Boss_Dianwei:"殿威",
                Zhuogui_Boss_Dianwei_info:"锁定技，准备阶段，你视为对装备区里没有牌的其他角色使用一张【杀】，然后装备区里有牌的其他角色随机弃置一张装备区的牌。",
                Zhuogui_Boss_Guixi:"鬼吸",
                Zhuogui_Boss_Guixi_info:"锁定技，当你受到伤害后，你进行一次判定，若结果为红桃，你回复1点体力；若结果不为红桃，你失去1点体力。",
                Zhuogui_Boss_Anchao:"暗潮",
                Zhuogui_Boss_Anchao_info:"锁定技，己方角色的回合结束时，若此回合该角色没有造成伤害，则获得一个“暗潮”标记，若该角色造成过伤害，则移去所有标记。己方角色的回合开始时，若其有标记，则本回合多摸X张牌且对敌方角色造成的伤害+X（X为“暗潮”的标记数）",
                Zhuogui_Boss_Xiaoshou:"枭首",
                Zhuogui_Boss_Xiaoshou_info:"锁定技，准备阶段，你对一名体力值大于你的敌方角色造成1点伤害。",
                Zhuogui_Boss_Xiaoshou_Difficulty:"枭首",
                Zhuogui_Boss_Xiaoshou_Difficulty_info:"锁定技，准备阶段，你对一名体力值大于你的敌方角色造成2点伤害。",
                Zhuogui_Boss_Xiaoshou_Fucking:"枭首",
                Zhuogui_Boss_Xiaoshou_Fucking_info:"锁定技，准备阶段，你对一名体力值大于等于你的敌方角色造成2点伤害。",
                Zhuogui_Boss_Manji:"蛮击",
                Zhuogui_Boss_Manji_info:"你使用【杀】指定单一目标后，你可以弃置该角色一张手牌。若此牌是【杀】，你本次【杀】的伤害+1。",
                Zhuogui_Boss_Manji_Fucking:"蛮击",
                Zhuogui_Boss_Manji_Fucking_info:"你使用【杀】指定单一目标后，你可以弃置该角色一张手牌。若此牌是【杀】，你本次【杀】的伤害+1；若此牌不是【杀】，你获得之。",
                Zhuogui_Boss_Shiyv:"施狱",
                Zhuogui_Boss_Shiyv_info:"锁定技，摸牌阶段，你放弃摸牌改为随机获得牌堆中每种花色的牌各一张。",
                Zhuogui_Boss_Guizhao:"诡招",
                Zhuogui_Boss_Guizhao_info:"锁定技，当你于回合内使用一张牌时，若此牌的类别是你本回合第一次使用，则你摸一张牌。",
                Zhuogui_Boss_Bingyi:"病疑",
                Zhuogui_Boss_Bingyi_info:"锁定技，每回合限一次，当你失去最后的手牌时，你摸六张牌。",
                Zhuogui_Boss_Suoxue:"索穴",
                Zhuogui_Boss_Suoxue_info:"你使用【杀】指定单一目标后，若其手牌数大于你，你可将手牌摸至与该角色相同；若其手牌数小于你，你可弃置一张手牌令此【杀】不能抵消。",
                
                Qingqing_Boss_Jiuchi:"酒池",
                Qingqing_Boss_Jiuchi_info:"你可以将一张黑桃手牌当【酒】使用。",
                Qingqing_Boss_Roulin:"肉林",
                Qingqing_Boss_Roulin_info:"锁定技，你对女性角色使用【杀】和女性角色对你使用【杀】均需要两张【闪】才能抵消。",
                Qingqing_Boss_Baonue:"暴虐",
                Qingqing_Boss_Baonue_info:"锁定技，回合开始时，你摸X张牌并对至多X名角色造成1点伤害，然后你失去1点体力。X为你已损失体力且最大为3。",
                Qingqing_Boss_Baonue_Difficulty:"暴虐",
                Qingqing_Boss_Baonue_Difficulty_info:"锁定技，回合开始时，你摸X张牌并对至多X名角色造成1点伤害，然后你失去1点体力。X为你已损失体力且最大为4。",
                Qingqing_Boss_Baonue_Fucking:"暴虐",
                Qingqing_Boss_Baonue_Fucking_info:"锁定技，回合开始时，你摸X张牌并对至多X名角色造成1点伤害，然后你失去1点体力。X为你已损失体力且最大为5。",
                Qingqing_Boss_Qvbu:"驱布",
                Qingqing_Boss_Qvbu_info:"锁定技，当友军角色使用【杀】指定目标时，进行一次判定：若结果为黑桃，你对此【杀】的所有目标造成1点伤害。",
                Qingqing_Boss_Qvbu_Fucking:"驱布",
                Qingqing_Boss_Qvbu_Fucking_info:"锁定技，当友军角色使用【杀】指定目标时，进行一次判定：若结果为黑色，你对此【杀】的所有目标造成1点伤害。",
                Qingqing_Boss_Yongsi:"庸肆",
                Qingqing_Boss_Yongsi_info:"锁定技，摸牌阶段，你改为摸X张牌（X为存活势力数）；弃牌阶段，若你本回合：1.没有造成伤害，将手牌摸至当前体力值；2.造成伤害数超过1点，本回合手牌上限改为已损失体力值。",
                Qingqing_Boss_Wangzun:"妄尊",
                Qingqing_Boss_Wangzun_info:"锁定技，其他敌方角色的结束阶段，若其本回合：1.没有对你造成伤害，则其弃置一张牌；2.对你造成伤害数超过1点，则你对其造成1点伤害。",
                Qingqing_Boss_Wangzun_Fucking:"妄尊",
                Qingqing_Boss_Wangzun_Fucking_info:"锁定技，其他敌方角色的结束阶段，若其本回合：1.没有对你造成伤害，则其弃置2张牌；2.对你造成伤害数超过1点，则你对其造成1点伤害。",
                Qingqing_Boss_Duoxi:"夺玺",
                Qingqing_Boss_Duoxi_info:"其他角色的摸牌阶段，你可以失去1点体力改为你与其各摸一张牌。",
                Qingqing_Boss_Duoxi_Fucking:"夺玺",
                Qingqing_Boss_Duoxi_Fucking_info:"其他角色的摸牌阶段，你可以失去1点体力改为你摸两张牌。",
                Qingqing_Boss_Mashu:"马术",
                Qingqing_Boss_Mashu_info:"锁定技，你计算与其他角色的距离时-1。",
                Qingqing_Boss_Wushuang:"无双",
                Qingqing_Boss_Wushuang_info:"锁定技，当你使用【杀】或【决斗】时，该角色需一次使用两张【闪】或打出两张【杀】抵消。",
                Qingqing_Boss_Shenji:"神戟",
                Qingqing_Boss_Shenji_info:"回合开始时，你可以弃置两张手牌，然后弃置你判定区的牌；摸牌阶段，你可以多摸两张牌；出牌阶段，你可以多使用一张【杀】，你的【杀】可以多指定一名角色为目标。",
                Qingqing_Boss_Shenji_Fucking:"神戟",
                Qingqing_Boss_Shenji_Fucking_info:"回合开始时，你可以弃置两张手牌，然后弃置你判定区的牌；摸牌阶段，你可以多摸两张牌；出牌阶段，你可以多使用两张【杀】，你的【杀】可以多指定两名角色为目标。",
                Qingqing_Boss_Shenji_Buff_Fucking:"神戟",
                Qingqing_Boss_Shenji_Buff:"神戟",
                Qingqing_Boss_Zhanjia:"战甲",
                Qingqing_Boss_Zhanjia_info:"锁定技，每回合限一次，当你受到大于2点的伤害时，将此伤害减至2点，然后摸两张牌。",
                Qingqing_Boss_Fankui:"反馈",
                Qingqing_Boss_Fankui_info:"当你受到1点伤害后，你可以获得伤害来源的一张牌。",
                Qingqing_Boss_Guicai:"鬼才",
                Qingqing_Boss_Guicai_info:"当一名角色的判定牌生效前，你可以打出一张牌代替之。",
                Qingqing_Boss_Langgu:"狼顾",
                Qingqing_Boss_Langgu_info:"锁定技，每回合限一次，当你获得其他角色牌时，进行一次判定：若结果为黑桃，随机弃置其1张手牌，且视为此技能未发动。",
                Qingqing_Boss_Langgu_Fucking:"狼顾",
                Qingqing_Boss_Langgu_Fucking_info:"锁定技，每回合限一次，当你获得其他角色牌时，进行一次判定：若结果为黑色，随机弃置其1张手牌，且视为此技能未发动。",
                Qingqing_Boss_Yuanlv:"远虑",
                Qingqing_Boss_Yuanlv_info:"当你使用锦囊牌对敌方角色造成伤害时，你可以防止该伤害，改为摸一张牌且该敌方角色对你造成1点伤害。",
                Qingqing_Boss_Jianxiong:"奸雄",
                Qingqing_Boss_Jianxiong_info:"当你受到伤害后，你可以获得对你造成伤害的牌并摸一张牌。",
                Qingqing_Boss_Lingba:"凌霸",
                Qingqing_Boss_Lingba_info:"锁定技，你的回合开始时，若你手牌数为全场最多，则对一名随机敌人造成1点伤害。若你手牌数大于等于你体力值的两倍，则改为对所有敌人造成伤害。",
                Qingqing_Boss_Lingba_Fucking:"凌霸",
                Qingqing_Boss_Lingba_Fucking_info:"锁定技，你的回合开始时，若你手牌数为全场最多，则对一名随机敌人造成2点伤害。若你手牌数大于等于你体力值的两倍，则改为对所有敌人造成伤害。",
                Qingqing_Boss_Ningshen:"疑神",
                Qingqing_Boss_Ningshen_info:"当你回复体力时，可以改为获得一名随机敌方角色一张随机装备。",
                Qingqing_Boss_Ningshen_Fucking:"疑神",
                Qingqing_Boss_Ningshen_Fucking_info:"当你回复体力时，可以改为获得所有敌人各一张随机装备。",
                Qingqing_Boss_Guidao:"鬼道",
                Qingqing_Boss_Guidao_info:"当一名角色的判定牌生效前，你可以打出一张黑色牌替换之。",
                Qingqing_Boss_Leiji:"雷击",
                Qingqing_Boss_Leiji_info:"每当你使用或打出【闪】时，你可以令一名其他角色进行判定，若结果为：黑桃，你对该角色造成2点雷电伤害；梅花，你回复1点体力，然后对该角色造成1点雷电伤害。",
                Qingqing_Boss_Jianzheng:"谏征",
                Qingqing_Boss_Jianzheng_info:"其他角色使用【杀】指定除你外的角色时，若你在其攻击范围内，你可以将一张手牌置于牌堆顶，取消所有目标，然后若此【杀】不为黑色，你成为目标。",
                Qingqing_Boss_Jianzheng_Fucking:"谏征",
                Qingqing_Boss_Jianzheng_Fucking_info:"其他角色使用【杀】指定除你外的角色时，若你在其攻击范围内，你可以将一张手牌置于牌堆顶，取消所有目标，然后若此【杀】不为黑色，你成为目标。",
                Qingqing_Boss_Yinlei:"引雷",
                Qingqing_Boss_Yinlei_info:"锁定技，当你于回合外失去牌时，随机横置一名角色。",
                Qingqing_Boss_Yinlei_Fucking:"引雷",
                Qingqing_Boss_Yinlei_Fucking_info:"锁定技，当你失去牌时，随机横置一名角色。",
    
                Tianshu_Boss_Dishi:"帝师",
                Tianshu_Boss_Dishi_info:"当你使用【杀】或普通锦囊牌指定目标时，如果目标数为1，你可以为其增加一个目标；如果目标数大于1，你可以为其减少一个目标。",
                Tianshu_Boss_Jiutian:"九天",
                Tianshu_Boss_Jiutian_info:"锁定技，准备阶段，如果敌方角色有超过两种不同花色的手牌，则你获得其一张手牌。如果你以此法获得的所有牌花色均不同，则对所有你以此法获得其牌的敌方角色造成1点伤害。",
                Tianshu_Boss_Xuanlie:"玄烈",
                Tianshu_Boss_Xuanlie_info:"锁定技，回合结束时，对所有本回合你获得过其牌的敌方角色依次造成1点伤害。",
                Tianshu_Boss_Shenqu:"神躯",
                Tianshu_Boss_Shenqu_info:"锁定技，当你受到1点伤害后，使用牌堆底的牌进行一次判定：若判定结果为红色，你摸一张牌，伤害来源弃置一张牌。",
                Tianshu_Boss_Shenqu_Kuafu:"神躯",
                Tianshu_Boss_Shenqu_Kuafu_info:"锁定技，当你受到1点伤害后，使用牌堆底的牌进行一次判定：若判定结果为红色，你摸一张牌，伤害来源弃置一张牌。",
                Tianshu_Boss_Fenshi:"焚世",
                Tianshu_Boss_Fenshi_info:"锁定技，准备阶段，若你的手牌数小于体力值，则将手牌摸至于体力值相等；若你的手牌数大于体力值，则你对敌方角色造成共计X点伤害，点数随机分配（X为手牌数减体力值）。",
                Tianshu_Boss_Zhiri:"炙日",
                Tianshu_Boss_Zhiri_info:"锁定技，当敌方角色使用红色锦囊牌指定目标后，你摸两张牌。",
                Tianshu_Boss_Zhiri_Fuck:"炙日",
                Tianshu_Boss_Zhiri_Fuck_info:"锁定技，当敌方角色使用红色锦囊牌指定目标后，你摸三张牌。",
                Tianshu_Boss_Xinji:"心悸",
                Tianshu_Boss_Xinji_info:"锁定技，当你于回合外因弃置而失去手牌时，你对当前回合角色造成1点伤害。",
                Tianshu_Boss_Shenen:'神恩',
                Tianshu_Boss_Shenen_info:'锁定技，所有己方角色使用牌没有距离限制，所有敌方角色手牌上限+1.',
                Tianshu_Boss_Baiyi:'白仪',
                Tianshu_Boss_Baiyi_info:'锁定技，每名敌方角色摸牌阶段，若当前轮数小于3，其少摸一张牌；第五轮开始时，每名敌方角色受到1点雷电伤害；当己方角色受到雷电伤害时，若当前轮数小于7，则此伤害-1。',
                Tianshu_Boss_Baiyi_Fucking:'白仪',
                Tianshu_Boss_Baiyi_Fucking_info:'锁定技，每名敌方角色摸牌阶段，若当前轮数小于3，其少摸一张牌；第五轮开始时，每名敌方角色受到2点雷电伤害；当己方角色受到雷电伤害时，若当前轮数小于7，则免疫此伤害',
                Tianshu_Boss_Juehong:"决洪",
                Tianshu_Boss_Juehong_info:"锁定技，准备阶段，你令所有敌方角色自己弃置自己的装备区内的所有牌，若其装备区内没有牌，则改为随机弃置一张手牌。",
                Tianshu_Boss_Juehong_Fucking:"决洪",
                Tianshu_Boss_Juehong_Fucking_info:"锁定技，准备阶段，你令所有敌方角色自己弃置自己的装备区内的所有牌，若其装备区内没有牌，则改为随机弃置两张手牌。",
                Tianshu_Boss_Zhuri:"逐日",
                Tianshu_Boss_Zhuri_info:"锁定技，准备阶段，你进行一次判定：若判定结果为红色，本回合你使用红色牌结算完毕后将该牌放置在牌堆底;若判定结果为黑色，本回合你使用黑色牌时，你摸一张牌。",
                Tianshu_Boss_Yinjiang:"饮江",
                Tianshu_Boss_Yinjiang_info:"锁定技，当你在出牌阶段摸牌后，额外从牌堆底获得一张牌，如果该牌是红色，则随机对一名敌方角色造成1点伤害。",
                Tianshu_Boss_Lieben:"烈奔",
                Tianshu_Boss_Lieben_info:"锁定技，当你使用【杀】指定目标后，使用牌堆底的牌进行一次判定：若判定结果为红色，则此杀不计入出牌阶段使用次数且伤害+1。",
                Tianshu_Boss_Wuan:"武安",
                Tianshu_Boss_Wuan_info:"锁定技，你可使用的杀的次数+1，杀造成的伤害+1。",
                Tianshu_Boss_Wuan_Fucking:"武安",
                Tianshu_Boss_Wuan_Fucking_info:"锁定技，你可使用的杀的次数+2，杀造成的伤害+1。",
                Tianshu_Boss_Changsheng:"常胜",
                Tianshu_Boss_Changsheng_info:"锁定技，你使用杀无距离",
                Tianshu_Boss_Shashen:"杀神",
                Tianshu_Boss_Shashen_info:"你可以将手牌中的任意牌当杀使用或打出。每回合你使用的第一张杀造成伤害后，摸一张牌。",
                Tianshu_Boss_Shashen_Fucking:"杀神",
                Tianshu_Boss_Shashen_Fucking_info:"你可以将手牌中的任意牌当杀使用或打出。每回合你使用的第一张杀造成伤害后，摸两张牌。",
                Tianshu_Boss_Xingxia:"行夏",
                Tianshu_Boss_Xingxia_info:"	锁定技，每轮限一次，出牌阶段开始时，你对一名其他友方角色造成1点火焰伤害，然后令所有敌方角色选择一项：1.弃置一张红色牌；2.受到你造成的1点火焰伤害。",
                Tianshu_Boss_Xingxia_Fucking:"行夏",
                Tianshu_Boss_Xingxia_Fucking_info:"	锁定技，每轮限一次，出牌阶段开始时，你对一名其他友方角色造成1点火焰伤害，然后令所有敌方角色选择一项：1.弃置两张红色牌；2.受到你造成的2点火焰伤害。",
                Diuse_Xvni_Xvxiang:"虚像",
                Diuse_Xvni_Xvxiang_info:"锁定技，当你受到伤害或体力流失时，防止该伤害",
                Diuse_Xvni_Xiaosha_Guisha:"瑰杀",
                Diuse_Xvni_Xiaosha_Guisha_info:"当其他角色使用【杀】时，你可以弃置一张牌使该【杀】伤害+1，且不计入出杀次数。",
                Diuse_Xvni_Xiaosha_Zhuli:"姝丽",
                Diuse_Xvni_Xiaosha_Zhuli_info:"当其他角色使用【杀】造成伤害后，你可以与其各摸一张牌，每回合限触发两次。",
                Diuse_Xvni_Xiaoshan_Shanwu:"闪舞",
                Diuse_Xvni_Xiaoshan_Shanwu_info:"当其他角色成为【杀】的目标时，你可以弃置一张【闪】 ，取消该【杀】的所有目标。",
                Diuse_Xvni_Xiaoshan_Xianli:"娴丽",
                Diuse_Xvni_Xiaoshan_Xianli_info:"当你失去手牌中的【闪】时，可以获得当前回合角色一张牌，每回合限触发两次。",
                Diuse_Xvni_Xiaojiu_Meiniang:"美酿",
                Diuse_Xvni_Xiaojiu_Meiniang_info:"当其他角色出牌阶段开始时，你可以令该角色视为使用一张【酒】，且不计入酒的使用次数。",
                Diuse_Xvni_Xiaojiu_Yaoli:"媱丽",
                Diuse_Xvni_Xiaojiu_Yaoli_info:"当其他角色使用【酒】时，你可以令该角色使用的下一张【杀】目标数+1，且无法被响应。",
                Diuse_Xvni_Xiaojiu_Jiu_Buff:"媱丽",
                Diuse_Xvni_Xiaojiu_Sha_Buff:"媱丽",
                Diuse_Xvni_Xiaotao_TaoYan:"桃宴",
                Diuse_Xvni_Xiaotao_TaoYan_info:"回合开始时，你可以令至多两名其他角色从牌堆获得一张【桃】并摸一张牌。",
                Diuse_Xvni_Xiaotao_Yanli:"妍丽",
                Diuse_Xvni_Xiaotao_Yanli_info:"你的回合外，当有角色进入濒死状态时，你可以令其回复至1点体力并摸一张牌，每轮限一次。",
                Diuse_Xvni_Xiaole_Leyv:"乐虞",
                Diuse_Xvni_Xiaole_Leyv_info:"当一名角色回合开始时，你可以弃置三张牌令其进行判定：如果判定结果不为红桃，则该角色跳过出牌阶段。",
                Diuse_Xvni_Xiaole_Yuanli:"媛丽",
                Diuse_Xvni_Xiaole_Yuanli_info:"当一名角色跳过出牌阶段时，你可以选择一名其他角色，你与其各摸一张牌。",
    
                Longzhou_Boss_Tianqi:"天气",
                Longzhou_Boss_Tianqi_Buff1:"巨浪",
                Longzhou_Boss_Tianqi_Buff2:"大雾",
                Longzhou_Boss_Tianqi_Mark:"多云",
                Longzhou_Boss_Nutao:"怒涛",
                Longzhou_Boss_Nutao_info:"锁定技，回合开始时，对敌方体力最多的一名角色造成1点雷电伤害。",
                Longzhou_Boss_Nutao_Difficulty:"怒涛",
                Longzhou_Boss_Nutao_Difficulty_info:"锁定技，回合开始时，随机对一名敌方角色造成1点雷电伤害。",
                Longzhou_Boss_Nutao_Fucking:"怒涛",
                Longzhou_Boss_Nutao_Fucking_info:"锁定技，回合开始时，对所有敌方角色造成1点雷电伤害。",
                Longzhou_Boss_Yingzi:"英姿",
                Longzhou_Boss_Yingzi_info:"锁定技，摸牌阶段，你多摸一张牌；你的手牌上限等于X（X为你的体力上限）。",
                Longzhou_Boss_Paoxiao:"咆哮",
                Longzhou_Boss_Paoxiao_info:"锁定技，你使用【杀】无次数限制。你的出牌阶段，若你于当前阶段内使用过【杀】，你于此阶段使用【杀】无距离限制。",
                Longzhou_Boss_Xiongzi:"雄姿",
                Longzhou_Boss_Xiongzi_info:"锁定技，摸牌阶段，你多摸一张牌，如果手牌数小于等于两张，则改为多摸三张牌。",
                Longzhou_Boss_Wushuang:"无双",
                Longzhou_Boss_Wushuang_info:"锁定技，当你使用【杀】或【决斗】时，该角色需一次使用两张【闪】或打出两张【杀】抵消。",
                Longzhou_Boss_Shoujiang:"守江",
                Longzhou_Boss_Shoujiang_info:"锁定技，每回合限一次，当你受到伤害时，若该伤害大于1点，则此伤害-1。",
                Longzhou_Boss_Shoujiang_Difficulty:"守江",
                Longzhou_Boss_Shoujiang_info:"锁定技，每回合限一次，当你受到伤害时，若该伤害大于1点，则此伤害-1，然后你摸一张牌。",
                Longzhou_Boss_Shoujiang_Fucking:"守江",
                Longzhou_Boss_Shoujiang_info:"锁定技，每回合限一次，当你受到伤害时，若该伤害大于1点，则此伤害变为1点（防止多余的伤害），然后你摸三张牌。",
                Longzhou_Boss_Luoshen:"洛神",
                Longzhou_Boss_Luoshen_info:"准备阶段开始时，你可以进行判定，当黑色判定牌生效后，你获得之。若结果为黑色，你可以重复此流程",
                Longzhou_Boss_Biyue:"闭月",
                Longzhou_Boss_Biyue_info:"结束阶段，你可以摸一张牌。若你没有手牌，则改为摸两张牌。",
                Longzhou_Boss_Jizhi:"集智",
                Longzhou_Boss_Jizhi_info:"每当你使用普通锦囊牌时，你可以摸一张牌。",
    
                Boss_Diuse_Nine_Lin:'临',
                Boss_Diuse_Nine_Lin_info:'受到不为锦囊牌的伤害始终-1；弃牌阶段开始时若当前手牌小于当前体力则需要弃置一张牌。',
                Boss_Diuse_Nine_Bing:'兵',
                Boss_Diuse_Nine_Bing_info:'每轮限一次。当你于出牌阶段造成伤害时，若已受伤则恢复一点体力否则摸两张牌。',
                Boss_Diuse_Nine_Dou:'斗',
                Boss_Diuse_Nine_Dou_info:'受到不为杀的伤害始终-1；弃牌阶段结束后若当前手牌小于当前体力则摸一张牌。',
                Boss_Diuse_Nine_Zhe:'者',
                Boss_Diuse_Nine_Zhe_info:'受到的伤害始终+1；每轮限一次。出牌阶段结束时若已受伤则立刻执行一个出牌阶段并摸两张牌。',
                Boss_Diuse_Nine_Jie:'皆',
                Boss_Diuse_Nine_Jie_info:'摸牌阶段开始时，你多摸一张牌并可以多使用一张杀然后本回合手牌上限为最大体力值。',
                Boss_Diuse_Nine_Zhen:'阵',
                Boss_Diuse_Nine_Zhen_info:'每轮限一次。出牌阶段，你从武将池中抽取X名与你武将牌性别相同武将的随机技能中选一个临时获得，若该回合你击杀一名敌方武将，则该技能改为永久获得。',
                Boss_Diuse_Nine_Lie:'列',
                Boss_Diuse_Nine_Lie_info:'每轮限一次。出牌阶段，若已受伤则可以弃置两张牌然后恢复一点体力并摸一张牌。',
                Boss_Diuse_Nine_Qian:'前',
                Boss_Diuse_Nine_Qian_info:'出牌阶段开始时，你可以立刻随机装备一张装备区为空栏的装备，若已满则摸一张牌。',
                Boss_Diuse_Nine_Xing:'行',
                Boss_Diuse_Nine_Xing_info:'锁定技。与其他角色计算距离+1；弃牌阶段开始时若你当前手牌小于当前体力值则你摸至相同牌数且最多摸五张。',
    
                Diuse_newCard:'独立',
                Diuse_newEvent:'事件',
                Diuse_Info:'选项',
                Diuse_Shop:'商店',

                Boss_Diuse_Tianshu_intro1:'&nbsp;第一关',
                Boss_Diuse_Tianshu_intro1_info:'挑战年兽组合',
                Boss_Diuse_Tianshu_intro2:'&nbsp;第二关',
                Boss_Diuse_Tianshu_intro2_info:'挑战捉鬼组合',
                Boss_Diuse_Tianshu_intro3:'&nbsp;第三关',
                Boss_Diuse_Tianshu_intro3_info:'挑战青青子衿',
                Boss_Diuse_Tianshu_intro4:'&nbsp;第四关',
                Boss_Diuse_Tianshu_intro4_info:'挑战Boss级别',
                Boss_Diuse_Tianshu_intro5:'&nbsp;规则：',
                Boss_Diuse_Tianshu_intro5_info:'每次击杀Boss角色，击杀者有奖励；神秘角色助阵；共四关，每通过一关每个角色恢复1点体力和摸2张牌并从开启的武将中随机抽取五个，然后选择一个获取。',
            },
        },
    },"术樱");
}