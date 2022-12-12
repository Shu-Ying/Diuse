window.func = function(lib,game,ui,get,ai,_status)
{
    if(!lib.config.extension_术樱_yuanshenoff) return;

    game.Diuse_Yuanshen=function(英文名,翻译名,obj,扩展包名){
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
    };

    game.Diuse_Yuanshen("Diuse_Yuanshen","原神",{
        connect:true,
        character:{
            character:{
                Diuse_Bachongshenzi:["female","qun",3,["Diuse_Shizuishi","Diuse_Shashengying","Diuse_Tianhuxianzhen"],[]],
                //Diuse_Qin:["female","qun",4,[],[]],
                Diuse_Keli:["female","qun",4,["Diuse_Pengpeng","Diuse_Honghong","Diuse_Lieyan"],[]],
                //,'kagari_zongsi'
            },
            translate:{
                Diuse_Bachongshenzi:"八重神子",
                Diuse_Qin:"琴",
                Diuse_Keli:"可莉",
            },
        },
        perfectPair:{},
        characterTitle:{},
        characterReplace:{}, //切换版本
        game:{ //普通自定义函数
            sortCard:function(){  //整理手牌
                if(!game.me) return;
                var hs=game.me.getCards('h');
                if(!hs.length) return;
                game.addVideo('lose',game.me,[get.cardsInfo(hs),[],[],[]]);
                for(var i=0;i<hs.length;i++){
                    hs[i].goto(ui.special);
                }
                hs.sort(function(b,a){
                    if(a.name!=b.name) return lib.sort.card(a.name,b.name);
                    else if(a.suit!=b.suit) return lib.suit.indexOf(a)-lib.suit.indexOf(b);
                    else return a.number-b.number;
                });
                game.me.directgain(hs,false);
                return ;
            },
        },
        skill:{
            skill:{
                Diuse_Shizuishi:{
                    audio:"ext:术樱:4",
                    trigger:{player:"useCardBefore"},
                    forced:true,
                    filter:function(event,player){
                        if(event.player!=player&&event.player.hasSkill('Diuse_Shizuishi')) return false;
                        return event.player==player&&event.card.isCard;
                    },
                    content:function(){
                        var num,bool=true,sBool=false;
                        var i=0;
                        while(bool){
                            i++;
                            num=game.Diuse_randomNum(game.players.length-1,0);
                            if(game.players[num]!=player&&!game.players[num].hasSkill('Diuse_Shizuishi')) {
                                bool=false;
                                sBool=true;
                            }
                            if(i==game.players.length) bool=false;
                        }
                        if(sBool){
                            game.sortCard();
                            trigger.player=game.players[num];
                            player.line(game.players[num]);
                            trigger.untrigger();
                            trigger.trigger('useCardBefore');
                        }

                        //if(trigger.card.name=='sha'){ player.getStat().card.sha++; } //限制出杀次数
                    }
                },
                Diuse_Shashengying:{
                    audio:"ext:术樱:2",
                    trigger:{target:"useCardToTarget"},
                    usable:2,
                    check:function(event,player,card){
                        if(event.card.name=='shunshou'||event.card.name=='guohe'||event.card.name=='zhujinqiyuan'&&event.player.isFriendOf(player)&&player.countCards('j')) return false
                        if(get.type(event.card)=='equip'||event.targets.length==game.players.length) return false;
                        return true;
                    },
                    filter:function(event,player){
                        var suit1=event.card.suit;
                        return player.countCards('h',function(card){
                            return get.suit(card,player)==suit1;
                        })
                    },
                    content:function(){
                        var suit1=trigger.card.suit;
                        'step 0'
                        player.chooseControl('全部','一张','一张并选择一个目标').set('prompt','请选择并弃置'+get.translation(suit1)+'花色').set('ai',function(){
                            var suit1=trigger.card.suit;
                            var num=player.countCards('h',function(card){
                                return get.suit(card,player)==suit1;
                            })
                            var friend;

                            for(var i=0;i<game.players.length;i++){
                                if(game.players[i]==player) continue;
                                if(game.players[i].isFriendOf(player)){
                                    break;
                                    friend=true;
                                } 
                                if(i==game.players.length) friend=false;
                            }
                            
                            var trigger1=_status.event.getTrigger();
                            var card1=get.effect(player,trigger1.card,trigger1.player,_status.event.player);

                            if(get.type(trigger.card)=='delay'&&num==1) return '全部';
                            if(get.type(trigger.card)=='delay'&&num>1) return '一张';
                            if(card1<=1&&num==1) return '全部';
                            if(card1>=2&&num==1&&friend) return '一张并选择一个目标';
                            if(card1<=1&&num>1) return '一张';
                            if(card1>=2&&num>1&&friend) return '一张并选择一个目标';
                            if(card1>=2&&num>1&&friend==false) return '一张';
                        });
                        'step 1'
                        if(result.control=='全部'){
                            player.discard(player.getCards('h',{suit:suit1}));
                            trigger.getParent().excluded.add(player);
                            player.storage.cardName=trigger.card.name;
                            player.storage.skillBool=true;
                        } else if(result.control=='一张'){
                            player.chooseToDiscard('h',1,function(card){
                                return get.suit(card)==suit1;
                            },true);
                            trigger.getParent().excluded.add(player);
                        } else {
                            player.chooseToDiscard('h',1,function(card){
                                return get.suit(card)==suit1;
                            },true);
                            player.storage.skillBool2=true;
                        }
                    },
                    group:['Diuse_Shashengying_Buff','Diuse_Shashengying_Buff1'],
                    subSkill:{
                        Buff:{
                            auido:false,
                            trigger:{global:'useCardAfter'},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                return (player.storage.skillBool&&event.card.name==player.storage.cardName&&event.player!=player&&get.itemtype(event.cards)=='cards'&&get.position(event.cards[0],true)=='o');
                            },
                            content:function(){
                                if(player.countCards('h')==0) player.draw(player.hp);
                                player.gain(trigger.cards,'gain2');
                                player.storage.skillBool=false;
                                player.storage.cardName='';
                            }
                        },
                        Buff1:{
                            trigger:{target:"useCardToTargeted",},
                            forced:true,
                            popup:false,
                            auido:false,
                            sub:true,
                            filter:function(event,player){
                                return player.storage.skillBool2;
                            },
                            content:function(){
                                'step 0'
                                var prompt2='为'+get.translation(trigger.card)+'额外指定一个目标';
                                player.chooseTarget([1,player.storage.fumian_red],get.prompt(event.name),function(card,player,target){
                                    var player=_status.event.player;
                                    if(_status.event.targets.contains(target)) return false;
                                    return lib.filter.targetEnabled2(_status.event.card,player,target);
                                }).set('prompt2',prompt2).set('ai',function(target){
                                    var trigger=_status.event.getTrigger();
                                    var player=_status.event.player;
                                    return get.effect(target,trigger.card,player,player);
                                }).set('targets',trigger.targets).set('card',trigger.card);
                                'step 1'
                                if(result.bool){
                                    if(!_status.connectMode&&!event.isMine()) game.delayx();
                                    event.targets=result.targets;
                                }
                                'step 2'
                                if(event.targets){
                                    player.logSkill(event.name,event.targets);
                                    trigger.targets.addArray(event.targets);
                                }
                                player.storage.skillBool2=false;
                            },
                        },
                    },
                },
                Diuse_Tianhuxianzhen:{
                    audio:"ext:术樱:2",
                    marktext:"狐",
                    mark:true,
                    intro:{
                        content:function (storage,player,skill){
                            var num=player.countMark('Diuse_Tianhuxianzhen');
                            return '本回合手牌上限+'+num;
                        },
                    },
                    locked:true,
                    enable:"phaseUse",
                    usable:2,
                    content:function(){
                        'step 0'
                        player.chooseControl('黑桃','梅花','方块','红桃').set('prompt','选择一种花色并展示牌堆底的一张牌，如果花色相同则你获得之并可以重复执行').set('ai',function(){
                            var randomNum=game.Diuse_randomNum(100,0);
                            if(randomNum<=35){
                                var card=get.bottomCards()[0];
                                if(get.suit(card)=='spade'){
                                    return '黑桃';
                                }else if(get.suit(card)=='club'){
                                    return '梅花';
                                }else if(get.suit(card)=='diamond'){
                                    return '方块';
                                }else {
                                    return '红桃';
                                }
                            } else {
                                list=['黑桃','梅花','方块','红桃'].randomGet();
                                return list;
                            }
                        });
                        'step 1'
                        if(result.control=='黑桃'){
                            var card=get.bottomCards()[0];
                            player.showCards(card);
                            if(get.suit(card)=='spade'){
                                if(player.countCards('h')==0) player.draw();
                                player.gain(card,'gain2');
                                event.goto(0);
                            } else {
                                game.log(player,'将',card,'放置牌堆顶');
                                player.addMark('Diuse_Tianhuxianzhen',1);
                                ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
                            }
                        } else if(result.control=='梅花'){
                            var card=get.bottomCards()[0];
                            player.showCards(card);
                            if(get.suit(card)=='club'){
                                if(player.countCards('h')==0) player.draw();
                                player.gain(card,'gain2');
                                event.goto(0);
                            } else {
                                game.log(player,'将',card,'放置牌堆顶');
                                player.addMark('Diuse_Tianhuxianzhen',1);
                                ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
                            }
                        } else if(result.control=='方块'){
                            var card=get.bottomCards()[0];
                            player.showCards(card);
                            if(get.suit(card)=='diamond'){
                                if(player.countCards('h')==0) player.draw();
                                player.gain(card,'gain2');
                                event.goto(0);
                            } else {
                                game.log(player,'将',card,'放置牌堆顶');
                                player.addMark('Diuse_Tianhuxianzhen',1);
                                ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
                            }
                        } else {
                            var card=get.bottomCards()[0];
                            player.showCards(card);
                            if(get.suit(card)=='heart'){
                                if(player.countCards('h')==0) player.draw();
                                player.gain(card,'gain2');
                                event.goto(0);
                            } else {
                                game.log(player,'将',card,'放置牌堆顶');
                                player.addMark('Diuse_Tianhuxianzhen',1);
                                ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
                            }
                        }
                        game.updateRoundNumber();
                    },
                    mod:{
                        maxHandcardBase:function(player,num){
                            var num1=player.countMark('Diuse_Tianhuxianzhen');
                            return num+num1;
                        },
                    },
                    ai:{
                        order:10,
                        threaten:0.5,
                        result:{
                            player:function (player,target){
                                return 1;
                            },
                        },
                    },
                    group:'Diuse_Tianhuxianzhen_Buff',
                    subSkill:{
                        Buff:{
                            trigger:{player:"phaseJieshuBegin"},
                            forced:true,
                            priority:100,
                            silent:true,
                            sub:true,
                            firstDo:true,
                            frequent:true,
                            popup:false,
                            audio:false,
                            filter:function(event,player){
                                return player.countMark('Diuse_Tianhuxianzhen');
                            },
                            content:function(){
                                var num=player.countMark('Diuse_Tianhuxianzhen');
                                player.removeMark('Diuse_Tianhuxianzhen',num);
                            },
                        },
                    },
                },
                Diuse_Pengpeng:{
                    mark:true,
                    marktext:'砰',
                    intro:{
                        content:function(storage,player,skill){
                            var num=player.storage.Diuse_Pengpeng,num1;
                            if(num>=3&&parseInt(num%3)==0){
                                return '下张伤害类牌就可以多丢一个炸弹';
                            } else {
                                num1=num<3?3-num:3-parseInt(num%3)
                                return '距离可莉的炸弹还有'+num1+'张哦';
                            }
                        },
                    },
                    trigger:{player:"useCardToTargeted"},
                    forced:true,
                    firstDo:true,
                    popup:false,
                    init:function(player){
                        player.storage.Diuse_Pengpeng=0;
                        player.storage.Diuse_Pengpeng_Damage=false;
                        player.storage.Diuse_Pengpeng_Bool=false;
                        player.storage.Diuse_Keli_Bool=false;
                    },
                    filter:function(event,player){
                        if(!get.tag(event.card,'damage')) return false;
                        if(!event.isFirstTarget) return false;
                        var info=get.info(event.card);
                        if(info.allowMultiple==false) return false;
                        if(event.targets&&!info.multitarget){
                            if(game.hasPlayer(function(current){
                                return lib.filter.targetEnabled2(event.card,player,current);
                            })){
                                return true;
                            }
                        }
                        return false;
                    },
                    content:function(){
                        var num=player.storage.Diuse_Pengpeng;
                        var mp3=num+1;
                        if(mp3>=3&&parseInt(mp3%3)==0){
                            var list=[1,2,3].randomGet();
                            game.playAudio('..','extension\\术樱','Diuse_Pengpeng'+list);
                        }
                        if(num>=3&&parseInt(num%3)==0){
                            player.storage.Diuse_Pengpeng_Bool=true;
                            player.storage.Diuse_Keli_Bool=true;
                            player.storage.Diuse_Pengpeng++;
                        } else {
                            player.storage.Diuse_Pengpeng_Damage=false;
                            player.storage.Diuse_Pengpeng_Bool=false;
                            player.storage.Diuse_Keli_Bool=false;
                            player.storage.Diuse_Pengpeng++;
                        }
                    },
                    group:['Diuse_Pengpeng_Damage','Diuse_Pengpeng_Target'],
                    subSkill:{
                        Damage:{
                            trigger:{source:"damageBefore"},
                            forced:true,
                            firstDo:true,
                            popup:false,
                            onremove:true,
                            sub:true,
                            filter:function(event,player){
                                return get.tag(event.card,'damage')&&player.storage.Diuse_Keli_Bool;
                            },
                            content:function(){
                                trigger.nature='fire';
                                if(player.storage.Diuse_Pengpeng_Damage) {
                                    trigger.num++;
                                }
                            }
                        },
                        Target:{
                            trigger:{player:"useCardToTargeted"},
                            forced:true,
                            popup:false,
                            sub:true,
                            filter:function(event,player){
                                if(!get.tag(event.card,'damage')||event.targets.length!=1) return false;
                                if(!event.isFirstTarget) return false;
                                var info=get.info(event.card);
                                if(info.allowMultiple==false) return false;
                                if(event.targets&&!info.multitarget){
                                    if(game.hasPlayer(function(current){
                                        return lib.filter.targetEnabled2(event.card,player,current);
                                    })){
                                        return player.storage.Diuse_Pengpeng_Bool;
                                    }
                                }
                                return false;
                            },
                            content:function(){
                                'step 0'
                                var prompt2='为'+get.translation(trigger.card)+'额外指定一个目标';
                                player.chooseTarget([1,player.storage.fumian_red],get.prompt(event.name),function(card,player,target){
                                    var player=_status.event.player;
                                    if(_status.event.targets.contains(target)) return false;
                                    return lib.filter.targetEnabled2(_status.event.card,player,target);
                                }).set('prompt2',prompt2).set('ai',function(target){
                                    var trigger=_status.event.getTrigger();
                                    var player=_status.event.player;
                                    return get.effect(target,trigger.card,player,player);
                                }).set('targets',trigger.targets).set('card',trigger.card);
                                'step 1'
                                if(result.bool){
                                    if(!_status.connectMode&&!event.isMine()) game.delayx();
                                    event.targets=result.targets;
                                } else {
                                    event.finish();
                                    player.storage.Diuse_Pengpeng_Bool=false;
                                    player.storage.Diuse_Pengpeng_Damage=true;
                                }
                                'step 2'
                                if(event.targets){
                                    player.logSkill(event.name,event.targets);
                                    trigger.targets.addArray(event.targets);
                                }
                                player.storage.Diuse_Pengpeng_Bool=false;
                            },
                        },
                    },
                },
                Diuse_Honghong:{
                    audio:"ext:术樱:3",
                    enable:'phaseUse',
                    usable:1,
                    init:function(player){
                        player.storage.Diuse_Honghong_Bool=false;
                    },
                    check:function(){
                        return true;
                    },
                    filter:function(event,player){
                        var hs=player.getCards('h',function(card){
                            return get.tag(card,'damage');
                        });
                        if(!hs.length) return false;
                        return true;
                    },
                    content:function(){
                        'step 0'
                        event.card=get.cardPile(function(card){
                            return get.tag(card,'damage');
                        });
                        if(event.card) {
                            player.showCards(event.card);
                            player.chooseToDiscard('h',1,function(card){
                                return get.tag(card,'damage');
                            },false).set('ai',function(card){
                                return 8-ai.get.value(card);
                            });
                        } else {
                            game.log(player,'将',event.card,'置入弃牌堆');
                            game.cardsDiscard(event.card);
                            event.finish();
                        }
                        'step 1'
                        if(result.bool){
                            player.storage.Diuse_Honghong_Bool=true;
                            player.chooseUseTarget(event.card,false);
                        } 
                        'step 2'
                        if(!result.targets){
                            game.log(player,'将',event.card,'置入弃牌堆');
                            game.cardsDiscard(event.card);
                        } else {
                            event.finish();
                        }
                    },
                    contentAfter:function(){
                        player.storage.Diuse_Honghong_Bool=false;
                    },
                    group:['Diuse_Honghong_Damage','Diuse_Honghong_Jieshu'],
                    subSkill:{
                        Damage:{
                            trigger:{source:"damageBefore"},
                            forced:true,
                            firstDo:true,
                            popup:false,
                            onremove:true,
                            sub:true,
                            filter:function(event,player){
                                return get.tag(event.card,'damage')&&player.storage.Diuse_Honghong_Bool;
                            },
                            content:function(){
                                trigger.nature='fire';
                            }
                        },
                        Jieshu:{
                            trigger:{player:"phaseJieshu"},
                            frequent:true,
                            filter:function(event,player){
                                var sourceDamage=player.getHistory('sourceDamage').length;
                                return sourceDamage==0&&!player.countCards('h',function(card){
                                    return get.tag(card,'damage');
                                });
                            },
                            content:function(){
                                var card=get.cardPile2(function(card){
                                    return get.tag(card,'damage');
                                });
                                if(card) player.gain(card,'gain2');
                                game.updateRoundNumber();
                            },
                        },
                    },
                    ai:{
                        order:6,
                        result:{
                            player:1,
                        },
                        threaten:0.5,
                    },
                },
                Diuse_Lieyan:{
                    trigger:{player:'damageBegin4'},
                    filter:function(event){
                        return event.nature=='fire';
                    },
                    forced:true,
                    content:function(){
                        trigger.cancel();
                    },
                    ai:{
                        nofire:true,
                        effect:{
                            target:function(card,player,target,current){
                                if(get.tag(card,'fireDamage')) return 'zerotarget';
                            }
                        }
                    },
                    group:'Diuse_Lieyan_Damage',
                    subSkill:{
                        Damage:{
                            audio:"ext:术樱:3",
                            trigger:{source:"damageBegin"},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                return event.nature=='fire';
                            },
                            content:function(){
                                if(player.countCards('h')!=player.hp){
                                    player.draw(player.countCards('h')==0?2:1);
                                } else {
                                    trigger.num++;
                                }          
                            },
                            ai:{
                                effect:{
                                    player:function(card,player,target){
                                        if(card.name=='sha'||card.nature=='fire'||card.name=='zhuque') return [1,3];
                                    },
                                },
                            },
                        },
                    },
                },
            },
            translate:{
                Diuse_Shizuishi:"食罪式",
                Diuse_Shizuishi_info:"锁定技，当你使用非转化牌指定目标后，将此牌使用者改为场上不拥有此技能的随机其他角色。",
                Diuse_Shashengying:"杀生樱",
                Diuse_Shashengying_Buff:"杀生樱",
                Diuse_Shashengying_Buff1:"杀生樱",
                Diuse_Shashengying_info:"每回合限两次。当你成为使用牌的目标后，若该牌花色与你手牌中的花色有相同，则你可以选择：1:弃置全部该花色的手牌使该牌对你无效，并在该牌结算后获得之，若你因此弃置全部手牌则你将手牌补充至当前体力值，2:弃置一张该花色的手牌，使该牌对你无效，3:弃置一张该花色的手牌并指定一名其他角色，令其也成为该牌的目标。",
                Diuse_Tianhuxianzhen:"天狐显真",
                Diuse_Tianhuxianzhen_info:"出牌阶段限两次，你声明一种花色并亮出牌堆底的一张牌，如果花色相同则你获得之，若在此之前你没有手牌则你从牌堆顶摸一张牌并重复此技能，如果花色不同则将该牌置于牌堆顶然后本回合你手牌上限+1。",
                Diuse_Pengpeng:"砰砰",
                Diuse_Pengpeng_info:"锁定技: 你每使用三次伤害类型牌，下张伤害类型牌的伤害为火元素。若该牌目标唯一，则你可以选择一个额外的合法目标。若取消则该牌伤害+1",
                Diuse_Honghong:"轰轰",
                Diuse_Honghong_info:"出牌阶段限一次，你展示牌堆中一张可以造成伤害的牌，然后你可以弃置一张可以造成伤害的手牌并使用该牌(这张牌造成的伤害为火元素)否则将此牌置入弃牌堆。结束阶段，若你此回合没有造成伤害且手牌没有伤害类牌则你获得一张伤害类牌",
                Diuse_Lieyan:"烈焰",
                Diuse_Lieyan_info:"锁定技，你受到火元素伤害时，免疫此伤害；当你造成火元素伤害时, 若你手牌不等于当前体力, 则你摸一张牌, 若你没有手牌则额外摸一张手牌;若相等则该伤害+1",
            },
        },
    },"术樱");
}