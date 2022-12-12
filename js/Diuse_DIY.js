window.func = function(lib,game,ui,get,ai,_status)
{
    if(!lib.config.extension_术樱_diyoff) return;

    game.Diuse_Diy=function(英文名,翻译名,obj,扩展包名){
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

    game.Diuse_Diy("Diuse_DIY","DIY",{
        connect:true,
        character:{
            character:{
                Diuse_Diy_Zhonghui:["male","jin",4,["Diuse_Diy_Xingfa","Diuse_Diy_Miaopin"],[]],
                Diuse_Diy_Caocao:["male","wei",4,["jianxiong","Diuse_Diy_Huibian","hujia"],[]],
                Diuse_Diy_Zhugeshang:["male","shu",4,["Diuse_DIY_Juesi","Diuse_DIY_Xunzhong"],[]],
                Diuse_Diy_Simazhao:["male","wei",3,["Diuse_DIY_Zhaoquan","Diuse_DIY_Zhengtong"],[]],
                Diuse_Diy_Lvbu:["male","qun",5,["Diuse_DIY_Baifu","Diuse_DIY_Zixiao","wushuang"],[]],
                Diuse_Diy_Simashi:["male","wei",4,["Diuse_DIY_Suzheng","Diuse_DIY_Zhangbing"],[]],
                Diuse_Diy_Panghui:["male","wei",4,["Diuse_DIY_Shichou","Diuse_DIY_Yonglie"],[]],
                Diuse_Diy_Caomao:["male","wei",3,["Diuse_DIY_Kuiye","Diuse_DIY_Sucai","Diuse_DIY_Kuidi"],['zhu']],
                Diuse_Diy_Xushu:["male","shu",4,["Diuse_DIY_Zhuhai","Diuse_DIY_Qianxin"],[]],
                Diuse_Liubei:["male","shu",4,["Diuse_Rende","Diuse_Jijiang"],[]],
                Diuse_Caocao:["male","wei",4,["Diuse_Jianxiong","Diuse_Hujia"],[]],
                Diuse_Sunquan:["male","wu",4,["Diuse_Zhiheng","Diuse_Jiuyuan"],[]],
                Diuse_Liuxie:["male","qun",3,["Diuse_Tianming","Diuse_Mizhao"],[]],
                Diuse_Xiahoushi:["female","shu",3,["Diuse_Yanyv","Diuse_Qiaoshi"],[]],
                Diuse_Wangyi:["female","wei",4,["Diuse_Zhenlie","Diuse_Miji"],[]],
                Diuse_Sunluyv:["female","wu",3,["Diuse_Meibu","Diuse_Mumu"],[]],
                Diuse_Dongbai:["female","qun",3,["Diuse_Lianzhu","Diuse_Xiahui"],[]],
                //,'kagari_zongsi'
            },
            translate:{
                Diuse_Diy_Zhonghui:"钟会",
                Diuse_Diy_Caocao:"曹操",
                Diuse_Diy_Zhugeshang:"诸葛尚",
                Diuse_Diy_Simazhao:"司马昭",
                Diuse_Diy_Lvbu:"吕布",
                Diuse_Diy_Simashi:"司马师",
                Diuse_Diy_Panghui:"庞会",
                Diuse_Diy_Caomao:"曹髦",
                Diuse_Diy_Xushu:"界徐庶",
                Diuse_Liubei:"界刘备",
                Diuse_Caocao:"界曹操",
                Diuse_Sunquan:"界孙权",
                Diuse_Liuxie:"刘协",
                Diuse_Xiahoushi:"夏侯氏",
                Diuse_Wangyi:"界王异",
                Diuse_Sunluyv:"孙鲁育",
                Diuse_Dongbai:"董白",
            },
        },
        game:{
        },
        perfectPair:{},
        characterTitle:{},
        characterReplace:{}, //切换版本
        skill:{
            skill:{
                Diuse_Diy_Xingfa:{
                    enable:"phaseUse",
                    usable:1,
                    content:function(){
                        'step 0'
                        var bool=game.hasPlayer(function(target){
                            if(player.inRange(target)&&target!=player&&player.canUse('sha',target)){
                                return true;
                            } else {
                                return false;
                            }
                        });
                        if(bool){
                            player.chooseControl('摸一张牌','使用杀').set('prompt','请选择').set('ai',function(){
                                list=['摸一张牌','使用杀'].randomGet();
                                return list;
                            });
                        }
                        'step 1'
                        if(result.control=='使用杀'){
                            player.chooseUseTarget({name:'sha',nature:'fire'},'是否视为使用一张无视距离的火【杀】？',false,'nodistance');
                            event.prom='使用火杀';
                        } else {
                            player.draw();
                            event.prom='摸一张牌';
                        }
                        'step 2'
                        player.chooseTarget(1,('选择一个目标，令其也可以'+event.prom),function(card,player,target){
                            return target!=player;
                        }).set('ai',function(target){
                            if(get.attitude(_status.event.player,target)>0){ return true; }
                            return false;
                        });
                        'step 3'
                        if(result.bool){
                            event.targets=result.targets[0];
                            event.targets.chooseControl('是','否').set('prompt','请选择是否'+event.prom).set('ai',function(){
                                list=['是','否'].randomGet();
                                if(get.attitude(_status.event.player,target)>0) return '是';
                                return list;
                            });
                        } else {
                            event.finish();
                        }
                        'step 4'
                        if(result.control=='是'){
                            if(event.prom=='使用火杀'){
                                event.targets.chooseUseTarget({name:'sha',nature:'fire'},'是否视为使用一张无视距离的火【杀】？',false,'nodistance');
                            } else {
                                event.targets.draw();
                            }
                        } else {
                            if(event.prom=='使用火杀'){
                                player.draw();
                            } else {
                                player.chooseUseTarget({name:'sha',nature:'fire'},'是否视为使用一张无视距离的火【杀】？',false,'nodistance');
                            }
                        }
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
                },
                Diuse_Diy_Miaopin:{
                    trigger:{player:"gainAfter"},
                    forced:true,
                    filter:function(event,player){
                        if(event.parent.parent.name=='phaseDraw') return false;
                        if(event.getParent(2).name=='Diuse_Diy_Miaopin') return false;
                        return true;
                    },
                    content:function(){player.draw('visible')},
                    group:['Diuse_Diy_Miaopin_Gain','Diuse_Diy_Miaopin_Buff','Diuse_Diy_Miaopin_DeBuff'],
                    subSkill:{
                        Gain:{
                            trigger:{player:"gainBegin"},
                            forced:true,
                            popup:false,
                            audio:false,
                            sub:true,
                            filter:function (event,player){
                                return event.getParent().name=='draw'&&event.getParent(2).name=='Diuse_Diy_Miaopin'&&get.type(event.cards[0])!='equip'&&get.type(event.cards[0])!='delay';
                            },
                            content:function(){
                                trigger.gaintag.add('Diuse_Diy_Miaopin');
                            },
                        },
                        Buff:{
                            sub:true,
                            enable:"chooseToUse",
                            hiddenCard:function(player,name){
                                var cards=player.getCards('h',function(card){
                                    return card.hasGaintag('Diuse_Diy_Miaopin'); 
                                });
                                for(var i=0;i<cards.length;i++){
                                    if(get.type(cards[i])=='trick'&&get.name(cards[i])!='wuxie'&&name=='wuxie'&&player.storage.Diuse_Diy_Miaopin) return true;
                                    if(get.type(cards[i])=='basic'&&get.name(cards[i])!='tao'&&name=='tao'&&player.storage.Diuse_Diy_Miaopin) return true;
                                }
                                return false;
                            },
                            filter:function(event,player){
                                var cards=player.getCards('h',function(card){
                                    return card.hasGaintag('Diuse_Diy_Miaopin');
                                });
                                if(!player.storage.Diuse_Diy_Miaopin) return false;
                                var mod2=game.checkMod(cards[0],player,'unchanged','cardEnabled2',player);
                                if(mod2===false) return false;

                                if(player.getCards('h',function(card){
                                    return card.hasGaintag('Diuse_Diy_Miaopin'); 
                                }).length<=0) return false;

                                for(var i of lib.inpile) if(event.filterCard({name:i,cards:cards,},player,event)) return true;
                            },
                            chooseButton:{
                                dialog:function(event,player){
                                    var cards=player.getCards('h',function(card){
                                        return card.hasGaintag('Diuse_Diy_Miaopin');
                                    });
                                    var list=[];
                                    for(var i of lib.inpile){
                                        if(i=='shan'&&event.getParent('phaseUse').player==player) continue;
                                        if(get.type(i)=='basic'||get.type(i)=='trick'&&event.filterCard({
                                            name:i,
                                            cards:cards,
                                        },player,event)){
                                            if(event.filterCard({name:'wuxie',cards:cards,},player,event)){
                                                list.push(['锦囊','','wuxie']);
                                                break;
                                            }
                                            if(event.parent.name=='_save'&&event.player==player){
                                                if(event.filterCard({name:'tao',cards:cards,},player,event)){
                                                    list.push(['基本','','tao']);
                                                    if(event.filterCard({name:'jiu',cards:cards,},player,event)){
                                                        list.push(['基本','','jiu']);
                                                        break;
                                                    }
                                                    break;
                                                }
                                            }
                                            if(event.parent.name=='_save'&&event.filterCard({name:'tao',cards:cards,},player,event)){
                                                list.push(['基本','','tao']);
                                                break;
                                            }
                                            if(event.parent.name=='sha'&&event.filterCard({name:'shan',cards:cards,},player,event)){
                                                list.push(['基本','','shan']);
                                                break;
                                            }
                                            for(var j=0;j<cards.length;j++){
                                                if(get.name(cards[j])!=i&&get.type(cards[j])==get.type(i)){
                                                    if(i=='tao'&&player.hp==player.maxHp) continue;
                                                    if(get.type(i)=='basic'){
                                                        list.push(['基本','',i]);
                                                    } else {
                                                        list.push(['锦囊','',i]);
                                                    }
                                                    break;  
                                                }
                                            }
                                        }
                                    }
                                    return ui.create.dialog('妙品',[list,'vcard'],'hidden');
                                },
                                check:function(button){
                                    var player=_status.event.player;
                                    return player.getUseValue({name:button.link[2]})+1;
                                },
                                backup:function(links,player){
                                    return {
                                        popname:true,
                                        selectCard:1,
                                        position:'h',
                                        viewAs:{name:links[0][2]},
                                        filterCard:function(card){
                                            return card.hasGaintag('Diuse_Diy_Miaopin')&&(get.type(card)==get.type(links[0][2]))&&get.name(card)!=links[0][2];
                                        },
                                        onuse:function(links,player){
                                            player.storage.Diuse_Diy_Miaopin=false;
                                        },
                                    }
                                },
                                prompt:function(links,player){
                                    return '将手牌中的一张牌牌当做'+get.translation(links[0][2])+'使用';
                                },
                            },
                            ai:{
                                save:true,
                                fireAttack:true,
                                order:10,
                                result:{
                                    player:function (player,target){
                                        return 1;
                                    },
                                },
                            },
                        },
                        DeBuff:{
                            trigger:{global:['phaseUseBefore','phaseUseAfter']},
                            forced:true,
                            popup:false,
                            sub:true,
                            audio:false,
                            content:function(){
                                player.storage.Diuse_Diy_Miaopin=true;
                            },
                        },
                    },
                },
                Diuse_Diy_Huibian:{
                    audio:"rejianxiong",
                    enable:'phaseUse',
                    usable:1,
                    filter:function(event,player){
                        return game.countPlayer(function(current){
                            return true;
                        })>1&&game.hasPlayer(function(current){
                            return current.isDamaged();
                        });
                    },
                    filterTarget:function(card,player,target){
                        if(ui.selected.targets.length) return target.isDamaged();
                        return true;
                    },
                    selectTarget:2,
                    multitarget:true,
                    targetprompt:['受到伤害</br>然后摸牌','回复体力'],
                    content:function(){
                        'step 0'
                        targets[0].damage(player);
                        'step 1'
                        if(targets[0].isAlive()) targets[0].draw(2);
                        targets[1].recover();
                    },
                    ai:{
                        threaten:1.2,
                        order:9,
                        result:{
                            target:function(player,target){
                                if(ui.selected.targets.length) return 1;
                                if(get.damageEffect(target,player,player)>0) return 2;
                                if(target.hp>2) return 1;
                                if(target.hp==1) return -1;
                                return 0.1;
                            }
                        },
                    }
                },
                Diuse_DIY_Juesi:{
                    marktext:"决",
                    mark:true,
                    locked:true,
                    intro:{
                        content:function(storage,player,skill){
                            var num=player.countMark('Diuse_DIY_Juesi');
                            return '出杀次数上限+'+num;
                        }
                    },
                    enable:"phaseUse",
                    filterTarget:function(card,player,target){
                        return player.canCompare(target);
                    },
                    filter:function(event,player){
                        return player.countCards('h')>0;
                    },
                    content:function(){
                        "step 0"
                        player.chooseToCompare(target).set('small',true);
                        "step 1"
                        if(result.bool){
                            player.addMark('Diuse_DIY_Juesi');
                        }
                    },
                    ai:{
                        order:function(name,player){
                            var cards=player.getCards('h');
                            var num=player.countMark('Diuse_DIY_Juesi');
                            if(num>=2) return 0;
                            if(player.countCards('h','sha')==0){
                                return 1;
                            }
                            for(var i=0;i<cards.length;i++){
                                if(cards[i].name!='sha'&&cards[i].number>11&&get.value(cards[i])<7){
                                    return 9;
                                }
                            }
                            return get.order({name:'sha'})-1;
                        },
                        result:{
                            player:function(player){
                                if(player.countCards('h','sha')>0){
                                    if(player.countMark('Diuse_DIY_Juesi')==2){
                                        return 0.1;
                                    } else if(player.countMark('Diuse_DIY_Juesi')>=3){
                                        return -9;
                                    } else {
                                        return 0.6;
                                    }
                                } 
                                var num=player.countCards('h');
                                if(num>player.hp) return 0;
                                if(num==1) return -2;
                                if(num==2) return -1;
                                return -0.8;
                            },
                            target:function(player,target){
                                var num=target.countCards('h');
                                if(num==1) return -1;
                                if(num==2) return -0.7;
                                return -0.6;
                            },
                        },
                        threaten:1.3
                    },
                    mod:{
                        cardUsable:function(card,player,num){
                            var num1=player.countMark('Diuse_DIY_Juesi');
                            if(card.name=='sha') return num+num1;
                        },
                    },
                },
                Diuse_DIY_Xunzhong:{
                    trigger:{player:'compare',target:'compare'},
                    forced:true,
                    init:function(player){
                        player.storage.xunzhong_buff=[];
                    },
                    content:function(){
                        var targets=player==trigger.player?(trigger.targets?trigger.targets.slice(0):[trigger.target]):[trigger.player];
                        for(var i=0;i<targets.length;i++){
                            player.storage.xunzhong_diy++;
                            if(player.storage.xunzhong_diy==2){
                                player.storage.xunzhong_buff=targets;
                            } else if(player.storage.xunzhong_diy==3){
                                player.loseHp();
                            } else if(player.storage.xunzhong_diy>=4){
                                player.loseMaxHp();
                            }
                        }
                    },
                    mod:{
                        globalFrom:function(from,to,distance){
                            if(from.storage.xunzhong_buff.contains(to)){
                                return -Infinity;
                            }
                        },
                    },
                    group:["Diuse_DIY_Xunzhong_Stor"],
                    subSkill:{
                        Stor:{
                            trigger:{player:"phaseJieshuAfter"},
                            forced:true,
                            firstDo:true,
                            popup:false,
                            audio:false,
                            sub:true,
                            content:function(){
                                player.storage.xunzhong_diy=0;
                                player.storage.xunzhong_buff=[];
                            },
                        },
                    },
                },
                Diuse_DIY_Zhaoquan:{
                    enable:"phaseUse",
                    usable:1,
                    filterTarget:function(card,player,target){return target!=player;},
                    content:function(){
                        'step 0'
                        var hs=targets[0].getCards('h');
                        var list=[];
                        for(var i=0;i<hs.length;i++){
                            var chosen=hs[i];
                            if(targets[0].hasUseTarget(chosen)&&!get.info(chosen).multitarget){
                                var ls=game.filterPlayer(function(current){
                                    return lib.filter.targetEnabled2(chosen,target,current);
                                });
                                if(ls.length){
                                    list.push(hs[i]);
                                }
                            }
                        }
                        if(list==undefined||list==''||list==[]) event.goto(1);
                        targets[0].chooseToUse({
                            prompt:get.prompt('Diuse_DIY_Zhaoquan'),
                            prompt2:"请选择使用一张牌，否则失去一点体力",
                            filterCard:function(card,player){
                                return list.contains(card);
                            },
                            position:'h',
                            filterTarget:function(card,player,target){
                                return targets[0].canUse(card,target,true);
                            },
                            ai2:function(){
                                return get.effect_use.apply(this,arguments)+0.01;
                            },
                        });
                        'step 1'
                        if(!result.bool) targets[0].loseHp();
                    },
                    ai:{
                        order:10,
                        result:{
                            target:function(player,target){
                                if(!target.countCards('h')) return 0;
                                return -1;
                            },
                        },
                    },
                },
                Diuse_DIY_Zhengtong:{
                    trigger:{player:"damageAfter"},
                    filter:function(event,player){
                        return game.countPlayer(function(current){
                            return current!=player&&current.group=='wei'&&current.countCards('h');
                        })&&game.hasPlayer(function(current){
                            return current!=player&&current.group=='wei'&&current.countCards('h');
                        });
                    },
                    check:function(event,player,target){
                        return true;
                    },
                    content:function(){
                        'step 0'
                        player.chooseTarget(1,'选择一个魏势力角色',function(event,player,target){
                            return target!=player&&target.group=='wei'&&target.countCards('h');
                        }).set('ai',function(){
                            return true;
                        });
                        'step 1'
                        if(result.bool){
                            event.tar=result.targets[0];
                        } else event.finish();
                        'step 2'
                        if(event.cardNum==undefined) event.cardNum=1;
                        if(event.cardNum<=0){event.cardNum=1;}else if(event.cardNum>event.tar.countCards('h')){event.cardNum=event.tar.countCards('h')}
                        if(event.tar.countCards('he')>=11){
                            player.chooseControl('最大','+1','+5','+10','-1','-5','-10','一半','确定').set('prompt','请选择令'+get.translation(event.tar)+'交给你'+event.cardNum+'张牌').set('ai',function(){
                                return '一半';
                            });
                        } else if(event.tar.countCards('he')>=6){
                            player.chooseControl('最大','+1','+5','-1','-5','一半','确定').set('prompt','请选择令'+get.translation(event.tar)+'交给你'+event.cardNum+'张牌').set('ai',function(){
                                return '一半';
                            });
                        } else {
                            player.chooseControl('最大','+1','-1','一半','确定').set('prompt','请选择令'+get.translation(event.tar)+'交给你'+event.cardNum+'张牌').set('ai',function(){
                                return '一半';
                            });
                        }
                        'step 3'
                        switch(result.control){
                            case '最大':{
                                event.cardNum=event.tar.countCards('h');
                                event.tar.chooseCard('he','请交给'+get.translation(player)+event.cardNum+'张牌',event.cardNum,true).set('ai',function(card){
                                    return 7-get.value(card);
                                });
                                break;
                            }
                            case '一半':{
                                event.cardNum=parseInt(event.tar.countCards('h')/2);
                                event.tar.chooseCard('he','请交给'+get.translation(player)+event.cardNum+'张牌',event.cardNum,true).set('ai',function(card){
                                    return 7-get.value(card);
                                });
                                break;
                            }
                            case '确定':{
                                event.tar.chooseCard('he','请交给'+get.translation(player)+event.cardNum+'张牌',event.cardNum,true).set('ai',function(card){
                                    return 7-get.value(card);
                                });
                                break;
                            }
                            case '-1':{
                                event.cardNum--;
                                event.goto(2);
                                break;
                            }
                            case '-5':{
                                event.cardNum-=5;
                                event.goto(2);
                                break;
                            }
                            case '-10':{
                                event.cardNum-=10;
                                event.goto(2);
                                break;
                            }
                            case '+1':{
                                event.cardNum++;
                                event.goto(2);
                                break;
                            }
                            case '+5':{
                                event.cardNum+=5;
                                event.goto(2);
                                break;
                            }
                            case '+10':{
                                event.cardNum+=10;
                                event.goto(2);
                                break;
                            }
                            default:{
                                event.finish();
                                break;
                            }
                        }
                        'step 4'
                        if(result.bool){
                            event.tar.give(result.cards,player);
                            event.tar.draw(result.cards.length);
                            event.finish();
                        } else event.finish();
                    },
                },
                Diuse_DIY_Baifu:{
                    audio:"ext:术樱:2",
                    trigger:{player:"phaseZhunbeiBegin"},
                    limited:true,
                    unique:true,
                    skillAnimation:true,
                    animationColor:"gray",
                    init:function(player){
                        player.storage.Diuse_DIY_Baifu=false;
                    },  
                    filter:function(event,player){
                        if(!player.storage.Diuse_DIY_Baifu) return true;
                        return false;
                    },             
                    filterTarget:function(event,player,target){return target!=player},
                    content:function(){
                        'step 0'
                        player.chooseTarget(true,get.prompt2('Diuse_DIY_Baifu'),function(event,player,target){
                            return player!=target&&target.hasSex('male');
                        }).set('ai',function(target){
                            return get.attitude(_status.event.player,target)<=0;
                        });
                        'step 1'
                        if(result.bool){
                            player.awakenSkill('Diuse_DIY_Baifu');
                            player.storage.Diuse_DIY_Baifu=true;
                            result.targets[0].addSkill('Diuse_DIY_Fuci');
                            player.addSkill('Diuse_DIY_Baifu_Buff');
                        }
                    },
                },
                Diuse_DIY_Baifu_Buff:{}, //用于判断父慈技能
                Diuse_DIY_Fuci:{
                    mark:true,
                    marktext:"父",
                    intro:{
                        content:"吾儿奉先",
                    },
                    trigger:{player:"phaseZhunbeiBegin"},
                    forced:true,
                    filter:function(event,player){
                        return player.countCards('h')>0&&game.hasPlayer(function(current){
                            return current!=player&&current.hasSkill('Diuse_DIY_Baifu_Buff');
                        });
                    },
                    content:function(){
                        'step 0'
                        var targets=game.filterPlayer(function(current){
                            return current!=player&&current.hasSkill('Diuse_DIY_Baifu_Buff');
                        });
                        if(targets.length==1){
                            event.target=targets[0];
                            player.chooseCard('h',[1,Infinity],true,'父慈：将任意张手牌交给'+get.translation(targets)).set('ai',function(card){
                                return 8-get.value(card);
                            });
                        }
                        else player.chooseCardTarget({
                            prompt:'父慈：将任意张手牌交给'+get.translation(targets)+'中的一名角色',
                            filterCard:true,
                            position:'h',
                            targets:targets,
                            forced:true,
                            filterTarget:function(card,player,target){
                                return _status.event.targets.contains(target);
                            },
                            ai:function(card){
                                return 8-get.value(card);
                            },
                        });
                        'step 1'
                        if(result.bool){
                            if(!target) target=result.targets[0];
                            event.tar=target;
                            player.line(target);
                            target.gain(result.cards,player,'giveAuto');
                            if(result.cards.length>=2){
                                event.bool=true;
                            } 
                        }
                        'step 2'
                        if(event.bool){
                            var targets=event.tar
                            player.chooseTarget('请选择一名角色，视为义子：'+get.translation(targets)+'对其使用【决斗】',function(event,player,target){
                                return target!=targets;
                            }).set('ai',function(target){
                                return get.attitude(_status.event.player,target)<=0;
                            });
                        } else { event.finish(); }
                        'step 3'
                        if(result.bool){
                            event.tar.useCard({name:'juedou',isCard:true},result.targets[0],'noai').animate=false;
                            game.delay(0.5);
                        }
                    },
                },
                Diuse_DIY_Zixiao:{
                    audio:"ext:术樱:1",
                    trigger:{source:"damageBegin"},
                    forced:true,
                    filter:function(event,player,target){
                        if(!event.player.hasSkill('Diuse_DIY_Fuci')) return false;
                        return event.card&&event.card.name=='sha'||event.card.name=='juedou';
                    },
                    content:function(){
                        trigger.num++;
                    },
                    group:["Diuse_DIY_Zixiao_Filter","Diuse_DIY_Zixiao_Buff"],
                    subSkill:{
                        Filter:{
                            trigger:{global:"dying"},
                            forced:true,
                            popup:false,
                            sub:true,
                            filter:function(event,player){
                                if(player.storage.Diuse_DIY_Zixiao_Buff==undefined) player.storage.Diuse_DIY_Zixiao_Buff=[];
                                return event.player!=player&&event.player.hasSkill('Diuse_DIY_Fuci');
                            },
                            content:function(){
                                player.storage.Diuse_DIY_Zixiao_Buff.push(trigger.player);
                            },
                        },
                        Buff:{
                            audio:"Diuse_DIY_Zixiao",
                            trigger:{source:"die"},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                if(player.storage.Diuse_DIY_Zixiao_Buff==undefined) player.storage.Diuse_DIY_Zixiao_Buff=[];
                                return player.storage.Diuse_DIY_Zixiao_Buff.contains(event.player);
                            },
                            content:function(){
                                player.gainMaxHp();
                                player.recover();
                                player.restoreSkill('Diuse_DIY_Baifu');
                                player.storage.Diuse_DIY_Zixiao_Buff=[];
                            },
                        },
                    },
                },
                Diuse_DIY_Suzheng:{
                    enable:"phaseUse",
                    usable:1,
                    position:'h',
                    selectCard:1,
                    filterCard:function(card){
                        return get.suit(card)=='heart'||get.suit(card)=='spade';
                    },
                    filter:function(event,player){
                        return player.getEquip(1);
                    },
                    filterTarget:function(event,player,target){
                        var suit=get.suit(ui.selected.cards[0]);
                        if(suit=='heart'){
                            return target!=player&&player.inRange(target);
                        } else {
                            return target!=player&&!player.inRange(target);
                        }
                    },
                    content:function(){
                        targets[0].damage();
                    },
                    ai:{
                        order:10,
                        result:{
                            player:function(player,target){
                                if(get.attitude(player,target)>0) return -1;
                                return 1;
                            },
                        }
                    },
                },
                Diuse_DIY_Zhangbing:{
                    trigger:{player:"phaseDrawBegin"},
                    forced:true,
                    filter:function(event,player){
                        return player.Diuse_isMinAttackRange();
                    },
                    content:function(){
                        trigger.num++;
                    },
                    group:"Diuse_DIY_Zhangbing_Buff",
                    subSkill:{
                        Buff:{
                            trigger:{source:"damageBegin"},
                            forced:true,
                            filter:function(event,player){
                                return player.Diuse_isMaxAttackRange();
                            },
                            content:function(){
                                trigger.num++;
                            },
                        },
                    },
                },
                Diuse_DIY_Shichou:{
                    trigger:{target:"useCardToBefore"},
                    forced:true,
                    filter:function(event,player,target){
                        return event.card&&get.color(event.card)=='red';
                    },
                    content:function(){
                        trigger.cancel();
                    },
                    ai:{
                        effect:{
                            target:function(card,player,target,current){
                                if(get.color(card)=='red') return 'zeroplayertarget';
                            }
                        }
                    }
                },
                Diuse_DIY_Yonglie:{
                    trigger:{player:"useCardToPlayered"},
                    frequent:true,
                    init:function(player){
                        player.storage.Diuse_DIY_Yonglie=[];
                    },
                    filter:function(event,player){
                        if(!event.targets) return false;
                        if(!event.isFirstTarget) return false;
                        if(get.color(event.card)!='black'||player==event.targets) return false;
                        return true;
                    },
                    content:function(){
                        'step 0'
                        var list=[];
                        player.storage.Diuse_DIY_Yonglie.add(trigger.card);
                        for(var i=0;i<trigger.targets.length;i++){
                            trigger.targets[i].countCards('e',function(card){
                                if(get.color(card)=='black'){
                                    list.add(trigger.targets[i]);
                                }
                            });
                        }

                        if(list.length){
                            player.chooseTarget('请选择想要弃置的一名角色',function(event,player,target){
                                return target!=player&&list.contains(target);
                            }).set('ai',function(event,player,target){
                                return get.attitude(_status.event.player,target)<=0;
                            });
                        } else {
                            event.finish();
                        }
                        'step 1'
                        if(result.bool){
                            player.discardPlayerCard(result.targets[0],true,'e').set('filterButton',function(card){
                                return get.color(card)=='black';
                            });
                        }
                    },
                    group:['Diuse_DIY_Yonglie_End','Diuse_DIY_Yonglie_Damage'],
                    subSkill:{
                        End:{
                            trigger:{player:'useCardAfter'},
                            silent:true,
                            sub:true,
                            filter:function(event,player){
                                return player.storage.Diuse_DIY_Yonglie;
                            },
                            content:function(){
                                player.storage.Diuse_DIY_Yonglie.remove(trigger.card);
                            },
                        },
                        Damage:{
                            trigger:{source:'damageAfter'},
                            sub:true,
                            forced:true,
                            filter:function(event,player){
                                return event.card&&player.storage.Diuse_DIY_Yonglie.contains(event.card);
                            },
                            content:function(){
                                var card=get.cardPile2(function(card){
                                    return get.color(card,false)=='red';
                                });
                                if(card) player.gain(card,'gain2');
                                game.updateRoundNumber();
                            },
                        },
                    },
                },
                Diuse_DIY_Kuiye:{
                    trigger:{target:"useCardToTargeted"},
                    forced:true,
                    check:function(event,player){
                        var cards=player.getCards('h');
                        if(cards.length<=2){
                            for(var i=0;i<cards.length;i++){
                                if(cards[i].name=='shan'||cards[i].name=='tao') return false;
                            }
                        }
                        return true;
                    },
                    filter:function(event,player){
                        if(!player.countCards('he')) return false;
                        if(get.tag(event.card,'damage')) return true;
                        return false;
                    },
                    content:function(){
                        'step 0'
                        player.chooseCard([1,2],'he','重铸至多两张牌并展示，若你以此法获得了两张牌且类型不同，你弃置其一').set('ai',function(card){
                            return 10-get.value(card);
                        });
                        'step 1'
                        if(result.bool){
                            player.loseToDiscardpile(result.cards);
                            player.draw(result.cards.length);
                        }
                    },
                    ai:{
                        effect:{
                            target:function(card,player,target,current){
                                if(get.tag(card,'damage')) return [1,0.5];
                            },
                        },
                    },
                    group:['Diuse_DIY_Kuiye_Gain'],
                    subSkill:{
                        Gain:{
                            trigger:{player:"gainAfter"},
                            forced:true,
                            popup:false,
                            audio:false,
                            sub:true,
                            filter:function (event,player){
                                return event.getParent().name=='draw'&&event.getParent(2).name=='Diuse_DIY_Kuiye';
                            },
                            content:function(){
                                'step 0'
                                event.bool=false
                                player.showCards(trigger.cards);
                                if(trigger.cards.length>=2){
                                    for(var i=0;i<trigger.cards.length;i++){
                                        for(var j=0;j<i;j++){
                                            if(get.type(trigger.cards[i])!=get.type(trigger.cards[j])){
                                                event.bool=true;
                                                break;
                                            } 
                                        }
                                        if(event.bool) break;
                                    }
                                }
                                'step 1'
                                if(event.bool){
                                    player.chooseToDiscard(true,'h',function(card){
                                        return trigger.cards.contains(card);
                                    }).set('ai',function(card){
                                        return 10-get.value(card);
                                    });
                                } else {event.finish();}
                            },
                        },
                    },
                },
                Diuse_DIY_Sucai:{
                    marktext:"夙",
                    mark:true,
                    locked:true,
                    intro:{
                        content:function(event,player){
                            var num=player.countMark('Diuse_DIY_Sucai');
                            if(num==undefined) num=0;
                            return "共有"+num+'个标记';
                        }
                    },
                    trigger:{player:"gainAfter"},
                    forced:true,
                    firstDo:true,
                    filter:function(event,player){
                        if(event.parent.parent.name=='phaseDraw') return false;
                        if(event.getParent(2).name=='Diuse_DIY_Sucai') return false;
                        return true;
                    },
                    content:function(){
                        player.addMark('Diuse_DIY_Sucai');
                        player.draw();
                        if(player.countMark('Diuse_DIY_Sucai')==13){
                            player.gainMaxHp();
                            player.loseHp();
                            player.removeSkill('Diuse_DIY_Sucai');
                        }
                    },
                },
                Diuse_DIY_Kuidi:{
                    trigger:{player:"damageBegin3"},
                    zhuSkill:true,
                    unique:true,
                    init:function(player){
                        player.storage.Diuse_DIY_Kuidi=[];
                    },
                    filter:function(event,player){
                        if(!player.hasZhuSkill('Diuse_DIY_Kuidi')) return false;
                        return game.countPlayer(function(current){
                            return current!=player&&current.group=='wei'&&!player.storage.Diuse_DIY_Kuidi.contains(current);
                        })&&game.hasPlayer(function(current){
                            return current!=player&&current.group=='wei'&&!player.storage.Diuse_DIY_Kuidi.contains(current);;
                        });
                    },
                    content:function(){
                        'step 0'
                        event.list=[];
                        game.hasPlayer(function(current){if(current!=player&&current.group=='wei'&&!player.storage.Diuse_DIY_Kuidi.contains(current)) event.list.add(current);});
                        'step 1'
                        if(event.list.length){
                            event.list[0].chooseBool('是否为'+get.translation(player)+'抵挡这次伤害').set('ai',function(event,target){
                                return get.attitude(_status.event.player,player)>0;
                            });
                        } else { event.finish(); }
                        'step 2'
                        if(result.bool){
                            player.storage.Diuse_DIY_Kuidi.add(event.list[0]);
                            trigger.player=event.list[0];
                            event.list[0].line(player);
                            trigger.player.addSkill('Diuse_DIY_Kuidi_Buff');
                            trigger.player.storage.Diuse_DIY_Kuidi_Buff=player;
                            event.finish();
                        } else {
                            event.list.shift();
                            event.goto(1);
                        }
                    }
                },
                Diuse_DIY_Kuidi_Buff:{
                    trigger:{player:['damageAfter','damageCancelled','damageZero']},
                    forced:true,
                    popup:false,
                    audio:false,
                    vanish:true,
                    charlotte:true,
                    content:function(){
                        var num=trigger.num;
                        if(num){
                            player.draw(num);
                            player.storage.Diuse_DIY_Kuidi_Buff.draw(num);
                        } 
                        player.removeSkill('Diuse_DIY_Kuidi_Buff');
                        player.storage.Diuse_DIY_Kuidi_Buff=[];
                    }
                },
                Diuse_DIY_Zhuhai:{
                    audio:"ext:术樱:2",
                    trigger:{global:'phaseJieshuBegin'},
                    direct:true,
                    check:function(event,player){
                        return get.attitude(player,event.player)<0;
                    },
                    filter:function(event,player){
                        return player!=event.player&&event.player.isAlive()&&event.player.getStat('damage')&&(lib.filter.targetEnabled({name:'sha'},player,event.player)||event.player.countCards('hej')>=1);
                    },
                    content:function(){
                        'step 0'
                        player.chooseControl('杀','过河拆桥','cancel').set('prompt','请选择对'+get.translation(trigger.player)+'使用一张').set('ai',function(event,player,target){
                            if(get.attitude(_status.event.player,trigger.player)>0) return 'cancel';
                            if(trigger.player.getEquip(2)||trigger.player.getEquip(3)&&lib.filter.targetEnabled({name:'guohe'},player,trigger.player)) return '过河拆桥';
                            return '杀';
                        });
                        'step 1'
                        if(result.control=='杀'){
                            player.useCard({name:'sha',isCard:true},trigger.player,'noai');
                        } else if(result.control=='过河拆桥') {
                            player.useCard({name:'guohe',isCard:true},trigger.player,'noai');
                        }
                    }
                },
                Diuse_DIY_Qianxin:{
                    audio:"ext:术樱:2",
                    skillAnimation:true,
                    animationColor:'orange',
                    unique:true,
                    juexingji:true,
                    trigger:{source:'damageSource'},
                    forced:true,
                    derivation:'Diuse_DIY_Jianyan',
                    filter:function(event,player){
                        return player.hp<player.maxHp;
                    },
                    content:function(){
                        player.awakenSkill('Diuse_DIY_Qianxin');
                        player.addSkill('Diuse_DIY_Jianyan');
                        player.loseMaxHp();
                    }
                },
                Diuse_DIY_Jianyan:{
                    audio:"ext:术樱:2",
                    enable:'phaseUse',
                    usable:2,
                    filter:function(event,player){
                        return game.hasPlayer((current)=>current.group=='key'||current.hasSex('male'));
                    },
                    content:function(){
                        "step 0"
                        if(player.hasSkill('Diuse_DIY_Jianyan_Color')){
                            player.chooseControl(['basic','trick','equip']).set('ai',function(){
                                var player=_status.event.player;
                                if(!player.hasShan()) return 'basic';
                                if(player.countCards('e')<=1) return 'equip';
                                if(player.countCards('h')>2) return 'trick';
                                return 'basic';
                            });
                        } else if(player.hasSkill('Diuse_DIY_Jianyan_Type')) {
                            player.chooseControl(['red','black']).set('ai',function(){
                                var player=_status.event.player;
                                return 'red';
                            });
                        } else {
                            player.chooseControl(['red','black','basic','trick','equip']).set('ai',function(){
                                var player=_status.event.player;
                                if(!player.hasShan()) return 'basic';
                                if(player.countCards('e')<=1) return 'equip';
                                if(player.countCards('h')>2) return 'trick';
                                return 'red';
                            });
                        }
                        "step 1"
                        if(result.control=='red'||result.control=='black'){
                            player.addTempSkill('Diuse_DIY_Jianyan_Color','phaseUseEnd');
                        } else {
                            player.addTempSkill('Diuse_DIY_Jianyan_Type','phaseUseEnd');
                        }
                        event.card=get.cardPile(function(card){
                            if(get.color(card)==result.control) return true;
                            if(get.type(card,'trick')==result.control) return true;
                            return false;
                        },'cardPile');
                        "step 2"
                        if(!event.card){
                            game.Diuse_cardsNumberUpDate();
                            event.goto(1);
                        }
                        player.showCards([event.card]);
                        "step 3"
                        player.chooseTarget(true,'选择一名男性角色送出'+get.translation(event.card),function(card,player,target){
                            return target.hasSex('male');
                        }).set('ai',function(target){
                            var att=get.attitude(_status.event.player,target);
                            if(_status.event.neg) return -att;
                            return att;
                        }).set('neg',get.value(event.card,player,'raw')<0);
                        "step 4"
                        player.line(result.targets,'green');
                        result.targets[0].gain(event.card,'gain2');
                    },
                    subSkill:{
                        Color:{
                            sub:true,
                        },
                        Type:{
                            sub:true,
                        },
                    },
                    ai:{
                        order:9,
                        result:{
                            player:function(player){
                                if(game.hasPlayer(function(current){
                                    return current.hasSex('male')&&get.attitude(player,current)>0;
                                })) return 2;
                                return 0;
                            },
                        },
                        threaten:1.2
                    },
                },
                Diuse_Rende:{
                    audio:'rende',
                    enable:'phaseUse',
                    filterCard:true,
                    selectCard:[1,Infinity],
                    discard:false,
                    lose:false,
                    delay:false,
                    filterTarget:function(card,player,target){
                        if(player.storage.Diuse_Rende2&&player.storage.Diuse_Rende2.contains(target)) return false;
                        return player!=target;
                    },
                    onremove:['Diuse_Rende','Diuse_Rende2'],
                    check:function(card){
                        if(ui.selected.cards.length&&ui.selected.cards[0].name=='du') return 0;
                        if(!ui.selected.cards.length&&card.name=='du') return 20;
                        var player=get.owner(card);
                        if(ui.selected.cards.length>=Math.max(2,player.countCards('h')-player.hp)) return 0;
                        if(player.hp==player.maxHp||player.storage.Diuse_Rende<0||player.countCards('h')<=1){
                            var players=game.filterPlayer();
                            for(var i=0;i<players.length;i++){
                                if(players[i].hasSkill('haoshi')&&
                                    !players[i].isTurnedOver()&&
                                    !players[i].hasJudge('lebu')&&
                                    get.attitude(player,players[i])>=3&&
                                    get.attitude(players[i],player)>=3){
                                    return 11-get.value(card);
                                }
                            }
                            if(player.countCards('h')>player.hp) return 10-get.value(card);
                            if(player.countCards('h')>2) return 6-get.value(card);
                            return -1;
                        }
                        return 10-get.value(card);
                    },
                    content:function(){
                        'step 0'
                        var evt=_status.event.getParent('phaseUse');
                        if(evt&&evt.name=='phaseUse'&&!evt.Diuse_Rende){
                            var next=game.createEvent('Diuse_Rende_clear');
                            _status.event.next.remove(next);
                            evt.after.push(next);
                            evt.Diuse_Rende=true;
                            next.player=player;
                            next.setContent(lib.skill.Diuse_Rende1.content);
                        }
                        if(!Array.isArray(player.storage.Diuse_Rende2)){
                            player.storage.Diuse_Rende2=[];
                        }
                        player.storage.Diuse_Rende2.push(target);
                        target.gain(cards,player,'giveAuto');
                        event.tar=target;
                        if(typeof player.storage.Diuse_Rende!='number'){
                            player.storage.Diuse_Rende=0;
                        }
                        if(player.storage.Diuse_Rende>=0){
                            player.storage.Diuse_Rende+=cards.length;
                            if(player.storage.Diuse_Rende>=2){
                                var list=[];
                                if(lib.filter.cardUsable({name:'sha'},player,event.getParent('chooseToUse'))&&game.hasPlayer(function(current){
                                    return player.canUse('sha',current);
                                })){
                                    list.push(['基本','','sha']);
                                }
                                for(var i of lib.inpile_nature){
                                 if(lib.filter.cardUsable({name:'sha',nature:i},player,event.getParent('chooseToUse'))&&game.hasPlayer(function(current){
                                            return player.canUse({name:'sha',nature:i},current);
                                        })){
                                        list.push(['基本','','sha',i]);
                                    }
                                }
                                if(lib.filter.cardUsable({name:'tao'},player,event.getParent('chooseToUse'))&&game.hasPlayer(function(current){
                                    return player.canUse('tao',current);
                                })){
                                    list.push(['基本','','tao']);
                                }
                                if(lib.filter.cardUsable({name:'jiu'},player,event.getParent('chooseToUse'))&&game.hasPlayer(function(current){
                                    return player.canUse('jiu',current);
                                })){
                                    list.push(['基本','','jiu']);
                                }
                                if(list.length){
                                    player.chooseButton(['是否视为使用一张基本牌？',[list,'vcard']]).set('ai',function(button){
                                        var player=_status.event.player;
                                        var card={name:button.link[2],nature:button.link[3]};
                                        if(card.name=='tao'){
                                            if(player.hp==1||(player.hp==2&&!player.hasShan())||player.needsToDiscard()){
                                                return 5;
                                            }
                                            return 1;
                                        }
                                        if(card.name=='sha'){
                                            if(game.hasPlayer(function(current){
                                                return player.canUse(card,current)&&get.effect(current,card,player,player)>0
                                            })){
                                                if(card.nature=='fire') return 2.95;
                                                if(card.nature=='thunder'||card.nature=='ice') return 2.92;
                                                return 2.9;
                                            }
                                            return 0;
                                        }
                                        if(card.name=='jiu'){
                                            return 0.5;
                                        }
                                        return 0;
                                    });
                                }
                                else{
                                    event.finish();
                                }
                                player.storage.Diuse_Rende=-1;
                            }
                            else{
                                event.finish();
                            }
                        }
                        else{
                            event.finish();
                        }
                        'step 1'
                        if(result&&result.bool&&result.links[0]){
                            event.card={name:result.links[0][2],nature:result.links[0][3]};
                            player.chooseBool('确定是否你视为使用'+get.translation(event.card)+'取消则改为'+get.translation(event.tar)+'使用').set('ai',function(){
                                if(player.hp<=2&&event.card.name=='tao') return true;
                                if(event.card.name=='jiu') return true;
                                if(get.attitude(_status.event.player,event.tar)>0&&game.hasPlayer(function(target){
                                    if(target!=event.tar&&event.tar.canUse('sha',target)){
                                        return get.attitude(event.tar,target)<=0
                                    }
                                })) return false;
                                return get.attitude(_status.event.player,event.tar)<=0;
                            });
                        } else {
                            event.finish();
                        }
                        'step 2'
                        if(result&&result.bool){
                            player.chooseUseTarget(event.card,true);
                        } else {
                            event.tar.chooseUseTarget(event.card,true);
                        }
                        event.finish();
                    },
                    ai:{
                        fireAttack:true,
                        order:function(skill,player){
                            if(player.hp<player.maxHp&&player.storage.Diuse_Rende<2&&player.countCards('h')>1){
                                return 10;
                            }
                            return 4;
                        },
                        result:{
                            target:function(player,target){
                                if(target.hasSkillTag('nogain')) return 0;
                                if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
                                    if(target.hasSkillTag('nodu')) return 0;
                                    return -10;
                                }
                                if(target.hasJudge('lebu')) return 0;
                                var nh=target.countCards('h');
                                var np=player.countCards('h');
                                if(player.hp==player.maxHp||player.storage.Diuse_Rende<0||player.countCards('h')<=1){
                                    if(nh>=np-1&&np<=player.hp&&!target.hasSkill('haoshi')) return 0;
                                }
                                return Math.max(1,5-nh);
                            }
                        },
                        effect:{
                            target:function(card,player,target){
                                if(player==target&&get.type(card)=='equip'){
                                    if(player.countCards('e',{subtype:get.subtype(card)})){
                                        if(game.hasPlayer(function(current){
                                            return current!=player&&get.attitude(player,current)>0;
                                        })){
                                            return 0;
                                        }
                                    }
                                }
                            }
                        },
                        threaten:0.8
                    }
                },
                Diuse_Rende1:{
                    trigger:{player:'phaseUseBegin'},
                    silent:true,
                    content:function(){
                        player.storage.Diuse_Rende=0;
                        player.storage.Diuse_Rende2=[];
                    }
                },
                Diuse_Jijiang:{
                    audio:'jijiang1',
                    unique:true,
                    group:['Diuse_Jijiang1'],
                    filter:function(event,player){
                        if(!player.hasSkill('Diuse_Jijiang')||!game.hasPlayer(function(current){
                            return current!=player&&current.group=='shu';
                        })) return false;
                        return !event.jijiang&&(event.type!='phase'||!player.hasSkill('jijiang3'));
                    },
                    enable:['chooseToUse','chooseToRespond'],
                    viewAs:{name:'sha'},
                    filterCard:function(){return false},
                    selectCard:-1,
                    ai:{
                        order:function(){
                            return get.order({name:'sha'})+0.3;
                        },
                        respondSha:true,
                        skillTagFilter:function(player){
                            if(!player.hasSkill('Diuse_Jijiang')||!game.hasPlayer(function(current){
                                return current!=player&&current.group=='shu';
                            })) return false;
                        },
                    },
                },
                Diuse_Jijiang1:{
                    audio:'jijiang1',
                    trigger:{player:['useCardBegin','respondBegin']},
                    logTarget:'targets',
                    filter:function(event,player){
                        return event.skill=='Diuse_Jijiang';
                    },
                    forced:true,
                    content:function(){
                        "step 0"
                        delete trigger.skill;
                        trigger.getParent().set('jijiang',true);
                        "step 1"
                        if(event.current==undefined) event.current=player.next;
                        if(event.current==player){
                            player.addTempSkill('jijiang3');
                            event.finish();
                            trigger.cancel();
                            trigger.getParent().goto(0);
                        }
                        else if(event.current.group=='shu'){
                            var next=event.current.chooseToRespond('是否替'+get.translation(player)+'打出一张杀？',{name:'sha'});
                            next.set('ai',function(){
                                var event=_status.event;
                                return (get.attitude(event.player,event.source)-2);
                            });
                            next.set('source',player);
                            next.set('Diuse_Jijiang',true);
                            next.set('skillwarn','替'+get.translation(player)+'打出一张杀');
                            next.noOrdering=true;
                            next.autochoose=lib.filter.autoRespondSha;
                        }
                        else{
                            event.current=event.current.next;
                            event.redo();
                        }
                        "step 2"
                        if(result.bool){
                            event.finish();
                            trigger.card=result.card;
                            trigger.cards=result.cards;
                            trigger.throw=false;
                            if(typeof event.current.ai.shown=='number'&&event.current.ai.shown<0.95){
                                event.current.ai.shown+=0.3;
                                if(event.current.ai.shown>0.95) event.current.ai.shown=0.95;
                            }
                            if(!event.current.countCards('h',function(card){
                                return get.tag(card,'damage');
                            })){
                                event.current.draw(2);
                            } else {
                                event.current.draw();
                            }
                        }
                        else{
                            event.current=event.current.next;
                            event.goto(1);
                        }
                    }
                },
                Diuse_Jianxiong:{
                    audio:"rejianxiong",
                    trigger:{
                        player:"damageEnd",
                    },
                    content:function(){
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
                    group:"Diuse_Jianxiong_Buff",
                    subSkill:{
                        Buff:{
                            trigger:{player:"Diuse_JianxiongAfter"},
                            popup:false,
                            frequent:true,
                            filter:function(event,player){
                                return true;
                            },
                            content:function(){
                                'step 0'
                                var hs=player.getCards('h');
                                var list=[];
                                for(var i=0;i<hs.length;i++){
                                    var chosen=hs[i];
                                    if(player.hasUseTarget(chosen)&&!get.info(chosen).multitarget){
                                        var ls=game.filterPlayer(function(current){
                                            return lib.filter.targetEnabled2(chosen,player,current);
                                        });
                                        if(ls.length){
                                            list.push(hs[i]);
                                        }
                                    }
                                }
                                player.chooseToUse({
                                    prompt:get.prompt('Diuse_Jianxiong'),
                                    prompt2:"请选择使用一张牌",
                                    filterCard:function(card,player){
                                        return list.contains(card);
                                    },
                                    position:'h',
                                    filterTarget:function(card,player,target){
                                        return player.canUse(card,target,true);
                                    },
                                    ai2:function(){
                                        return get.effect_use.apply(this,arguments)+0.01;
                                    },
                                });
                            },
                        },
                    }
                },
                Diuse_Hujia:{
                    audio:'hujia',
                    unique:true,
                    trigger:{player:['chooseToRespondBefore','chooseToUseBefore']},
                    filter:function(event,player){
                        if(event.responded) return false;
                        if(player.storage.hujiaing) return false;
                        if(!event.filterCard({name:'shan'},player,event)) return false;
                        return game.hasPlayer(function(current){
                            return current!=player&&current.group=='wei';
                        });
                    },
                    check:function(event,player){
                        if(get.damageEffect(player,event.player,player)>=0) return false;
                        return true;
                    },
                    content:function(){
                        "step 0"
                        if(event.current==undefined) event.current=player.next;
                        if(event.current==player){
                            event.finish();
                        }
                        else if(event.current.group=='wei'){
                            if((event.current==game.me&&!_status.auto)||(
                                get.attitude(event.current,player)>2)||
                                event.current.isOnline()){
                                player.storage.hujiaing=true;
                                var next=event.current.chooseToRespond('是否替'+get.translation(player)+'打出一张闪？',{name:'shan'});
                                next.set('ai',function(){
                                    var event=_status.event;
                                    return (get.attitude(event.player,event.source)-2);
                                });
                                next.set('skillwarn','替'+get.translation(player)+'打出一张闪');
                                next.autochoose=lib.filter.autoRespondShan;
                                next.set('source',player);
                            }
                        }
                        "step 1"
                        player.storage.hujiaing=false;
                        if(result.bool){
                            event.finish();
                            trigger.result={bool:true,card:{name:'shan',isCard:true}};
                            trigger.responded=true;
                            trigger.animate=false;
                            if(typeof event.current.ai.shown=='number'&&event.current.ai.shown<0.95){
                                event.current.ai.shown+=0.3;
                                if(event.current.ai.shown>0.95) event.current.ai.shown=0.95;
                            }
                            game.asyncDraw([event.current,player]);
                        }
                        else{
                            event.current=event.current.next;
                            event.goto(0);
                        }
                    },
                    ai:{
                        respondShan:true,
                        skillTagFilter:function(player){
                            if(player.storage.hujiaing) return false;
                            return game.hasPlayer(function(current){
                                return current!=player&&current.group=='wei';
                            });
                        },
                    },
                },
                Diuse_Zhiheng:{
                    audio:'rezhiheng',
                    enable:'phaseUse',
                    usable:1,
                    position:'he',
                    filterCard:lib.filter.cardDiscardable,
                    discard:false,
                    lose:false,
                    delay:false,
                    selectCard:[1,Infinity],
                    check:function(card){
                        var player=_status.event.player;
                        if(get.position(card)=='h'&&!player.countCards('h','du')&&(player.hp>2||!player.countCards('h',function(card){
                            return get.value(card)>=8;
                        }))){
                            return 1;
                        }
                        return 6-get.value(card)
                    },
                    content:function(){
                        'step 0'
                        player.discard(cards);
                        event.num=1;
                        var hs=player.getCards('h');
                        if(!hs.length) event.num=0;
                        for(var i=0;i<hs.length;i++){
                            if(!cards.contains(hs[i])){
                                event.num=0;break;
                            }
                        }
                        'step 1'
                        player.draw(event.num+cards.length);
                    },
                    group:"Diuse_Zhiheng_Discard",
                    subSkill:{
                        Discard:{
                            trigger:{player:'loseAfter'},
                            sub:true,
                            direct:true,
                            filter:function(event,player){
                                if(event.type!='discard') return false;
                                if(!game.hasPlayer(function(current){
                                    return current!=player&&current.group=='wu';
                                })) return false;
                                for(var i=0;i<event.cards2.length;i++){
                                    if(get.position(event.cards2[i])=='d'&&event.getParent(2).name=='Diuse_Zhiheng'){
                                        return true;
                                    }
                                }
                                return false;
                            },
                            content:function(){
                                'step 0'
                                event.list=[];
                                for(var i=0;i<trigger.cards2.length;i++){
                                    var bool=game.hasPlayer(function(target){
                                        if(get.position(trigger.cards2[i],true)=='d'&&player.canUse(trigger.cards2[i],target)){
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    });
                                    if(bool){
                                        event.list.push(trigger.cards2[i]);
                                    }
                                }
                                if(event.list.length>=1){
                                    player.chooseTarget(1,'选择一名吴势力角色并将牌给予其',function(event,player,target){
                                        return target!=player&&target.group=='wu';
                                    }).set('ai',function(target){
                                        return get.attitude(_status.event.player,target)>0;
                                    });
                                }
                                'step 1'
                                if(result.bool){
                                    player.line(result.targets[0]);
                                    result.targets[0].gain(event.list,'gain');
                                }
                            },
                        },
                    },
                },
                Diuse_Jiuyuan:{
                    audio:'rejiuyuan',
                    unique:true,
                    trigger:{
                        global:"taoBegin",
                    },
                    forced:true,
                    filter:function(event,player,target){
                        if(event.player.group!='wu') return false;
                        if(event.player==event.player) {
                            if(event.target!=event.player&&event.target.group=='wu') return true
                            return false;
                        }
                        return false;
                    },
                    content:function(){
                        trigger.baseDamage++;
                        game.asyncDraw([trigger.player,player]);
                    },
                },
                Diuse_Tianming:{
                    audio:'tianming',
                    trigger:{target:'useCardToTargeted'},
                    check:function(event,player){
                        var cards=player.getCards('h');
                        if(cards.length<=2){
                            for(var i=0;i<cards.length;i++){
                                if(cards[i].name=='shan'||cards[i].name=='tao') return false;
                            }
                        }
                        return true;
                    },
                    filter:function(event,player){
                        return event.card.name=='sha';
                    },
                    content:function(){
                        "step 0"
                        player.chooseToDiscard(2,true,'he');
                        player.draw(2);
                        var players=game.filterPlayer();
                        players.sort(function(a,b){
                            return b.hp-a.hp;                                                                                                                               
                        });
                        if(players[0].hp>players[1].hp&&players[0]!=player){
                            players[0].chooseBool(get.prompt2('Diuse_Tianming'));
                            event.player=players[0];
                        }
                        else{
                            event.finish();
                        }
                        "step 1"
                        if(result.bool){
                            player.chooseToDiscard(2,true,'he');
                            player.draw(2);
                        }
                    },
                    ai:{
                        effect:{
                            target:function(card,player,target,current){
                                if(card.name=='sha') return [1,0.5];
                            }
                        }
                    },
                    group:"Diuse_Tianming_Discard",
                    subSkill:{
                        Discard:{
                            trigger:{player:'loseAfter'},
                            usable:1,
                            sub:true,
                            direct:true,
                            filter:function(event,player){
                                if(event.type!='discard') return false;
                                for(var i=0;i<event.cards2.length;i++){
                                    var bool=game.hasPlayer(function(target){
                                        if(get.position(event.cards2[i],true)=='d'&&player.canUse(event.cards2[i],target)){
                                            return true;
                                        }
                                    });
                                    if(bool) return bool;
                                }
                                return false;
                            },
                            content:function(){
                                'step 0'
                                event.list=[];
                                for(var i=0;i<trigger.cards2.length;i++){
                                    var bool=game.hasPlayer(function(target){
                                        if(get.position(trigger.cards2[i],true)=='d'&&player.canUse(trigger.cards2[i],target)){
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    });
                                    if(bool){
                                        event.list.push(trigger.cards2[i]);
                                    }
                                }
                                if(event.list.length>=1){
                                    player.chooseTarget(1,'将牌给予一名其他角色',function(event,player,target){
                                        return target!=player;
                                    }).set('ai',function(target){
                                        return get.attitude(_status.event.player,target)>0;
                                    });
                                }
                                'step 1'
                                if(result.bool){
                                    player.line(result.targets[0]);
                                    result.targets[0].gain(event.list,'gain');
                                }
                            },
                        },
                    },
                },
                Diuse_Mizhao:{
                    enable:'phaseUse',
                    usable:1,
                    audio:'mizhao',
                    filter:function(event,player){
                        return player.countCards('h')>0;
                    },
                    filterCard:true,
                    selectCard:-1,
                    filterTarget:function(card,player,target){
                        return player!=target;
                    },
                    discard:false,
                    lose:false,
                    delay:false,
                    ai:{
                        order:1,
                        result:{
                            player:0,
                            target:function(player,target){
                                if(target.hasSkillTag('nogain')) return 0;
                                if(player.countCards('h')>1){
                                    return 1;
                                }
                                var players=game.filterPlayer();
                                for(var i=0;i<players.length;i++){
                                    if(players[i].countCards('h')&&players[i]!=target&&players[i]!=player&&get.attitude(player,players[i])<0){
                                        break;
                                    }
                                }
                                if(i==players.length){
                                    return 1;
                                }
                                return -2/(target.countCards('h')+1);
                            }
                        }
                    },
                    content:function(){
                        "step 0"
                        event.target1=targets[0];
                        targets[0].gain(cards,player,'giveAuto');
                        "step 1"
                        if(!targets[0].countCards('h')){
                            event.finish();
                            return;
                        }
                        var players=game.filterPlayer();
                        for(var i=0;i<players.length;i++){
                            if(players[i]!=event.target1&&players[i]!=player&&event.target1.canCompare(players[i])){
                                break;
                            }
                        }
                        if(i==players.length){
                            event.finish();
                        }
                        "step 2"
                        player.chooseTarget(true,'选择拼点目标',function(card,player,target){
                            return _status.event.target1.canCompare(target)&&target!=player;
                        }).set('ai',function(target){
                            var player=_status.event.player;
                            var eff=get.effect(target,{name:'sha'},_status.event.target1,player);
                            var att=get.attitude(player,target);
                            if(att>0){
                                return eff-10;
                            }
                            return eff;
                        }).set('target1',event.target1).set('forceDie',true);
                        "step 3"
                        if(result.targets.length){
                            event.target2=result.targets[0];
                            event.target1.line(event.target2);
                            event.target1.chooseToCompare(event.target2);
                        }
                        else{
                            event.finish();
                        }
                        "step 4"
                        if(!result.tie){
                            if(result.bool){
                                if(event.target1.canUse({name:'sha',isCard:true},event.target2,false)){
                                    var card=event.target2.getEquip(2);
                                    if(card){
                                        event.target2.gain(card,'gain');
                                    }
                                    event.target1.useCard({name:'sha',isCard:true},event.target2);
                                }
                            }
                            else if(event.target2.canUse({name:'sha',isCard:true},event.target1,false)){
                                var card=event.target1.getEquip(2);
                                if(card){
                                    event.target1.gain(card,'gain');
                                }
                                event.target2.useCard({name:'sha',isCard:true},event.target1);
                            }
                        }
                    }
                },
                Diuse_Yanyv:{
                    audio:'reyanyu',
                    enable:'phaseUse',
                    init:function(player){
                        player.storage.Diuse_Yanyv=false;
                    },
                    filter:function(event,player){
                        return player.countCards('h','sha')>0;
                    },
                    filterCard:{name:'sha'},
                    prepare:function(cards,player){
                        player.$throw(cards,1000);
                        game.log(player,'将',cards,'置入了弃牌堆');
                    },
                    discard:false,
                    loseTo:'discardPile',
                    visible:true,
                    delay:0.5,
                    content:function(){
                        player.draw();
                    },
                    ai:{
                        basic:{
                            order:1
                        },
                        result:{
                            player:function(player){
                                if(player.getStat().skill['Diuse_Yanyv']>=1) return false;
                                return true;
                            },
                        },
                    },
                    group:['Diuse_Yanyv_UseEnd','Diuse_Yanyv_Draw'],
                    subSkill:{
                        UseEnd:{
                            trigger:{player:'phaseUseEnd'},
                            direct:true,
                            filter:function(event,player){
                                return player.getHistory('lose',function(evt){
                                    var evt2=evt.getParent();
                                    return evt2.name=='useSkill'&&evt2.skill=='Diuse_Yanyv'&&evt.getParent(3)==event;
                                }).length>0;
                            },
                            content:function(){
                                'step 0'
                                event.num=Math.min(3,player.getHistory('lose',function(evt){
                                    var evt2=evt.getParent();
                                    return evt2.name=='useSkill'&&evt2.skill=='Diuse_Yanyv'&&evt.getParent(3)==trigger;
                                }).length);
                                player.chooseTarget(get.prompt('Diuse_Yanyv'),'令一名角色摸'+get.cnNumber(event.num)+'张牌',function(card,player,target){
                                    return target!=player;
                                }).set('ai',function(target){
                                    return get.attitude(_status.event.player,target);
                                });
                                'step 1'
                                if(result.bool){
                                    player.logSkill('Diuse_Yanyv',result.targets);
                                    if(event.num==1) player.storage.Diuse_Yanyv=true;
                                    result.targets[0].draw(event.num);
                                }
                            },
                        },
                        Draw:{
                            trigger:{global:"gainAfter"},
                            frequent:true,
                            sub:true,
                            filter:function (event,player){
                                if(event.getParent(2).name!='Diuse_Yanyv_UseEnd'||event.getParent().name!='draw') return false;
                                var bool=game.hasPlayer(function(target){
                                    if(player.canUse(event.cards[0],target)){
                                        return true;
                                    } else {
                                        return false;
                                    }
                                });
                                if(bool==false){
                                    player.storage.Diuse_Yanyv=false;
                                    return false;
                                }
                                return player.storage.Diuse_Yanyv;
                            },
                            content:function (){
                                trigger.player.chooseUseTarget(trigger.cards);
                                player.storage.Diuse_Yanyv=false;
                            },
                        },
                    },
                },
                Diuse_Qiaoshi:{
                    audio:'reqiaoshi',
                    trigger:{global:'phaseJieshuBegin'},
                    filter:function(event,player){
                        return event.player!=player&&event.player.countCards('h')==player.countCards('h')&&event.player.isAlive();
                    },
                    check:function(event,player){
                        return get.attitude(player,event.player)>=0;
                    },
                    //priority:-5,
                    logTarget:'player',
                    content:function(){
                        'step 0'
                        game.asyncDraw([trigger.player,player]);
                        'step 1'
                        game.delayx();
                        if(player.isIn()&&trigger.player.isIn()){
                            var playerGetGainCard=function(){
                                var last=player.getHistory('gain',function(evt){
                                    return evt.getParent(2)==event;
                                });
                                if(last.length){
                                    var evt=last.pop();
                                    if(evt.cards.length==1&&player.getCards('h').contains(evt.cards[0])){
                                        return evt.cards[0]
                                    } 
                                }
                            }
                            var getGainColor=function(player){
                                var last=player.getHistory('gain',function(evt){
                                    return evt.getParent(2)==event;
                                });
                                if(last.length){
                                    var evt=last.pop();
                                    if(evt.cards.length==1&&player.getCards('h').contains(evt.cards[0])){
                                        return get.color(evt.cards[0],player);
                                    } 
                                }
                                else return player;
                            }
                            if(getGainColor(player)==getGainColor(trigger.player)){
                                var cards=player.getCards('h',function(card){
                                    return card==playerGetGainCard();
                                })
                                if(cards){
                                    player.loseToSpecial(cards,'Diuse_Qiaoshi',player).visible=true;
                                    game.log(player,'将一张牌置于武将牌上');
                                } 
                                player.chooseBool('是否继续发动【樵拾】？','和'+get.translation(trigger.player)+'各摸一张牌');
                            } else {
                                var cards=player.getCards('h',function(card){
                                    return card==playerGetGainCard();
                                })
                                if(cards){
                                    player.loseToSpecial(cards,'Diuse_Qiaoshi',player).visible=true;
                                    game.log(player,'将一张牌置于武将牌上');
                                }
                            }
                        }
                        else event.finish();
                        'step 2'
                        if(result.bool) event.goto(0);
                    },
                    ai:{
                        expose:0.1
                    },
                },
                Diuse_Zhenlie:{
                    audio:"zhenlie",
                    logTarget:'player',
                    check:function(event,player){
                        if(event.getParent().excluded.contains(player)) return false;
                        if(get.attitude(player,event.player)>0){
                            return false;
                        }
                        if(get.tag(event.card,'respondSha')){
                            if(player.countCards('h',{name:'sha'})==0){
                                return true;
                            }
                        }
                        else if(get.tag(event.card,'respondShan')){
                            if(player.countCards('h',{name:'shan'})==0){
                                return true;
                            }
                        }
                        else if(get.tag(event.card,'damage')){
                            if(event.card.name=='shuiyanqijunx') return player.countCards('e')==0;
                            return true;
                        }
                        else if((event.card.name=='shunshou'||(event.card.name=='zhujinqiyuan'&&(event.card.yingbian||get.distance(event.player,player)<0)))&&player.hp>2){
                            return true;
                        }
                        return false;
                    },
                    trigger:{target:'useCardToTargeted'},
                    filter:function(event,player){
                        return event.player!=player&&event.card&&(event.card.name=='sha'||get.type(event.card)=='trick');
                    },
                    content:function(){
                        "step 0"
                        player.loseHp();
                        "step 1"
                        trigger.getParent().excluded.add(player);
                        "step 2"
                        if(trigger.player.countCards('he')){
                            player.discardPlayerCard(trigger.player,'he',true);
                        }
                        "step 3"
                        if(result.bool&&result.links&&result.links.length){
                            var bool=game.hasPlayer(function(target){
                                if(player.inRange(target)&&target!=player&&player.canUse(result.links[0],target)){
                                    return true;
                                } else {
                                    return false;
                                }
                            });
                            if(bool){
                                player.chooseUseTarget("是否使用"+get.translation(result.links),result.links);
                            } else {
                                event.finish();
                            }
                        }
                    },
                    ai:{
                        expose:0.3
                    }
                },
                Diuse_Miji:{
                    audio:"miji",
                    trigger:{player:'phaseJieshuBegin'},
                    filter:function(event,player){
                        return player.hp<player.maxHp;
                    },
                    content:function(){
                        "step 0"
                        event.num=player.getDamagedHp();
                        player.draw(event.num);
                        "step 1"
                        var check=player.countCards('h')-event.num;
                        player.chooseCardTarget({
                            selectCard:event.num,
                            filterTarget:function(card,player,target){
                                return player!=target;
                            },
                            ai1:function(card){
                                var player=_status.event.player;
                                if(player.maxHp-player.hp==1&&card.name=='du') return 30;
                                var check=_status.event.check;
                                if(check<1) return 0;
                                if(player.hp>1&&check<2) return 0;
                                return get.unuseful(card)+9;
                            },
                            ai2:function(target){
                                var att=get.attitude(_status.event.player,target);
                                if(ui.selected.cards.length==1&&ui.selected.cards[0].name=='du') return 1-att;
                                return att-2;
                            },
                            prompt:'将'+get.cnNumber(event.num)+'张手牌交给一名其他角色',
                        }).set('check',check);
                        "step 2"
                        if(result.bool){
                            result.targets[0].gain(result.cards,event.player,'giveAuto');
                            player.line(result.targets,'green');
                        }
                    },
                    ai:{
                        threaten:function(player,target){
                            if(target.hp==1) return 3;
                            if(target.hp==2) return 1.5;
                            return 0.5;
                        },
                        effect:{
                            target:function(card,player,target){
                                if(get.tag(card,'recover')&&player.hp>=player.maxHp-1) return [0,0];
                            }
                        }
                    },
                    group:"Diuse_Miji_Draw",
                    subSkill:{
                        Draw:{
                            audio:"oldmiji",
                            trigger:{source:'gainEnd'},
                            filter:function(event,player){
                                if(player==event.player) return false;
                                if(player.countCards('h')>=player.getDamagedHp()) return false;
                                var evt=event.getl(player);
                                return evt&&evt.hs&&evt.hs.length;
                            },
                            content:function(){
                                player.draw(player.getDamagedHp()-player.countCards('h'));
                            },
                            ai:{ //摆烂Ai
                                order:5,
                                threaten:0.5,
                                result:{
                                    player:function (player,target){
                                        return 1;
                                    },
                                },
                            },
                        },
                    },
                },
                Diuse_Meibu:{
                    audio:"meibu",
                    trigger:{
                        global:"phaseUseBegin",
                    },
                    filter:function(event,player){
                        return event.player!=player&&event.player.isAlive()&&event.player.inRange(player)&&player.countCards('he')>0;
                    },
                    direct:true,
                    derivation:["rezhixi"],
                    checkx:function(event,player){
                        if(get.attitude(player,event.player)>=0) return false;
                        return event.player.countCards('h')>event.player.hp;
                    },
                    content:function(){
                        "step 0"
                        var check=lib.skill.new_meibu.checkx(trigger,player);
                        player.chooseToDiscard(get.prompt2('Diuse_Meibu',trigger.player),'he').set('ai',function(card){
                            if(_status.event.check) return 6-get.value(card);
                            return 0;
                        }).set('check',check).set('logSkill',['Diuse_Meibu',trigger.player]);
                        "step 1"
                        if(result.bool){
                            var target=trigger.player;
                            var card=result.cards[0];
                            player.line(target,'green');
                            player.markAuto('Diuse_Meibu_gain',[get.color(card,player)]);
                            player.addTempSkill('Diuse_Meibu_gain');
                            target.addTempSkill('rezhixi','phaseUseEnd');
                        }
                    },
                    ai:{
                        expose:0.2,
                    },
                    subSkill:{
                        gain:{
                            trigger:{global:'loseAfter'},
                            forced:true,
                            charlotte:true,
                            popup:false,
                            onremove:true,
                            filter:function(event,player){
                                return event.getParent(3).name=='rezhixi'&&player.getStorage('Diuse_Meibu_gain').contains(get.color(event.cards[0],event.player))&&get.position(event.cards[0])=='d';
                            },
                            content:function(){
                                player.gain(trigger.cards[0],'gain2');
                            },
                        },
                    },
                },
                Diuse_Mumu:{
                    audio:"mumu",
                    trigger:{
                        player:"phaseUseBegin",
                    },
                    direct:true,
                    filter:function(event,player){
                        return game.hasPlayer(function(current){
                            return current.countCards('e')>0;
                        });
                    },
                    content:function(){
                        'step 0'
                        player.chooseTarget(get.prompt2('Diuse_Mumu'),function(card,player,target){
                            return target.countCards('e')>0;
                        }).set('ai',function(target){
                            var tar;
                            var player=_status.event.player;
                            for(var i=0;i<game.players.length;i++){
                                if(game.players[i]==player) continue;
                                if(get.attitude(player,game.players[i])<0&&game.players[i].getCards('e')!=''){
                                    game.log(get.attitude(player,game.players[i])<0&&game.players[i].getCards('e'))
                                    tar=game.players[i];
                                    break;
                                }
                            }
                            if(tar!=undefined){
                                return target==tar;
                            } else {
                                return target.getCards('e');
                            }
                        });
                        'step 1'
                        if(result.bool){
                            var target=result.targets[0];
                            event.target=target;
                            player.logSkill('Diuse_Mumu',target);
                            if(player==target){
                                var str=get.translation(target);
                                if(player.chooseControl().set('choiceList',[
                                    '获得'+str+'装备区的一张牌且本阶段使用【杀】的次数上限-1',
                                    '令'+str+'回收其装备区的一张牌且你与其各摸一张牌'
                                ]).set('ai',function(){
                                    return 1;
                                })) event.Diuse_Mumu=true;
                            }
                            else{
                                var str=get.translation(target);
                                player.chooseControl().set('choiceList',[
                                    '弃置'+str+'装备区的一张牌且本阶段使用【杀】的次数上限+1',
                                    '获得'+str+'装备区的一张牌且本阶段使用【杀】的次数上限-1',
                                    '令'+str+'回收其装备区的一张牌且你与其各摸一张牌'
                                ]).set('ai',function(){
                                    var player=_status.event.player;
                                    if(get.attitude(player,target)>0) return 2;
                                    if(player.countCards('hs',function(card){
                                        return get.name(card,player)=='sha'&&player.hasValueTarget(card);
                                    })<Math.max(1,player.getCardUsable('sha'))) return 1;
                                    return 0;
                                });
                            }
                        }
                        else event.finish();
                        'step 2'
                        if(event.Diuse_Mumu){
                            result.index++;
                            event.Diuse_Mumu=false;
                        }
                        if(result.index==0){
                            player.addTempSkill('remumu3','phaseUseAfter');
                            player.discardPlayerCard(target,'e',true);
                        } else if(result.index==1){
                            player.addTempSkill('remumu2','phaseUseAfter');
                            player.gainPlayerCard(target,'e',true);
                        } else {
                            target.gainPlayerCard(target,'e',true);
                            game.asyncDraw([player,target]);
                        }
                    },
                },
                Diuse_Lianzhu:{
                    audio:'lianzhu',
                    enable:'phaseUse',
                    usable:1,
                    filter:function(event,player){
                        return player.countCards('he')>0;
                    },
                    filterCard:true,
                    discard:false,
                    lose:false,
                    delay:false,
                    position:'he',
                    filterTarget:lib.filter.notMe,
                    check:function(card){
                        var num=get.value(card);
                        if(get.color(card)=='black'){
                            if(num>=6) return 0;
                            return 9-num;
                        }
                        else{
                            return 7-num;
                        }
                    },
                    content:function(){
                        'step 0'
                        target.gain(cards,player,'give');
                        'step 1'
                        event.cardNum=1;
                        if(target.countCards('h',function(card){
                            return card.hasGaintag('Diuse_Xiahui');
                        })==target.countCards('h')&&target.countCards('h')!=0) event.cardNum+=1;
                        if(player.countCards('h',function(card){
                            return card.hasGaintag('Diuse_Xiahui');
                        })==player.countCards('h')&&player.countCards('h')!=0) event.cardNum+=1;
                        if(target.countCards('h')==0) event.cardNum+=1;
                        if(player.countCards('h')==0) event.cardNum+=1;
                        if(player.Diuse_isCardColor()) event.cardNum+=1;
                        if(target.Diuse_isCardColor()) event.cardNum+=1;
                        if(get.color(cards[0],player)=='red'){
                            player.draw(event.cardNum);
                            event.finish();
                        } else {
                            target.chooseToDiscard('he',event.cardNum,'弃置'+event.cardNum+'张牌，或令'+get.translation(player)+'摸'+event.cardNum+'张牌').set('goon',get.attitude(target,player)<0).set('ai',function(card){
                                if(!_status.event.goon) return -get.value(card);
                                return 6-get.value(card);
                            });
                        }
                        'step 2'
                        if(!result.bool){
                            player.draw(event.cardNum);
                        } 
                    },
                    ai:{
                        order:3,
                        expose:0.2,
                        result:{
                            target:function(player,target){
                                if(ui.selected.cards.length&&get.color(ui.selected.cards[0])=='red'){
                                    if(target.countCards('h')<player.countCards('h')) return 1;
                                    return 0.5;
                                }
                                return -1;
                            }
                        }
                    }
                },
                Diuse_Xiahui:{
                    audio:'xiahui',
                    mod:{
                        ignoredHandcard:function(card,player){
                            if(get.color(card,player)=='black') return true;
                        },
                        cardDiscardable:function(card,player,name){
                            if(name=='phaseDiscard'&&get.color(card,player)=='black') return false;
                        }
                    },
                    trigger:{global:'loseAfter'},
                    forced:true,
                    logTarget:'player',
                    filter:function(event,player){
                        var str=event.player.storage.Diuse_Xiahui;
                        if(event.player==player) return false;
                        for(var i=0;i<event.cards2.length;i++){
                            if(get.color(event.cards2[i])=='black'&&str!=undefined){
                                for(var j=0;j<str.length;j++){
                                    if(event.cards2[i]==str[j]){
                                        return true;
                                    }
                                }
                            }
                        }
                        return false;
                    },
                    content:function(){
                        trigger.player.loseHp();
                    },
                    group:'Diuse_Xiahui_gain',
                    subSkill:{
                        gain:{
                            trigger:{global:'gainEnd'},
                            forced:true,
                            popup:false,
                            filter:function(event,player){
                                if(player==event.player) return false;
                                var evt=event.getl(player);
                                return evt&&evt.cards2&&evt.cards2.filter(function(card){
                                    return get.color(card,player)=='black'||'red';
                                }).length>0;
                            },
                            content:function(){
                                'step 0'
                                var redBool=0;
                                event.card;
                                for(var i=0;i<trigger.cards.length;i++){
                                    var color=get.color(trigger.cards[i]);
                                    if(color=='black'){
                                        trigger.player.addSkill('Diuse_Xiahui_block');
                                        var cards=trigger.getl(player).cards2.filter(function(card){
                                            return get.color(card,player)=='black';
                                        });
                                        trigger.player.addGaintag(cards,'Diuse_Xiahui');
                                        if(trigger.player.storage.Diuse_Xiahui==undefined) trigger.player.storage.Diuse_Xiahui=[];
                                        trigger.player.storage.Diuse_Xiahui.push.apply(trigger.player.storage.Diuse_Xiahui,cards);
                                    } else {
                                        if(redBool==0){
                                            redBool=1;
                                            event.card=trigger.cards[i];
                                        } else redBool=2;
                                    }
                                }
                                if(redBool==1){
                                    var bool=game.hasPlayer(function(target){
                                        if(trigger.player.canUse(event.card,target)){
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    });
                                    if(bool) player.chooseBool('是否令'+get.translation(trigger.target)+'使用'+get.translation(event.card));
                                }
                                'step 1'
                                if(result.bool){
                                    trigger.player.chooseUseTarget(event.card,true);
                                }
                            },
                        },
                        block:{
                            mod:{
                                cardEnabled2:function(card){
                                    if(get.itemtype(card)=='card'&&card.hasGaintag('Diuse_Xiahui')) return false;
                                },
                                cardDiscardable:function(card){
                                    if(card.hasGaintag('Diuse_Xiahui')) return false;
                                },
                            },
                            charlotte:true,
                            forced:true,
                            popup:false,
                            trigger:{player:'changeHp'},
                            filter:function(event,player){
                                return event.num<0;
                            },
                            content:function(){
                                delete player.storage.Diuse_Xiahui;
                                player.removeSkill('Diuse_Xiahui_block');
                            },
                            onremove:function(player){
                                player.removeGaintag('Diuse_Xiahui');
                            },
                        },
                    },
                },
            },
            translate:{
                Diuse_Diy_Xingfa:"兴伐",
                Diuse_Diy_Xingfa_info:"出牌阶段限一次，你可以摸一张牌/视为对一名你以外的角色使用一张不限距离的火【杀】。然后你可令一名其他角色也如此做，否则你视为执行另一项",
                Diuse_Diy_Miaopin:"妙品",
                Diuse_Diy_Miaopin_info:"你于摸牌阶段外获得牌后，可摸一张牌并展示之，若此牌非装备牌、延迟锦囊牌，你可将此牌当作非此牌名的同类牌使用（每回合限使用一次）",
                Diuse_Diy_Huibian:"挥鞭",
                Diuse_Diy_Huibian_info:"出牌阶段限一次，你可以选择一名角色和另一名已受伤的角色，你对前者造成1点伤害并令其摸两张牌，然后令后者回复1点体力。",
                Diuse_DIY_Juesi:"决死",
                Diuse_DIY_Juesi_info:"你的出牌阶段，可以与一名其他角色拼点，若你赢，杀的使用次数额外+1直到回合结束。",
                Diuse_DIY_Xunzhong:"殉忠",
                Diuse_DIY_Xunzhong_info:"锁定技，回合内你的拼点次数没有限制且拼点次数达到：2次，你与目标计算距离时始终为1直到回合结束；3次，你流失一点体力；4次或更多，你减一点体力上限。",
                Diuse_DIY_Zhaoquan:"昭权",
                Diuse_DIY_Zhaoquan_info:"出牌阶段限一次，你可令一名其他角色选择一项：1.使用一张牌；2.失去一点体力",
                Diuse_DIY_Zhengtong:"政通",
                Diuse_DIY_Zhengtong_info:"受到伤害后，你可令一名其他魏势力角色交给你X张牌并摸等量牌（X至多为其手牌总数）",
                Diuse_DIY_Baifu:"拜父",
                Diuse_DIY_Baifu_info:"限定技，准备阶段，若场上没有义父，你可以指定一名其他男性角色，其成为你的义父并获得“父慈”（父慈：锁定技，准备阶段，你需要交给义子任意张手牌，若此法给出的牌不小于两张，你指定一名角色，视为义子对其使用【决斗】）",
                Diuse_DIY_Fuci:"父慈",
                Diuse_DIY_Fuci_info:"锁定技，准备阶段，你需要交给义子任意张手牌，若此法给出的牌不小于两张，你指定一名角色，视为义子对其使用【决斗】",
                Diuse_DIY_Zixiao:"子孝",
                Diuse_DIY_Zixiao_info:"锁定技，你使用【杀】或【决斗】造成伤害时，若目标为义父，则伤害+1。你杀死义父后，增加1点体力上限并回复一点体力，然后“拜父”视为未发动。",
                Diuse_DIY_Suzheng:"肃政",
                Diuse_DIY_Suzheng_info:"出牌阶段限一次，若你装备着武器牌，你可以弃置一张红桃/黑桃手牌，对你攻击范围内/外的一名角色造成一点伤害",
                Diuse_DIY_Zhangbing:"掌柄",
                Diuse_DIY_Zhangbing_info:"锁定技，若你的攻击范围为全场最大/小，你造成的伤害+1/你的摸牌数+1",
                Diuse_DIY_Shichou:"矢仇",
                Diuse_DIY_Shichou_info:"锁定技，红色牌对你无效",
                Diuse_DIY_Yonglie:"勇烈",
                Diuse_DIY_Yonglie_info:"当你使用黑色牌：1.指定其他角色为目标后，你可弃置其中一名角色装备区一张黑色牌；2.造成伤害后，摸一张红色牌",
                Diuse_DIY_Kuiye:"溃业",
                Diuse_DIY_Kuiye_info:"当你被伤害牌指定为目标后，你可以重铸至多两张牌并展示，若你以此法获得了两张牌且类型不同，你弃置其一",
                Diuse_DIY_Sucai:"夙才",
                Diuse_DIY_Sucai_info:"锁定技，你于摸牌阶段外获得牌时，额外摸一张，记为“夙”，当“夙”到达13个时，你加一点体力上限并失去一点体力，然后失去此技能",
                Diuse_DIY_Kuidi:"傀帝",
                Diuse_DIY_Kuidi_info:"主公技，当你受到伤害时，其他魏势力角色依次选择是否代替你承受此伤害。若其选择是，其与你各摸X张牌（X为此次伤害值），然后其本局游戏不可以再响应【傀帝】",
                Diuse_DIY_Zhuhai:"诛害",
                Diuse_DIY_Zhuhai_info:"其他角色的结束阶段，若其于本回合内造成过伤害，你可以视为对其使用一张【杀】或【过河拆桥】。",
                Diuse_DIY_Qianxin:"潜心",
                Diuse_DIY_Qianxin_info:"觉醒技，当你造成伤害后，若你已受伤，则你减1点体力上限，获得技能“荐言”",
                Diuse_DIY_Jianyan:"荐言",
                Diuse_DIY_Jianyan_info:"出牌阶段每项限一次，你可以选择一种类别/颜色并亮出牌堆中第一张符合条件的牌（没有则洗牌），然后你令一名男性角色获得之。",
                Diuse_Rende:"仁德",
                Diuse_Jijiang:"激将",
                Diuse_Jianxiong:"奸雄",
                Diuse_Hujia:"护驾",
                Diuse_Zhiheng:"制衡",
                Diuse_Jiuyuan:"救援",
                Diuse_Tianming:"天命",
                Diuse_Mizhao:"密诏",
                Diuse_Yanyv:"燕语",
                Diuse_Qiaoshi:"樵拾",
                Diuse_Zhenlie:"贞烈",
                Diuse_Miji:"秘技",
                Diuse_Meibu:"魅步",
                Diuse_Mumu:"穆穆",
                Diuse_Lianzhu:"连诛",
                Diuse_Xiahui:"黠慧",
                Diuse_Rende_info:"出牌阶段，你可以将至少一张手牌交给其他角色，然后你于此阶段内不能再以此法交给该角色；因此法给出的牌首次到达两张，你可以选择一张基本牌，然后你选择视为你或其使用",
                Diuse_Jijiang_info:"当你需要使用或打出【杀】时，你可以令一名其他蜀势力角色依次选择是否打出一张【杀】。若有角色响应，则视为你使用此【杀】，然后其摸一张牌；若其手牌没有伤害类牌则额外摸一张",
                Diuse_Jianxiong_info:"当你受到伤害后，你可以获得对你造成伤害的牌并摸一张牌，然后你可以使用一张手牌",
                Diuse_Hujia_info:"当你当你需要或使用打出一张【闪】时，你可以令其他魏势力角色选择是否打出一张【闪】，若有角色响应，则你视为使用或打出一张【闪】，且你与响应者各摸一张牌",
                Diuse_Zhiheng_info:"出牌阶段限一次，你可以弃置任意张牌并摸等量牌，若因此弃置全部手牌则额外摸一张；若因此弃置的牌中有你可以使用的牌，则你可以将牌给予一名其他吴势力角色",
                Diuse_Jiuyuan_info:"锁定技，你对其他吴势力角色或其他吴势力角色对你使用【桃】的回复值+1且你与其各摸一张牌。",
                Diuse_Tianming_info:"当你成为【杀】的目标时，你可以弃置两张牌，然后摸两张牌；若此时全场体力值最多的其他角色也可以如此做。每回合限一次，若你因弃置你可以使用的牌后，你可以将该牌交给一名其他角色",
                Diuse_Mizhao_info:"出牌阶段限一次，你可以将所有手牌交给一名角色。若如此做，你令该角色与你指定的另一名角色拼点，视为拼点的角色对没有赢的角色使用一张【杀】，没赢的角色若防具区有牌则将该牌收回手牌",
                Diuse_Yanyv_info:"出牌阶段你可以重铸【杀】；出牌阶段结束时，你可以令一名角色摸X张牌（X为本阶段你发动燕语的次数且至多为3）若其因此只摸一张牌且该牌可以被其使用则其可以使用之",
                Diuse_Qiaoshi_info:"其他角色的结束阶段开始时，若你与其手牌数相等，则你可以与其各摸一张牌。若这两张颜色相同，你可以重复此步骤；你因此摸的牌均置于你的武将牌上，且可以随时使用",
                Diuse_Zhenlie_info:"当你成为其他角色使用【杀】或普通锦囊牌目标后，你可以失去一点体力并令此牌对你无效，然后你弃置其一张牌；若弃置的牌可以对其他角色使用则你可以使用之",
                Diuse_Miji_info:"结束阶段，若你已受伤，你可以摸X张牌，然后可以将等量的牌交给一名其他角色；其他角色获得你的牌后你可以将手牌补至X（X为你已损失的体力）",
                Diuse_Meibu_info:"其他角色的出牌阶段开始时，若你在其攻击范围内，你可以弃置一张牌并记录花色令其获得【止息】。当有角色因【止息】弃置与你记录的颜色相同的牌时，你可以获得之",
                Diuse_Mumu_info:"出牌阶段开始时，你可以选择一项：1.弃置一名其他角色装备区的一张牌，然后本回合出杀次数+1；2.获得一名角色装备区的一张牌，然后你本回合出杀次数-1；3.令一名角色收回其装备区的牌，然后你与其各摸一张牌",
                Diuse_Lianzhu_info:"出牌阶段限一次，你将一张手牌正面朝上交给一名其他角色。若此牌为红色，你摸一张牌；黑色，其弃一张牌或令你摸一张牌。当你或其满足以下条件均使额定数+1：手牌均为“黠慧”牌、没有手牌、手牌颜色一致",
                Diuse_Xiahui_info:"锁定技，你的黑色手牌不计入手牌上限；当有其他角色获得你的黑色牌后，其于下次扣减体力前不能使用，打出，弃置这些牌；当有角色失去你的“黠慧”牌后，其失去一点体力；当有角色获得你的一张红色牌后你可以令其使用之",
            
            },
        },
    },"术樱");
}