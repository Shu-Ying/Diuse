window.func = function(lib,game,ui,get,ai,_status)
{
    if(!lib.config.extension_术樱_benghuai3off) return;

    game.Diuse_Benghuai = function(英文名,翻译名,obj,扩展包名){
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

    game.Diuse_Benghuai("Diuse_Benghuai","崩坏",{
        connect:true,
        character:{
            character:{
                Diuse_Bachongying:["female","qun",4,["Diuse_Luoying","Diuse_Yishan","Diuse_Renfan"],[]],
                Diuse_Buluoniya:["female","qun",3,["Diuse_Guozai","Diuse_Chonggou","Diuse_Fuhe","Diuse_Yinmie"],[]],
                Diuse_Fuhua:["female","qun",4,["Diuse_Shanbeng","Diuse_Xirang","Diuse_Xunxin"],[]],
                Diuse_Shangxian:["female","qun",4,["Diuse_Xianfa","Diuse_Yinyang","Diuse_Tiandi"],[]],
                Diuse_Kalian:["female","qun",4,["Diuse_Wange","Diuse_Sangzhong","Diuse_Zhongqu"],[]],
                Diuse_Xier:["female","qun",4,["Diuse_Anhong","Diuse_Diewu"],[]],
                Diuse_Shilv:["female","qun",4,["Diuse_Bingren","Diuse_Fanchen","Diuse_Zhejian"],[]],
                Diuse_Yayi:["female","qun",4,["Diuse_Leiming","Diuse_Yingren","Diuse_Yvlei"],[]],
                Diuse_Yuexia:["female","qun","1/4",["Diuse_Xueqi","Diuse_Shenshi","Diuse_Shoulie"],[]],
                Diuse_Konglv:["female","qun",5,["Diuse_Qujian","Diuse_Yakong","Diuse_Xujie"],[]],
                Diuse_Heixi:["female","qun",4,["Diuse_Mingan","Diuse_Baihei","Diuse_Danzhong"],[]],
                Diuse_Shuangzi:["female","qun",4,["Diuse_Shuangzi"],[]],
                Diuse_Yingtao:["female","qun",2,["Diuse_Hula","Diuse_Huojian","Diuse_Shanliang"],["unseen"]],
                Diuse_Lanmei:["female","qun",3,["Diuse_Kuaisu","Diuse_Huyuan","Diuse_Fangyv"],["unseen"]],
                //,'kagari_zongsi'
            },
            translate:{
                Diuse_Xier:"希儿",
                Diuse_Kalian:"卡莲",
                Diuse_Bachongying:"八重樱",
                Diuse_Fuhua:"符华",
                Diuse_Shangxian:"上仙",
                Diuse_Buluoniya:"布洛妮娅",
                Diuse_Shilv:"识之律者",
                Diuse_Yayi:"芽衣",
                Diuse_Yuexia:"月下初拥",
                Diuse_Konglv:"空之律者",
                Diuse_Heixi:"彼岸双生",
                Diuse_Shuangzi:"伏特加女孩",
                Diuse_Yingtao:"樱桃炸弹",
                Diuse_Lanmei:"蓝莓特工",
            },
        },
        perfectPair:{
            Diuse_Xier:['Diuse_Buluoniya'],
            Diuse_Kalian:['Diuse_Bachongying'],
        },
        characterTitle:{},
        characterReplace:{}, //切换版本
        game:{ //普通自定义函数
        },
        skill:{
            skill:{
                Diuse_SP:{ //总SP技能
                    marktext:"SP",
                    mark:true,
                    intro:{
                        content:function (storage,player,skill){
                            var num=player.countMark('Diuse_SP');
                            if(num==undefined) num=0;
                            return '当前SP值为：'+num;
                        },
                    },
                    group:['Diuse_SP_useCard','Diuse_SP_damage'], //useCard 使用   respond 打出
                    subSkill:{
                        useCard:{
                            trigger:{player:["useCard","respond"]},
                            forced:true,
                            priority:100,
                            silent:true,
                            firstDo:true,
                            frequent:true,
                            popup:false,
                            audio:false,
                            sub:true,
                            filter:function(event,player){
                                return event.card.name=='sha'||event.card.name=='shan'||get.type(event.card)=='trick';
                            },
                            content:function(){
                                var name=trigger.name;
                                if(name=='useCard'){
                                    if(trigger.card.name=='sha'||trigger.card.nature!=undefined){
                                        player.addMark('Diuse_SP',7);
                                    } else if(trigger.card.name=='shan'){
                                        player.addMark('Diuse_SP',6);
                                    } else if(get.type(event.card)=='trick'){
                                        player.addMark('Diuse_SP',4);
                                    } else {
                                        player.addMark('Diuse_SP',5);
                                    }
                                } else {
                                    if(trigger.card.name=='shan') player.addMark('Diuse_SP',5);
                                }
                                var countMarkNum=player.countMark('Diuse_SP');
                                var randomNum=game.Diuse_randomNum(100,0);
                                var playerName=player.name;
                                if(!player.hasSkill('Diuse_Caidan_End')){
                                    if(randomNum>=50&&countMarkNum>=150&&playerName=='Diuse_Konglv'){
                                        player.addSkill('Diuse_Caidan_End');
                                        game.playAudio('..','extension\\术樱','Diuse_Caidan_Konglv');
                                    }
                                    if(randomNum>=50&&countMarkNum>=100&&playerName=='Diuse_Heixi'){
                                        player.addSkill('Diuse_Caidan_End');
                                        game.playAudio('..','extension\\术樱','Diuse_Caidan_Heixi');
                                    }
                                    if(randomNum>=50&&countMarkNum>=100&&playerName=='Diuse_Yayi'){
                                        player.addSkill('Diuse_Caidan_End');
                                        game.playAudio('..','extension\\术樱','Diuse_Caidan_Yayi');
                                    }
                                }
                            },
                        },
                        damage:{
                            trigger:{source:"damageAfter"},
                            forced:true,
                            priority:100,
                            silent:true,
                            firstDo:true,
                            frequent:true,
                            popup:false,
                            sub:true,
                            content:function(){
                                var num=trigger.num;
                                player.addMark('Diuse_SP',num*5);
                                
                                var countMarkNum=player.countMark('Diuse_SP');
                                var randomNum=game.Diuse_randomNum(100,0);
                                var playerName=player.name;
                                if(!player.hasSkill('Diuse_Caidan_End')){
                                    if(randomNum>=50&&countMarkNum>=150&&playerName=='Diuse_Konglv'){
                                        player.addSkill('Diuse_Caidan_End');
                                        game.playAudio('..','extension\\术樱','Diuse_Caidan_Konglv');
                                    }
                                    if(randomNum>=50&&countMarkNum>=100&&playerName=='Diuse_Heixi'){
                                        player.addSkill('Diuse_Caidan_End');
                                        game.playAudio('..','extension\\术樱','Diuse_Caidan_Heixi');
                                    }
                                }
                            }
                        },
                    },
                },
                Diuse_Caidan_End:{}, //防止重复播放彩蛋

                //希儿
                Diuse_Diewu:{ 
                    audio:"ext:术樱:2",
                    enable:"phaseUse",
                    usable:1,
                    position:"he",
                    filterCard:function (card)
                    {
                        return get.color(card)=='red';
                    },
                    selectCard:1,
                    check:function (card){
                        return 1;
                    },
                    discard:false,
                    filterTarget:function (card,player,target)
                    {
                        return target!=player;
                    },
                    selectTarget:1,
                    content:function (event,player,targets,info)
                    {
                        targets[0].draw();
                        player.chooseUseTarget({name:'sha'},'是否视为使用一张【杀】？',false);
                    },
                    ai:{
                        threaten:0.5,
                        order:8,
                        result:{
                            player:function (player,target){
                                if(get.attitude(player,target)<=0) return -1;
                                var num1=0;
                                if(player.countCards('h',{color:'red'})) num1++;
                                return num1;
                            },
                        },
                    },
                },
                Diuse_Xuesha:{
                    audio:"ext:术樱:2",
                    trigger:{
                        source:"damageSource",
                    },
                    priority:1,
                    frequent:true,
                    forced:true,
                    content:function (card,player,num)
                    {
                        player.draw();
                        player.addTempSkill('Diuse_Xuesha2');
                    },
                },
                Diuse_Xuesha2:{
                    mod:{
                        cardUsable:function (card,player,num)
                        {
                            if(card.name=='sha') return num+1;
                        },
                    },
                },
                Diuse_Anhong:{
                    juexingji:true,
                    skillAnimation:true,
                    forced:true,
                    unique:true,
                    group:['Diuse_Anhong_Juexing','Diuse_Anhong_Mopai'],
                    subSkill:{
                        Juexing:{
                            audio:"ext:术樱:2",
                            juexingji:true,
                            skillAnimation:true,
                            derivation:'Diuse_Xuesha',
                            forced:true,
                            unique:true,
                            sub:true,
                            trigger:{
                                player:"damageSource",
                            },
                            filter:function (event,player){
                                return player.hp<=2;
                            },
                            content:function (){
                                player.loseMaxHp();
                                player.recover();
                                game.log(player,'获得了技能','#g【血杀】');
                                player.addSkill("Diuse_Xuesha");
                                player.awakenSkill('Diuse_Anhong');
                            },
                            ai:{
                                threaten:function (player,target){
                                    if(target.hp==1) return 2;
                                    return 0.5;
                                },
                                maixie:true,
                                effect:{
                                    target:function (card,player,target){
                                        if(!target.hasFriend()) return;
                                        if(get.tag(card,'damage')==1&&target.hp==3&&!target.isTurnedOver()&&
                                        _status.currentPhase!=target&&get.distance(_status.currentPhase,target,'absolute')<=3) return [0.5,1];
                                    },
                                },
                            },
                        },
                        Mopai:{
                            audio:"ext:术樱:2",
                            trigger:{
                                player:"damageBefore",
                                source:"",
                                global:"",
                            },
                            sub:true,
                            priority:1,
                            frequent:true,
                            forced:true,
                            nopop:true,
                            content:function (){
                                player.draw(); 
                            },
                        },
                    },
                },

                Diuse_Wuli_Yishang_Mark:{ //用于存储标记数量
                    marktext:"易伤",
                    mark:true,
                    intro:{
                        content:function (storage,player,skill){
                            return '物理易伤，受到杀的伤害+1。'
                        },
                    },
                    locked:true,
                },
                Diuse_Wuli_Yishang:{ //实际效果
                    trigger:{
                        player:"damageBefore",
                    },
                    forced:true,
                    filter:function (event,player){
                        return event.card&&event.card.name=='sha'&&event.nature==undefined;
                    },
                    content:function (){
                        trigger.num++;
                    },
                },
                Diuse_Yuansu_Yishang_Mark:{
                    marktext:"易伤",
                    mark:true,
                    intro:{
                        content:function (storage,player,skill){
                        return '元素易伤，受到属性的伤害+1。'
                        },
                    },
                    locked:true,
                },
                Diuse_Yuansu_Yishang:{
                    trigger:{
                        player:"damageBefore",
                    },
                    forced:true,
                    filter:function (event,player){
                        return event.card&&event.nature!=undefined;
                    },
                    content:function (){
                        trigger.num++;
                    },
                },
                Diuse_Quanmian_Yishang_Mark:{
                    marktext:"易伤",
                    mark:true,
                    intro:{
                        content:function (storage,player,skill){
                        return '全面易伤，受到的伤害+1。'
                        },
                    },
                    locked:true,
                },
                Diuse_Quanmian_Yishang:{
                    trigger:{
                        player:"damageBefore",
                    },
                    forced:true,
                    content:function (){
                        trigger.num++;
                    },
                },

                //板鸭
                Diuse_Guozai:{
                    audio:"ext:术樱:2",
                    enable:"phaseUse",
                    diuse_sp:true,
                    filter:function(event,player){
                        var num=player.countMark('Diuse_SP');
                        if(num==undefined) num=0;
                        if((num-50)>=0&&player.storage.Fuhe_Buff) return true;
                        return false;
                    },
                    content:function(){
                        var num=player.countMark('Diuse_Fuhe');
                        var num1=player.countCards('h');
                        var num2=num+player.maxHp-num1;
                        if(num1<num2) {
                            if(num2>10) num2=10;
                            player.draw(num2);
                        }
                        player.removeMark('Diuse_SP',50);
                        player.storage.Fuhe_Buff=false;
                    },
                    group:['Diuse_SP_useCard','Diuse_SP_damage','Diuse_Guozai_Buff'],
                    subSkill:{
                        Buff:{
                            trigger:{source:"damageBegin"},
                            forced:true,
                            sub:true,
                            frequent:true,
                            filter:function(event,player){
                                if(player.storage.Fuhe_Buff==false) return true;
                                return false;
                            },
                            content:function(){
                                var num=player.countMark('Diuse_SP');
                                trigger.num++;
                                player.recover();
                                if(player.storage.Fuhe_List.length>=1){
                                    for(var i=0;i<player.storage.Fuhe_List.length;i++){
                                        player.storage.Fuhe_List[i].recover();
                                    }
                                }
                                player.removeMark('Diuse_SP',10);
                                if(num<=0){
                                    player.storage.Fuhe_Buff=true;
                                }
                                player.storage.Fuhe_Damage++;
                                if(player.storage.Fuhe_Damage>=5){
                                    player.storage.Fuhe_Damage=0;
                                    player.storage.Fuhe_Buff=true;
                                }
                            }
                        },
                    },
                },
                Diuse_Chonggou:{
                    audio:"ext:术樱:2",
                    trigger:{source:"damageBegin"},
                    usable:1,
                    check:function(event,player,target){
                        var num=event.num;
                        var num1=player.countMark('Diuse_Fuhe');
                        if(event.player.hp<=num) return false;
                        if(get.attitude(player,event.player)<=0&&num<=1&&num1>=2) return true;
                        return false;
                    },
                    content:function(){
                        var num=player.countMark('Diuse_Fuhe');
                        var card=trigger.player.getEquip(2);
                        "step 0"
                        if(card==undefined||card==''){
                            player.chooseControl('制衡').set('prompt','请选择弃置'+num+'张牌并摸'+num+'张牌').set('ai',function(){
                                return '制衡';
                            });
                        } else {
                            player.chooseControl('制衡','回收').set('prompt','请选择弃置'+num+'张牌并摸'+num+'张牌或令其防具区的牌收回手牌并在其出牌阶段强制使用该牌').set('ai',function(){
                                if(trigger.player.isEmpty(2)) return '回收';
                                return '制衡';
                            });
                        }
                        "step 1"
                        if(result.control=='制衡'){
                            var num1=player.countCards('he')
                            if(num1<=0){} else if(num1<=num){
                                player.chooseToDiscard('he',num1,true);
                                player.draw(num1);
                            } else {
                                player.chooseToDiscard(num,true);
                                player.draw(num);
                            }
                        } else if(result.control=='回收'){
                            var card=trigger.player.getEquip(2);
                            if(card){
                                trigger.player.gain(card,'gain').gaintag.add('Diuse_Chonggou');
                            }
                        }
                        trigger.cancel();
                    },
                    group:['Diuse_Chonggou_Phase'],
                    subSkill:{
                        Phase:{
                            trigger:{global:"phaseZhunbeiBegin"},
                            forced:true,
                            sub:true,
                            popup:false,
                            filter:function(event,player){
                                return event.player.getCards('h',function(card){
                                    return card.hasGaintag('Diuse_Chonggou');
                                }).length>0;
                            },
                            content:function(){
                                var card=trigger.player.getCards('h',function(card){
                                    return card.hasGaintag('Diuse_Chonggou');
                                });
                                trigger.player.chooseUseTarget(card,true);
                            },
                        },
                    },
                },
                Diuse_Yinmie:{
                    audio:"ext:术樱:2",
                    trigger:{global:"damageBefore"},
                    usable:1,
                    check:function(event,player,target){
                        var list=player.storage.Fuhe_List;
                        var num=player.countMark('Diuse_Fuhe');
                        if(!list) return false;
                        if(get.attitude(player,event.player)>0&&list.contains(event.player)) return false;
                        if(num<=0) return false;
                        return true;
                    },
                    filter:function(event,player){
                        var card=event.player.getEquip(2);
                        if(card==undefined||card=='') card=false;
                        if(!card&&event.player!=player) return true;
                    },
                    content:function(){
                        "step 0"
                        if(player.countCards('he')>=2){
                            player.chooseControl('加伤','保护').set('prompt','请选择令其摸两张牌然后该伤害+1或你弃置两张牌并暂时将其视为保护目标').set('ai',function(){
                                if(get.attitude(player,trigger.player)<=0) return '加伤';
                                return '保护';
                            });
                        } else {
                            player.chooseControl('加伤').set('prompt','请选择令其摸两张牌然后该伤害+1').set('ai',function(){
                                return '加伤';
                            });
                        }
                        "step 1"
                        if(result.control=='加伤'){
                            trigger.player.draw(2);
                            trigger.num++;
                        } else {
                            player.chooseToDiscard('he',2,true);
                            player.storage.Fuhe_List.push(trigger.player);
                        }
                    },
                },
                Diuse_Fuhe:{
                    group:['Diuse_Fuhe_Phase','Diuse_Fuhe_End','Diuse_Fuhe_Damage'],
                    audio:"ext:术樱:4",
                    marktext:"盾",
                    mark:true,
                    locked:true,
                    intro:{
                        content:function(storage,player,skill){
                            var num=player.countMark('Diuse_Fuhe');
                            var list=player.storage.Fuhe_List;
                            if(num==undefined) num=0;
                            if(list==undefined||list=='') list="空";
                            return "物理护盾还可以抵消"+num+"点伤害。"+"保护目标有："+list;
                        }
                    },
                    trigger:{
                        global:"gameDrawAfter",
                        player:"enterGame",
                    },
                    forced:true,
                    init:function(player){
                        player.storage.Fuhe_List=[]; //保护列表
                        player.storage.Fuhe_Hp=[];
                        player.storage.Fuhe_Buff=true; //SP技能 过载
                        player.storage.Fuhe_Damage=0; //过载计数
                    },
                    content:function(){
                        player.addMark('Diuse_Fuhe',player.hp);
                    },
                    subSkill:{
                        End:{
                            audio:false,
                            trigger:{player:"phaseUseAfter"},
                            forced:true,
                            sub:true,
                            popup:false,
                            content:function(){
                                player.storage.Fuhe_List=[]; 
                                player.storage.Fuhe_Hp=player.hp;
                            },
                        },
                        Phase:{
                            audio:"Diuse_Fuhe",
                            trigger:{player:"phaseUseBegin"},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                var hp=player.storage.Fuhe_Hp;
                                var num=player.countMark('Diuse_Fuhe');
                                if(player.hp==hp&&num<player.maxHp) return true;
                                return false;
                            },
                            content:function(){
                                var num=player.countMark('Diuse_Fuhe');
                                player.addMark('Diuse_Fuhe',player.maxHp-num);
                            },
                        },
                        Damage:{
                            audio:"Diuse_Fuhe",
                            trigger:{global:"damageBegin"},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                var str=player.storage.Fuhe_List;
                                var num=player.countMark('Diuse_Fuhe');
                                if(num<=0||num==undefined) return false;
                                if(event.nature!=undefined) return false;
                                if(event.player==player) return true;
                                if(str==undefined){
                                    return false;
                                } else {
                                    for(var i=0;i<str.length;i++){
                                        if(event.player==str[i]) return true;
                                    }
                                }
                                return false;
                            },
                            content:function(){
                                var name=trigger.source;
                                if(name==undefined||name=='') name='nosource';
                                var num=trigger.num;
                                var num1=player.countMark('Diuse_Fuhe');
                                var num2=0;
                                if(num>num1){
                                    num2=num-num1;
                                    player.removeMark('Diuse_Fuhe',num1);
                                    trigger.cancel();
                                    trigger.player.damage(num2,name);
                                } else {
                                    player.removeMark('Diuse_Fuhe',num);
                                    trigger.cancel();
                                }     
                            }
                        },
                    },
                    mod:{
                        maxHandcardBase:function(player,num){
                            var num1=player.countMark('Diuse_Fuhe');
                            return num+num1;
                        },
                    },
                },

                //卡莲
                Diuse_Wange:{
                    group:['Diuse_Wange_Jieduan','Diuse_Wange_Jineng'],
                    subSkill:{
                        Jieduan:{
                            audio:"ext:术樱:2",
                            trigger:{
                                player:"phaseBegin",
                            },
                            sub:true,
                            forced:true,
                            content:function (){
                                'step 0'
                                player.chooseControl('出牌阶段','摸牌阶段').set('prompt','获得额外的阶段');
                                "step 1"
                                if(result.control=='出牌阶段'){
                                    var next=player.phaseUse();
                                    event.next.remove(next);
                                    trigger.next.push(next);
                                }
                                else if(result.control=='摸牌阶段'){
                                    var next=player.phaseDraw();
                                    event.next.remove(next);
                                    trigger.next.push(next);
                                }
                            },
                        },
                        Jineng:{
                            audio:"ext:术樱:2",
                            trigger:{
                                player:"turnOverBefore",
                            },
                            forced:true,
                            sub:true,
                            content:function (){
                                'step 0'
                                player.chooseControl('获得技能','摸牌并恢复体力').set('prompt','选择');
                                "step 1"
                                if(result.control=='获得技能'){
                                    player.addTempSkill('Diuse_Yayv',{player:'phaseBefore'});
                                }
                                else if(result.control=='摸牌并恢复体力'){
                                    player.draw(2);
                                    player.recover();
                                }
                            },
                        },
                    },
                },
                Diuse_Sangzhong:{
                    forced:true,
                    audio:"ext:术樱:2",
                    trigger:{
                        player:"damageEnd",
                    },
                    filter:function(event,player){
                        return _status.currentPhase!=player;
                    },
                    content:function(){
                        'step 0'
                        if(trigger.num>=2){
                            player.chooseControl('摸牌','复原武将','取消').set('prompt','请选择:摸一张牌(如果没有手牌则摸两张)复原武将').set('ai',function(){
                                if(player.classList.contains('turnedover'))
                                {
                                    return '复原武将';
                                } else {
                                    return '摸牌';
                                }
                            });
                        } else {
                            player.chooseControl('摸牌','取消').set('prompt','请选择:摸一张牌(如果没有手牌则摸两张)').set('ai',function(){
                                return '摸牌';
                            });
                        }
                        "step 1"
                        if(result.control=='摸牌'){
                            if(player.countCards('h')==0)
                            {
                                if(trigger.num>=2){
                                    player.draw(3);
                                } else {player.draw(2);}
                            } else {
                                player.draw();
                            }
                        }
                        else if(result.control=='复原武将'){
                            player.turnOver(false);
                        }
                    },
                    ai:{
                        effect:{
                            target:function (card,player,target){
                                if(get.tag(card,'damage')&&_status.currentPhase!=target){
                                    if(player.hasSkillTag('jueqing',false,target)) return [1,-1.5];
                                    return [1,0.5];
                                }
                            },
                        },
                    },
                },
                Diuse_Zhongqu:{
                    audio:"ext:术樱:2",
                    enable:"phaseUse",
                    usable:1,
                    position:"he",
                    selectCard:1,
                    filterCard:true,
                    filterTarget:function (card,player,target){
                        return player!=target;
                    },
                    content:function (){
                        "step 0"
                        player.judge(function(card){
                            var num=get.number(card);
                            if(num==1){
                                return 5;
                            } else if(num>1&&num<=7){
                                return 4;
                            } else if(num>7&&num<=12){
                                return 3;
                            } else if(num==13&&player.countCards('h')<=2){
                                return 10;    
                            } else {
                                return 0;
                            }
                        }).judge2=function(result){
                            var num=get.number(result.card);
                            if(num!=undefined) {
                                return result.bool=true; 
                            } else { 
                                return result.bool=false; 
                            }
                        };
                        "step 1"
                        var num1=get.number(result.card);
                        if(num1==1){
                            player.draw(3);
                            var card=target.getCards('hej').randomGet();
                            player.gain(card,target,'giveAuto','bySelf');
                            player.addTempSkill('Diuse_Zhongqu1',{player:'phaseBefore'});
                        } else if(num1>1 && num1<=7){
                            var card=target.getCards('hej').randomGet();
                            player.gain(card,target,'giveAuto','bySelf');
                            player.draw();
                        } else if(num1>7 && num1<=12){
                            player.draw(2);
                        } else if(num1==13){
                            player.turnOver();
                        }    
                    },
                    ai:{
                        order:9,
                        result:{
                            target:function (player,target){
                                var numj=target.countCards('j');
                                var numhe=target.countCards('he');
                                if(numhe==0) return numj>0?6:-6;
                                return -6-(numj+1)/numhe;
                            },
                        },
                        threaten:1.1,
                    },
                },
                "Diuse_Zhongqu1":{
                    audio:"ext:术樱:2",
                    trigger:{
                        source:"damageBegin1",
                    },
                    filter:function (event){
                        return event.card&&(event.card.name=='sha')&&event.notLink();
                    },
                    forced:true,
                    content:function (){
                        trigger.num++;
                    },
                    ai:{
                        damageBonus:true,
                    },
                },
                Diuse_Yayv:{
                    trigger:{
                        player:["loseEnd","gainEnd","loseMaxHpEnd","changeHp","gainMaxHpEnd"],
                    },
                    filter:function(event,player){
                        return player.countCards('h') != player.hp;
                    },
                    forced:true,
                    content:function (player,event){
                            if( player.countCards('h') > player.hp )
                            {
                                player.chooseToDiscard(player.countCards('h') - player.hp,true);
                            } else {
                                player.draw(player.hp-player.countCards('h'));
                            }
                    },
                },

                //八重樱
                Diuse_Ying:{
                    marktext:"落樱",
                    mark:true,
                    intro:{
                        name:"落樱",
                        content:"mark",
                    },
                    locked:true,
                },
                Diuse_Luoying:{
                    audio:"ext:术樱:2",
                    usable:2,
                    trigger:{
                        player:"useCardToPlayered",
                    },
                    filter:function (event,player){
                        if(event.getParent().triggeredTargets3.length>1) return false;
                        if(!player.isPhaseUsing()) return false;
                        if(!['basic','trick'].contains(get.type(event.card))) return false;
                        if(get.tag(event.card,'damage')) return true;
                        return false;
                    },
                    content:function (){
                        'step 0'
                        player.chooseTarget(get.prompt('Diuse_Luoying'),function(card,player,target){
                            return _status.event.targets.contains(target);
                        }).set('ai',function(target){
                            return 2-get.attitude(_status.event.player,target);
                        }).set('targets',trigger.targets);
                        'step 1'
                        if(result.bool){
                            var target=result.targets[0];
                            event.target=target;
                            var num7 =target.countMark('Diuse_Ying');
                            if(num7==0)
                            {
                                target.addTempSkill('Diuse_Luoying_mod');
                                player.draw();
                            } else if (num7==1){
                                target.addTempSkill('Diuse_Luoying_attack');
                            }

                        }
                    },
                },
                "Diuse_Luoying_mod":{
                    trigger:{
                        player:"damageEnd",
                    },
                    silent:true,
                    popup:false,
                    forced:true,
                    filter:function (event,player){
                        var num9 = player.countMark('Diuse_Ying');
                        if (num9==0)
                        {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    content:function (){
                        player.addMark('Diuse_Ying',1);
                        player.draw();
                        player.removeSkill('Diuse_Luoying_mod');
                    },
                },
                "Diuse_Luoying_attack":{
                    trigger:{
                        player:"damageBefore",
                    },
                    filter:function (event,player){
                        var num8 = player.countMark('Diuse_Ying');
                        if (num8==1)
                        {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    silent:true,
                    popup:false,
                    forced:true,
                    content:function (){
                        trigger.num++;
                        player.removeMark('Diuse_Ying');
                        player.removeSkill('Diuse_Luoying_attack');
                    },
                },
                Diuse_Yishan:{
                    audio:"ext:术樱:2",
                    trigger:{
                        player:["useCard","respond"],
                    },
                    filter:function (event,player){
                        return event.card.name=='shan';
                    },
                    content:function (){
                        "step 0"
                        player.chooseTarget(get.prompt2('Diuse_Yishan'),function(card,player,target){
                            return target!=player;
                        }).ai=function(target){
                            if(target.hasSkill('hongyan')) return 0;
                            return get.damageEffect(target,_status.event.player,_status.event.player,'thunder');
                        };
                        "step 1"
                        if(result.bool){
                            event.target=result.targets[0];
                            var num10=event.target.countMark('Diuse_Ying');
                            if(num10==0)
                            {
                                event.target.addMark('Diuse_Ying',1);
                            }else {
                                event.target.damage(1);
                                event.target.removeMark('Diuse_Ying',1);
                                player.draw(player.getAttackRange());
                            }
                        }
                    },
                },
                Diuse_Renfan:{
                    audio:"ext:术樱:2",
                    trigger:{
                        player:["useCard","respond"],
                    },
                    direct:true,
                    filter:function (event,player){
                        return event.card.name=='sha';
                    },
                    content:function (){
                        'step 0'
                        player.chooseTarget(get.prompt('Diuse_Renfan'),'你使用或打出杀后，你可以与一名有手牌的角色摸一张牌。若场上有凛，则凛也摸一张。',function(card,player,target){
                            if(player==target) return false;
                            return target.countGainableCards(player,'h')>0;
                        }).set('ai',function(target){
                            return 10-get.attitude(_status.event.player,target);
                        });
                        'step 1'
                        if(result.bool){
                            var target=result.targets[0];
                            player.logSkill('Diuse_Renfan',target);
                            player.line(target,'fire');
                            event.draws=game.filterPlayer(function(current){
                                if(current==target) return true;
                                return ['Diuse_Bachonglin'].contains(current.name)||['Diuse_Bachonglin'].contains(current.name2);
                            });
                            player.draw();
                        }
                        else event.finish();
                        'step 2'
                        game.asyncDraw(event.draws,1);
                        game.delay();
                    },
                },

                //符华
                Diuse_Shanbeng:{
                    audio:"ext:术樱:2",
                    trigger:{player:"useCardToPlayered"},
                    filter:function(event,player){
                        return event.card.name=='sha'&&event.targets.length==1&&player.getExpansions('Diuse_Xunxin').length>0;
                    },
                    content:function (){
                        "step 0"
                        player.chooseCardButton('弃置至多3张标记',[1,3],player.getExpansions('Diuse_Xunxin'),true);
                        "step 1"
                        if(result.links.length==3){
                            if(result.links[result.links.length-1].name==result.links[result.links.length-2].name){ //第三个和第二个比
                                if(result.links[result.links.length-1].name==result.links[result.links.length-3].name){ //如果三个全部相等
                                    player.Diuse_Shanbeng(3,result.links[result.links.length-1].name);
                                } else { //两个相同
                                    player.Diuse_Shanbeng(2,result.links[result.links.length-1].name);
                                    player.Diuse_Shanbeng(1,result.links[result.links.length-3].name);
                                }
                            } else if(result.links[result.links.length-1].name==result.links[result.links.length-3].name){ //第三个和第一个比
                                player.Diuse_Shanbeng(2,result.links[result.links.length-1].name);
                                player.Diuse_Shanbeng(1,result.links[result.links.length-2].name);
                            } else if(result.links[result.links.length-2].name==result.links[result.links.length-3].name){ //第二个和第一个比
                                player.Diuse_Shanbeng(2,result.links[result.links.length-2].name);
                                player.Diuse_Shanbeng(1,result.links[result.links.length-1].name);
                            } else { //都不相同
                                player.Diuse_Shanbeng(1,result.links[result.links.length-1].name);
                                player.Diuse_Shanbeng(1,result.links[result.links.length-2].name);
                                player.Diuse_Shanbeng(1,result.links[result.links.length-3].name);
                            }
                        } else if(result.links.length==2){
                            if(result.links[result.links.length-1].name==result.links[result.links.length-2].name){
                                player.Diuse_Shanbeng(2,result.links[result.links.length-1].name);
                            } else {
                                player.Diuse_Shanbeng(1,result.links[result.links.length-1].name);
                                player.Diuse_Shanbeng(1,result.links[result.links.length-2].name);
                            }
                        } else {
                            player.Diuse_Shanbeng(1,result.links[0].name);
                        }
                        'step 2'
                        var list=[];
                        for(var i=0;i<result.links.length;i++){
                            list.push(result.links[i]);
                        }
                        if(list.length>=1){player.loseToDiscardpile(list);}
                    },
                },
                Shanbeng_same_2_sha:{
                    trigger:{player:"useCardToPlayered",},
                    frequent:true,
                    content:function(){trigger.directHit.addArray(game.players);}
                },
                Shanbeng_same_3_sha:{
                    trigger:{player:"useCardToPlayered",},
                    frequent:true,
                    content:function(){player.getStat().card.sha-=2;trigger.directHit.addArray(game.players);}
                },
                Shanbeng_same_1_shan:{
                    trigger:{source:'damageAfter'},
                    frequent:true,
                    content:function(){player.draw();}
                },
                Shanbeng_same_2_shan:{
                    trigger:{player:"useCardToPlayered",},
                    forced:true,
                    filter:function(event,player){return event.card.name=='sha'&&!event.getParent().directHit.contains(event.target);},
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
                },
                Shanbeng_same_3_shan:{
                    trigger:{player:"useCardToPlayered",},
                    forced:true,
                    filter:function(event,player){return event.card.name=='sha'&&!event.getParent().directHit.contains(event.target);},
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
                        player.draw(2);
                    },
                },
                Shanbeng_same_1_tao:{
                    trigger:{source:'damageAfter'},
                    frequent:true,
                    content:function(){player.recover();}
                },
                Shanbeng_same_2_tao:{
                    trigger:{source:'damageAfter'},
                    frequent:true,
                    content:function(){player.recover();player.draw(2);}
                },
                Shanbeng_same_3_tao:{
                    trigger:{source:'damageAfter'},
                    frequent:true,
                    content:function(){player.recover(2);player.draw(3);}
                },
                Shanbeng_same_1_jiu:{
                    trigger:{source:'damageBegin'},
                    filter:function(event){return event.card&&event.card.name=='sha'&&event.notLink();},
                    forced:true,
                    popup:false,
                    content:function(){trigger.num++;}
                },
                Shanbeng_same_2_jiu:{
                    trigger:{source:'damageBegin'},
                    filter:function(event){return event.card&&event.card.name=='sha'&&event.notLink();},
                    forced:true,
                    popup:false,
                    content:function(){trigger.num+=2;}
                },
                Shanbeng_same_3_jiu:{
                    trigger:{source:'damageBegin'},
                    filter:function(event){return event.card&&event.card.name=='sha'&&event.notLink();},
                    forced:true,
                    popup:false,
                    content:function(){trigger.num+=3;}
                },
                Diuse_Xirang:{
                    mark:true,
                    locked:false,
                    marktext:'岚',
                    intro:{
                        content:function(storage,player,skill){
                            var str='当前通过使用牌摸牌的：';
                            if(player.storage.Xirang){
                                str+=get.translation(player.storage.Xirang);
                            } else {
                                player.storage.Xirang=[];
                                str+='无';
                            }
                            return str;
                        },
                    },
                    group:['Diuse_Xirang_draw','Diuse_Xirang_use','Diuse_Xirang_lose','Diuse_Xirang_cancel'],
                    subSkill:{
                        draw:{
                            audio:"ext:术樱:2",
                            trigger:{player:['phaseDrawSkipped','phaseDrawCancelled']},
                            forced:true,
                            sub:true,
                            content:function(target,player,num)
                            {
                                'step 0'
                                player.chooseControl('从牌堆顶摸两张','从牌堆底摸两张').set('prompt','请选择从何处摸两张牌').set('ai',function(){return '从牌堆顶摸两张';});
                                'step 1'
                                if(result.control=='从牌堆顶摸两张'){player.draw(2);player.draw(1,'bottom');} else {player.draw(2,'bottom');player.draw();}
                            },
                        },
                        use:{
                            audio:"ext:术樱:2",
                            trigger:{player:"useCardAfter"},
                            sub:true,
                            prompt:'是否获得标记并摸牌',
                            filter:function(event,player){
                                var cardList=['sha','shan','tao','jiu'],cardSto=player.storage.Xirang
                                for(var i=0;i<cardList.length;i++){
                                    if(event.card.name==cardList[i]){
                                        if(cardSto==undefined||cardSto==''||cardSto==[]) return true;
                                        for(var j=0;j<cardSto.length;j++){
                                            if(event.card.name==cardSto[j]) return false
                                        }
                                        return true;
                                    }
                                }
                            },
                            content:function(){
                                var sto=player.storage.Xirang
                                if(sto==undefined||sto=='') player.storage.Xirang=[];
                                player.storage.Xirang.add(trigger.card.name);
                                player.draw();
                            },
                        },
                        lose:{
                            audio:"ext:术樱:2",
                            trigger:{player:"phaseDiscardBefore"},
                            sub:true,
                            prompt:'是否移除标记并摸牌',
                            filter:function(event,player){
                                if(player.countCards('h')<=player.hp&&player.storage.Xirang) return true;
                            },
                            content:function(){
                                var stoNum=player.storage.Xirang.length;
                                player.draw(stoNum);
                                stoNum2=parseInt(stoNum/2);
                                if(stoNum2==0) stoNum2=1;
                                player.chooseToDiscard('h',stoNum2,true);
                                player.storage.Xirang=[];
                            }
                        },
                        cancel:{
                            trigger:{player:"phaseDrawBefore"},
                            audio:false,                                    
                            sub:true,
                            forced:true,
                            popup:false,
                            log:false,
                            content:function(){
                                trigger.cancel();
                            },
                        },
                    },
                },
                Diuse_Xunxin:{
                    marktext:"岚",
                    intro:{
                        content:'expansion',
                        markcount:'expansion',
                    },
                    onremove:function(player,skill){
                        var cards=player.getExpansions(skill);
                        if(cards.length) player.loseToDiscardpile(cards);
                    },
                    group:['Diuse_Xunxin_AtkDamage','Diuse_Xunxin_Lose'],
                    subSkill:{
                        AtkDamage:{
                            audio:"ext:术樱:2",
                            trigger:{
                                player:'damageEnd'
                            },
                            sub:true,
                            frequent:true,
                            locked:false,
                            notemp:true,
                            init:function(player){
                                if(!player.storage.Diuse_Xunxin) player.storage.Diuse_Xunxin=[];
                            },
                            filter:function(event){
                                return event.num>0;
                            },
                            content:function(){
                                "step 0"
                                event.xunxinNum=trigger.num;
                                "step 1"
                                event.xunxinNum--;
                                "step 2"
                                player.draw();
                                if(player.countCards('h')){
                                    player.chooseToDiscard('请弃置一张牌',true);
                                }
                                else{
                                    event.goto(3);
                                }
                                "step 3"
                                if(event.xunxinNum>0){
                                    player.chooseBool(get.prompt2('Diuse_Xunxin')).set('frequentSkill','Diuse_Xunxin');
                                }
                                else event.finish();
                                "step 4"
                                if(result.bool){
                                    player.logSkill('Diuse_Xunxin');
                                    event.goto(1);
                                }
                            },
                            ai:{
                                threaten:0.8,
                                effect:{
                                    target:function(card,player,target){
                                        if(get.tag(card,'damage')){
                                            if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
                                            if(!target.hasFriend()) return;
                                        }
                                    }
                                }
                            }
                        },
                        Lose:{
                            audio:"ext:术樱:2",
                            trigger:{player:'loseAfter'},
                            sub:true,
                            init:function(player){
                                if(!player.storage.Diuse_Xunxin) player.storage.Diuse_Xunxin=[];
                            },
                            filter:function(event,player){
                                if(event.type!='discard') return false;
                                for(var i=0;i<event.cards2.length;i++){
                                    if(get.position(event.cards2[i])=='d'){
                                        return true;
                                    }
                                }
                                return false;
                            },
                            direct:true,
                            content:function(event){
                                'step 0'
                                var list=[];
                                for(var i=0;i<trigger.cards2.length;i++){
                                    if(get.position(trigger.cards2[i],true)=='d'&&trigger.cards2[i].name=='sha'||trigger.cards2[i].name=='jiu'||trigger.cards2[i].name=='tao'||trigger.cards2[i].name=='shan'){
                                        list.push(trigger.cards2[i]);
                                    }
                                }
                                if(list.length>=1){
                                    player.addToExpansion(list,'giveAuto',player).gaintag.add('Diuse_Xunxin');
                                }
                            },
                        },
                    },
                },

                //上仙
                Diuse_Xianfa:{
                    audio:"ext:术樱:2",
                    marktext:"仙法",
                    mark:true,
                    intro:{
                        content:function (storage,player,skill){
                            if(!player.countMark('Diuse_Xianfa')) return '未触发“天地”';
                            return '已经修改仙法，且不能再次触发“天地”。';
                        },
                    },
                    trigger:{player:"phaseEnd"},
                    discard:false,
                    content:function(event,player){
                        var num=0;
                        for(var i=0;i<5;i++){
                            if(num>=3){num=3;break;}
                            if(player.isEmpty(i)) num++
                        }
                        'step 0'
                        player.chooseTarget([1,num],get.prompt2('Diuse_Xianfa')).set('ai',function(){
                            var num=[0,1].randomGet();
                            return num;
                        })
                        'step 1'
                        if(result.bool){
                            for(var i=0;i<result.targets.length;i++){
                                result.targets[i].addSkill('Diuse_Yifa');
                            }
                        }
                    },
                    group:["Diuse_Xianfa_Use"],
                    subSkill:{
                        Use:{
                            audio:"Diuse_Xianfa",
                            trigger:{player:"phaseUseBefore"},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                if(player.countMark('Diuse_Xianfa')) return false;
                                for(var i=0;i<game.players.length;i++){
                                    if(game.players[i].hasSkill('Diuse_Yifa')) return true;
                                }
                            },
                            content:function(event,player){
                                for(var i=0;i<game.players.length;i++){
                                    if(game.players[i].hasSkill('Diuse_Yifa')){
                                        game.players[i].removeSkill('Diuse_Yifa');
                                    }
                                }
                                game.log(player,'移除全场“相引”。');
                            },
                        },
                    },
                },
                Diuse_Yifa:{//改名但懒得换名字了
                    marktext:"相引",
                    mark:true,
                    intro:{
                        content:function (storage,player,skill){
                            return '你们的命运已被捆绑';
                        },
                    },
                    trigger:{player:["damageEnd"]},
                    forced:true,
                    content:function(){
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            if(game.players[i].hasSkill('Diuse_Yifa')){
                                game.players[i].removeSkill('Diuse_Yifa');
                                game.players[i].damage(trigger.num,'nosource');
                            }
                        }
                        player.removeSkill('Diuse_Yifa');
                    },
                    group:['Diuse_Yifa_Lose','Diuse_Yifa_Recover','Diuse_Yifa_Max','Diuse_Yifa_loseMax'],
                    subSkill:{
                        Lose:{
                            trigger:{player:["loseHpEnd"]},
                            forced:true,
                            sub:true,
                            content:function(){
                                for(var i=0;i<game.players.length;i++){
                                    if(game.players[i]==player) continue;
                                    if(game.players[i].hasSkill('Diuse_Yifa')){
                                        game.players[i].removeSkill('Diuse_Yifa');
                                        game.players[i].loseHp(trigger.num);
                                    }
                                }
                                player.removeSkill('Diuse_Yifa');
                            },
                        },
                        Recover:{
                            trigger:{player:["recoverEnd"]},
                            forced:true,
                            sub:true,
                            content:function(){
                                for(var i=0;i<game.players.length;i++){
                                    if(game.players[i]==player) continue;
                                    if(game.players[i].hasSkill('Diuse_Yifa')){
                                        game.players[i].removeSkill('Diuse_Yifa');
                                        game.players[i].recover(trigger.num);
                                    }
                                }
                                player.removeSkill('Diuse_Yifa');
                            },
                        },
                        Max:{
                            trigger:{player:["gainMaxHpEnd"]},
                            forced:true,
                            sub:true,
                            content:function(){
                                for(var i=0;i<game.players.length;i++){
                                    if(game.players[i]==player) continue;
                                    if(game.players[i].hasSkill('Diuse_Yifa')){
                                        game.players[i].removeSkill('Diuse_Yifa');
                                        game.players[i].gainMaxHp(trigger.num);
                                    }
                                }
                                player.removeSkill('Diuse_Yifa');
                            },
                        },
                        loseMax:{
                            trigger:{player:["loseMaxHpEnd"]},
                            forced:true,
                            sub:true,
                            content:function(){
                                for(var i=0;i<game.players.length;i++){
                                    if(game.players[i]==player) continue;
                                    if(game.players[i].hasSkill('Diuse_Yifa')){
                                        game.players[i].removeSkill('Diuse_Yifa');
                                        game.players[i].loseMaxHp(trigger.num);
                                    }
                                }
                                player.removeSkill('Diuse_Yifa');
                            },
                        },
                    },
                },
                Diuse_Yinyang:{
                    audio:"ext:术樱:2",
                    trigger:{player:"useCardToPlayered"},
                    usable:1,
                    check:function(event,player){
                        if(get.attitude(player,event.targets[0])>0) return false;
                        return true;
                    },
                    filter:function(event,player){
                        if(event.target==undefined) return false;
                        if(event.target==player||event.targets.length!=1) return false;
                        return true;
                    },
                    content:function(){
                        if(player.isEmpty(1)&&player.isEmpty(2)){
                            var target=trigger.targets;
                            for(var i=0;i<target.length;i++){
                                target[i].addTempSkill('Diuse_Yuansu_Yishang');
                                player.discardPlayerCard(target[i],1,'he',get.prompt('Diuse_Yinyang',target[i]),true).set('ai',function(button){
                                    if(!_status.event.att) return 0;
                                    if(get.position(button.link)=='e'){
                                        if(get.subtype(button.link)=='equip2') return 2*get.value(button.link);
                                        return get.value(button.link);
                                    }
                                    return 1;
                                }).set('att',get.attitude(player,target[i])<=0);
                            }
                            player.draw();
                        } else if(!player.isEmpty(1)&&!player.isEmpty(2)){
                            player.draw();
                        } else if(player.isEmpty(1)){
                            var target=trigger.targets;
                            for(var i=0;i<target.length;i++){
                                player.discardPlayerCard(target[i],1,'he',get.prompt('Diuse_Yinyang',target[i]),true).set('ai',function(button){
                                    if(!_status.event.att) return 0;
                                    if(get.position(button.link)=='e'){
                                        if(get.subtype(button.link)=='equip2') return 2*get.value(button.link);
                                        return get.value(button.link);
                                    }
                                    return 1;
                                }).set('att',get.attitude(player,target[i])<=0);
                            }
                        } else {
                            var target=trigger.targets;
                            for(var i=0;i<target.length;i++){
                                target[i].addTempSkill('Diuse_Yuansu_Yishang',{player:"phaseBefore"});
                            }
                        }
                    },
                },
                Diuse_Tiandi:{
                    audio:"ext:术樱:2",
                    trigger:{player:"phaseZhunbeiBegin"},
                    filter:function(event,player){
                        if(player.storage.Tiandi_Buff==undefined) player.storage.Tiandi_Buff=[];
                        return true;
                    },
                    content:function(){
                        if(player.isEmpty(1)&&player.isEmpty(2)){
                            player.storage.Tiandi_Buff.push(3);
                            player.draw();
                        } else if(player.isEmpty(1)){
                            player.storage.Tiandi_Buff.push(1);
                        } else {
                            player.storage.Tiandi_Buff.push(2);
                            player.draw();
                        }
                        player.storage.Tiandi_Go=true;
                    },
                    mod:{
                        cardUsable:function(card,player,num){if(player.isEmpty(1)&&card.name=='sha') return num+1;},
                        maxHandcardBase:function(player,num){if(player.isEmpty(1)&&player.isEmpty(2)) return num+2;},
                    },
                    ai:{
                        effect:{
                            player:function(player,card){
                                if(get.subtype(card)=='equip1'||get.subtype(card)=='equip2') return -1;
                            },
                        },
                    },
                    group:["Diuse_Tiandi_Jieshu","Diuse_Tiandi_Dying"],
                    subSkill:{
                        Jieshu:{
                            audio:"ext:术樱:2",
                            trigger:{player:"phaseJieshuBegin"},
                            sub:true,
                            filter:function(event,player){
                                if(player.storage.Tiandi_Go==undefined||player.storage.Tiandi_Go!=true) return false;
                                if(player.storage.Tiandi_Buff==undefined) {
                                    player.storage.Tiandi_Buff=[];
                                    return false;
                                }
                                return true;
                            },
                            content:function(){
                                'step 0'
                                player.chooseTarget(get.prompt('Diuse_Tiandi'),'选择一名其他角色',function(event,player,target){
                                    return player!=target;
                                }).set('ai',function(target){
                                    if(get.attitude(_status.event.player,target)>=0){
                                        return true;
                                    } else {return false;}
                                });
                                'step 1'
                                if(result.bool){
                                    var lengthStor=player.storage.Tiandi_Buff;
                                    if(lengthStor[0]==3){
                                        result.targets[0].addTempSkill('Diuse_Tiandi_A',{player:"phaseAfter"});
                                        result.targets[0].draw();
                                    } else if(lengthStor[0]==1){
                                        result.targets[0].addTempSkill('Diuse_Tiandi_B',{player:"phaseAfter"});
                                    } else {
                                        result.targets[0].draw();
                                    }
                                }
                                'step 2'
                                player.storage.Tiandi_Go=false;
                                player.storage.Tiandi_Buff=[];
                            },
                        },
                        Dying:{
                            audio:"Diuse_Tiandi_Jieshu",
                            trigger:{player:"dyingBegin"},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                if(!player.countMark('Diuse_Xianfa')) return true;
                                return false;
                            },
                            content:function(){
                                player.addMark('Diuse_Xianfa');
                                player.recover(1-player.hp);
                            },
                        },
                    },
                },
                Diuse_Tiandi_A:{
                    marktext:"仙法",
                    mark:true,
                    locked:true,
                    intro:{
                        content:function(storage,player,skill){
                            return "使用【杀】的次数+1，手牌上限+2。";
                        }
                    },
                    mod:{cardUsable:function(card,player,num){if(card.name=='sha') return num+1;},maxHandcardBase:function(player,num){return num+2;},},
                },
                Diuse_Tiandi_B:{
                    marktext:"仙法",
                    mark:true,
                    locked:true,
                    intro:{
                        content:function(storage,player,skill){
                            return "使用【杀】的次数+1。";
                        }
                    },
                    mod:{cardUsable:function(card,player,num){if(card.name=='sha') return num+1;},},
                },

                //识之律者
                Diuse_Bingren:{
                    group:['Diuse_Bingren_equip','Diuse_Bingren_lose'],
                    subSkill:{
                        equip:{
                            audio:"ext:崩坏3:2",
                            trigger:{
                                player:"equipAfter",
                            },
                            filter:function (event,player){
                                return get.subtype(event.card)=='equip1';
                            },
                            forced:true,
                            sub:true,
                            content:function (){
                                var Br1=player.getAttackRange();
                                if (Br1==1){
                                    player.draw();
                                } else {
                                    player.draw(parseInt(Br1/2));
                                }
                                switch(Br1)
                                {
                                    case 1:player.addSkill('Diuse_Yi');break;
                                    case 2:player.addSkill('Diuse_Er');break;
                                    case 3:player.addSkill('Diuse_San');break;
                                    case 4:player.addSkill('Diuse_Si');break;
                                    case 5:player.addSkill('Diuse_Wu');break;
                                    case 6:player.addSkill('Diuse_Yi');player.addSkill('Diuse_Er');player.addSkill('Diuse_San');player.addSkill('Diuse_Si');player.addSkill('Diuse_Wu');break;
                                    default: return 0;
                                }
                            },
                        },
                        lose:{
                            trigger:{
                                player:"loseAfter",
                                global:["equipAfter","addJudgeAfter","gainAfter","loseAsyncAfter"],
                            },
                            sub:true,
                            filter:function(event,player){
                                if(player.hasSkill('Diuse_Yi')||player.hasSkill('Diuse_Er')||player.hasSkill('Diuse_San')||player.hasSkill('Diuse_Si')||player.hasSkill('Diuse_Wu')){
                                    if(player.isEmpty(1)) {
                                        return true;
                                    }
                                    return false;
                                }
                            },
                            forced:true,
                            content:function(){
                                player.removeSkill('Diuse_Yi');
                                player.removeSkill('Diuse_Er');
                                player.removeSkill('Diuse_San');
                                player.removeSkill('Diuse_Si');
                                player.removeSkill('Diuse_Wu');
                            },
                        },
                    },
                },
                Diuse_Yi:{
                    group:['Diuse_Yi_Use1','Diuse_Yi_Draw1'],
                    subSkill:{
                        Use1:{
                            marktext:"一",
                            mark:true,
                            intro:{
                                content:function (storage,player,skill){
                                return '如果该值大于5,回合结束将手牌补至5张。'
                                },
                            },
                            locked:true,
                            audio:"ext:术樱:4",
                            trigger:{
                                player:"useCardToPlayered",
                            }, 
                            frequent:true,
                            sub:true,
                            filter:function(event,player){
                                if(!event.targets) return false;
                                if(!event.isFirstTarget) return false;
                                return true;
                            },
                            content:function(){
                                'step 0'
                                var Diuse_Yi_Equip1 = player.getEquip(1);
                                var next=player.chooseToDiscard('he',function(card,player){
                                    return card!=Diuse_Yi_Equip1;
                                },get.prompt(event.name,trigger.player),'弃置一张牌后摸一张牌');
                                'step 1'
                                if(result.bool) 
                                {
                                    player.draw();
                                    player.addMark('Diuse_Yi_Use1',1);
                                }
                            },
                        },
                        Draw1:{
                            audio:"ext:术樱:2",
                            trigger:{
                                player:"phaseAfter",
                            },
                            frequent:true,
                            sub:true,
                            filter:function (event,player){
                                var Diuse_Draw1=event.player.countMark('Diuse_Yi_Use1')
                                if(Diuse_Draw1>=1) return true;
                            },  
                            content:function(){
                                var Disue_Draw2=player.countMark('Diuse_Yi_Use1')
                                if (Disue_Draw2>=5)
                                {
                                    player.draw(player.maxHp-player.countCards('h'));
                                    player.removeMark('Diuse_Yi_Use1',player.countMark('Diuse_Yi_Use1'));
                                }   else {
                                    player.removeMark('Diuse_Yi_Use1',player.countMark('Diuse_Yi_Use1'));
                                }
                                player.unmarkSkill('Diuse_Yi_Use1')
                            },
                        },
                    },
                },
                Diuse_Er:{
                    audio:"ext:术樱:3",
                    forced:true,
                    trigger:{
                        player:"gainAfter",
                    },
                    filter:function (event,player){
                        if(_status.currentPhase!=player) return false;
                        return event.getParent(2).name!='Diuse_Er';
                    },
                    content:function (){
                        player.draw();
                    },
                },
                Diuse_San:{
                    audio:"ext:术樱:3",
                    forced:true,
                    usable:2,
                    trigger:{
                        source:"damageSource",
                    },
                    filter:function(event,player){
                        return event.getParent(2).name!='Diuse_San';
                    },
                    content:function(){
                        "step 0"
                        player.chooseTarget(get.prompt('Diuse_San'),'选择一名角色受到无伤害来源的伤害').set('ai',function(target){
                            if(get.attitude(_status.event.player,target)<=0){
                                return true;
                            } else {return false;}
                        });
                        "step 1"
                        if(result.bool){
                            var target=result.targets[0];
                            target.damage(1,'nosource'); 
                        }
                    },
                },
                Diuse_Si:{
                    audio:"ext:术樱:2",
                    forced:true,
                    trigger:{
                        player:"useCard2",
                    },
                    filter:function(event,player){
                        if(event.card.name!='sha'&&get.type(event.card)!='trick') return false;
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
                        else{
                            var Wu1= player.maxHp;
                            var Wu2 = Wu1-player.hp;
                            if(Wu2==0)
                            {
                                player.draw();
                            }else{
                                player.draw(Wu2);
                            }
                            event.finish();
                        }
                        'step 2'
                        if(event.targets){
                            player.logSkill(event.name,event.targets);
                            trigger.targets.addArray(event.targets);
                        }
                    },
                },
                Diuse_Wu:{
                    audio:"ext:术樱:2",
                    usable:1,
                    trigger:{
                        player:"useCardToPlayered",
                    },
                    filter:function (event,player){
                        if(event.getParent().triggeredTargets3.length>1) return false;
                        if(!player.isPhaseUsing()) return false;
                        if(!['basic','trick'].contains(get.type(event.card))) return false;
                        if(get.tag(event.card,'damage')) return true;
                        return false;
                    },
                    content:function (){
                        'step 0'
                        player.chooseTarget(get.prompt('Diuse_Wu'),function(card,player,target){
                            return _status.event.targets.contains(target);
                        }).set('ai',function(target){
                            return 2-get.attitude(_status.event.player,target);
                        }).set('targets',trigger.targets);
                        'step 1'
                        if(result.bool){
                            var target=result.targets[0];
                            event.target=target;
                            var num=target.hp
                            if(num>5) num=5;
                            player.draw(num);
                        }
                    },
                },
                Diuse_Fanchen:{
                    audio:"ext:术樱:3",
                    usable:1,
                    trigger:{
                        player:"damageEnd",
                    },
                    filter:function(event,player){
                        return _status.currentPhase!=player;
                    },
                    forced:true,
                    content:function(event,player){
                        "step 0"
                        player.chooseControl('恢复一点体力','体力变为1','取消').set('prompt','恢复一点体力或体力变为1').set('ai',function(){
                            if(player.countCards('h','shan')>=1&&player.hp>1)
                            {
                                return '体力变为1';
                            } else {
                                return '恢复一点体力';
                            }
                        });
                        "step 1"
                        if(result.control=='恢复一点体力'){
                            player.recover();
                        } else {
                            var Fan1 = player.hp-1;
                            player.addMark('Diuse_Wuli_Yishang_Mark',Fan1);
                            player.addTempSkill('Diuse_Wuli_Yishang');
                            player.loseHp(Fan1);
                            player.addSkill('Diuse_Fanchen1');
                        }
                    },
                    ai:{
                        effect:{
                            target:function (card,player,target){
                                if(get.tag(card,'damage')&&_status.currentPhase!=target){
                                    if(player.hasSkillTag('jueqing',false,target)) return [1,-1.5];
                                    return [1,0.5];
                                }
                            },
                        },
                    },
                },
                Diuse_Fanchen1:{
                    audio:"ext:术樱:3",
                    trigger:{
                        global:"phaseJieshuAfter",
                    },
                    silent:true,
                    forced:true,
                    popup:false,
                    content:function(){
                        if(player.storage.Diuse_Wuli_Yishang_Mark){
                            trigger.player.logSkill('Diuse_Fanchen1');
                            trigger.player.line(player);
                            var Fan2 = player.countMark('Diuse_Wuli_Yishang_Mark')
                            player.recover(Fan2);
                            player.draw(Fan2);
                            player.removeMark('Diuse_Wuli_Yishang_Mark',Fan2);
                            player.unmarkSkill('Diuse_Wuli_Yishang_Mark');
                        }
                        player.removeSkill('Diuse_Fanchen1');
                    },
                },
                Diuse_Zhejian:{
                    mod:{
                        canBeDiscarded:function (card){
                            if(get.position(card)=='e'&&['equip1'].contains(get.subtype(card))) return false;
                        },
                        canBeGained:function (card){
                            if(get.position(card)=='e'&&['equip1'].contains(get.subtype(card))) return false;
                        },      
                    },
                },

                //芽衣
                Diuse_Leiming:{
                    trigger:{player:'useCardAfter'},
                    audio:false,
                    direct:true,
                    init:function(player){
                        player.storage.Diuse_Leiming=0;
                    },
                    filter:function(event,player){
                        var num=player.storage.Diuse_Leiming;
                        if(num>=3||!player.countCards('hs')) return false;
                        if(!event.targets||!event.targets.length||!event.isPhaseUsing(player)||player.countCards('h',{name:'sha'})<=0) return false;
                        var history=player.getHistory('useCard');
                        var index=history.indexOf(event)-1;
                        if(index<0) return false;
                        var evt=history[index];
                        if(!evt||!evt.targets||!evt.targets.length||!evt.isPhaseUsing(player)||player.countCards('h',{name:'sha'})<=0) return false;
                        for(var i=0;i<event.targets.length;i++){
                            if(evt.targets.contains(event.targets[i])&&lib.filter.filterTarget({name:'sha'},player,event.targets[i])) return true;
                        }
                        return false;
                    },
                    content:function(){
                        var targets=player.getLastUsed(1).targets;
                        var next=player.chooseToUse();
                        next.set('targets',game.filterPlayer(function(current){
                            return targets.contains(current)&&trigger.targets.contains(current);
                        }));
                        next.set('openskilldialog',get.prompt('Diuse_Leiming'));
                        next.set('norestore',true);
                        next.set('_backupevent','Diuse_Leiming_Buff');
                        next.set('custom',{
                            add:{},
                            replace:{window:function(){}}
                        });
                        next.backup('Diuse_Leiming_Buff');
                    },
                    group:"Diuse_Leiming_Phase",
                    subSkill:{
                        Phase:{
                            trigger:{player:"phaseUseBegin"},
                            silent:true,
                            popup:false,
                            firstDo:true,
                            forced:true,
                            sub:true,
                            content:function(){
                                player.storage.Diuse_Leiming=0;
                            }
                        },
                    },
                },
                Diuse_Leiming_Buff:{
                    audio:"ext:术樱:3",
                    filterCard:function(card){
                        return get.itemtype(card)=='card'&&get.name(card)=='sha';
                    },
                    charlotte:true,
                    position:"h",
                    viewAs:{name:"sha",nature:'thunder'},
                    filterTarget:function(card,player,target){
                        return _status.event.targets&&_status.event.targets.contains(target)&&lib.filter.filterTarget.apply(this,arguments);
                    },
                    prompt:"将一张手牌当雷【杀】使用",
                    check:function(card){return 7-get.value(card)},
                    onuse:function(links,player){player.storage.Diuse_Leiming++},
                },
                Diuse_Yingren:{
                    audio:false,
                    marktext:"影",
                    mark:true,
                    locked:true,
                    intro:{
                        content:function(storage,player,skill){
                            var num=player.countMark('Diuse_Yingren');
                            if(num==undefined) num=0;
                            return "共有"+num+"个影刃标记";
                        }
                    },
                    trigger:{
                        global:"gameDrawAfter",
                        player:"enterGame",
                    },
                    forced:true,
                    content:function(){
                        player.addMark('Diuse_Yingren',2);
                    },
                    group:["Diuse_Yingren_Game","Diuse_Yingren_Shan","Diuse_Yingren_Use"],
                    subSkill:{
                        Game:{
                            trigger:{global:"roundStart"},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                return player.countMark('Diuse_Yingren')<2;
                            },
                            content:function(){
                                player.addMark('Diuse_Yingren');
                            }
                        },
                        Shan:{
                            audio:"ext:术樱:2",
                            trigger:{player:["useCard","respond"]},
                            sub:true,
                            filter:function(event,player){
                                if(!player.countMark('Diuse_Yingren')&&player.countCards('h',function(card){
                                    return get.name(card)=='sha';
                                })==0) return false;
                                return event.card.name=='shan';
                            },
                            content:function(){
                                'step 0'
                                var num=player.countMark('Diuse_Yingren');
                                var target=_status.currentPhase;
                                event.cards=[];
                                player.countCards('h',function(card){
                                    if(get.name(card)=='sha') event.cards.add(card);
                                });
                                if(num){
                                    player.chooseUseTarget({name:"sha",nature:'thunder'},'是否视为使用一张雷【杀】？',false);
                                    event.bool=true;
                                } else {
                                    player.useCard(target,false,event.cards.randomGet());
                                }
                                'step 1'
                                if(result.bool&&event.bool){
                                    player.removeMark('Diuse_Yingren');
                                } else {
                                    event.finish();
                                }
                            }
                        },
                        Use:{
                            audio:"Diuse_Yingren_Shan",
                            enable:"phaseUse",
                            sub:true,
                            filter:function(event,player){
                                return player.countMark('Diuse_Yingren');
                            },
                            content:function(){
                                'step 0'
                                player.chooseUseTarget({name:"sha",nature:'thunder'},'是否视为使用一张雷【杀】？',false);
                                event.bool=true;
                                'step 1'
                                if(result.bool&&event.bool){
                                    player.removeMark('Diuse_Yingren');
                                } else {
                                    event.finish();
                                }
                            },
                            ai:{
                                order:7,
                                threaten:1.1,
                            },
                        },
                    },
                },
                Diuse_Yvlei:{
                    audio:"ext:术樱:2",
                    enable:"phaseUse",
                    diuse_sp:true,
                    filter:function(event,player){
                        var num=player.countMark('Diuse_SP');
                        if(num==undefined) num=0;
                        if(player.storage.Diuse_Yvlei_Buff) return false;
                        if((num-100)>=0) return true;
                        return false;
                    },
                    init:function(player){
                        player.storage.Diuse_Yvlei=0;
                        player.storage.Diuse_Yvlei_Buff=false;
                    },
                    content:function(){
                        var num=Math.abs(player.maxHp-player.countCards('h'));
                        player.draw(num);
                        player.storage.Diuse_Leiming=0;
                        player.storage.Diuse_Yvlei+=20;
                        player.storage.Diuse_Yvlei_Buff=true;
                        player.removeMark('Diuse_SP',20);
                    },
                    mod:{
                        targetInRange:function(card,player){
                            if(player.storage.Diuse_Yvlei_Buff) return true;
                        }
                    },
                    group:['Diuse_SP_useCard','Diuse_SP_damage','Diuse_Yvlei_Buff'],
                    subSkill:{
                        Buff:{
                            trigger:{source:"damageBegin"},
                            forced:true,
                            filter:function(event,player){return event.nature=='thunder'&&player.storage.Diuse_Yvlei_Buff},
                            content:function(){trigger.num++;}
                        },
                        Use:{
                            trigger:{player:"useCardToTargeted"},
                            forced:true,
                            filter:function(event,player){
                                if(get.tag(event.card,'damage')&&player.storage.Diuse_Yvlei_Buff) return true;
                                return false;
                            },
                            content:function(){
                                player.removeMark('Diuse_SP',10);
                                player.storage.Diuse_Yvlei+=10;
                                if(player.storage.Diuse_Yvlei>=100){ player.storage.Diuse_Yvlei_Buff=false; }
                            },
                        },
                    },
                },

                //月下
                Diuse_Xueqi_Mark:{
                    marktext:"契",
                    mark:true,
                    intro:{
                        content:function (storage,player,skill){
                        return '你已经被定下契约，时刻准备贡献你的鲜血吧！'
                        },
                    },
                    locked:true,
                },
                Diuse_Xueqi:{
                    group:['Diuse_Xueqi_Gamego','Diuse_Xueqi_Damage'],
                    subSkill:{
                        Gamego:{
                            audio:"ext:术樱:2",
                            trigger:{global:"gameDrawAfter"},
                            forced:true,
                            sub:true,
                            content:function(){
                                for(var i=0;i<game.players.length;i++){
                                    if(game.players[i]==player){
                                        if(game.players[i].hp>1) game.players[i].loseHp(game.players[i].hp-1);
                                        continue;
                                    }
                                    game.players[i].addMark('Diuse_Xueqi_Mark',1);
                                }
                            },
                        },
                        Damage:{
                            audio:"ext:术樱:3",
                            trigger:{player:['changeHp','loseMaxHpAfter','gainMaxHpAfter']},
                            forced:true,
                            sub:true,
                            content:function(){
                                if(player.countCards('h')==0){
                                    player.draw(Math.abs(trigger.num)+1);
                                }
                                else{
                                    player.draw(Math.abs(trigger.num));
                                }
                                if(player.hp>1) player.loseHp(player.hp-1);
                            },
                        },
                    },
                },
                Diuse_Shenshi:{
                    group:['Diuse_Shenshi_H','Diuse_Shenshi_Die'],
                    subSkill:{
                        H:{
                            sub:true,
                            mod:{
                                maxHandcardBase:function(player,num){
                                    var Marknum=0
                                    for(var i=0;i<game.players.length;i++){
                                        if(game.players[i].countMark('Diuse_Xueqi_Mark')) Marknum+=game.players[i].countMark('Diuse_Xueqi_Mark');
                                    }
                                    return player.maxHp+Marknum;
                                },
                            },
                        },
                        Die:{
                            audio:"ext:术樱:2",
                            trigger:{player:"dyingBegin"},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                var bool=game.hasPlayer(function(current){
                                    return current.hasMark('Diuse_Xueqi_Mark');
                                });
                                if(bool) return true;
                            },
                            content:function(){
                                'step 0'
                                player.chooseTarget(get.prompt('Diuse_Xueqi'),function(card,player,target){
                                    return target!=player&&target.hasMark('Diuse_Xueqi_Mark');
                                }).set('ai',function(target){
                                    return get.attitude(_status.event.player,target);
                                });
                                'step 1'
                                if(result.bool){
                                    var Marknum = result.targets[0].countMark('Diuse_Xueqi_Mark');
                                    result.targets[0].removeMark('Diuse_Xueqi_Mark',Marknum);
                                    result.targets[0].unmarkSkill('Diuse_Xueqi_Mark');
                                    player.recover(Marknum);
                                }
                            },
                        },
                    },
                },
                Diuse_Shoulie:{
                    group:['Diuse_Shoulie_Damage','Diuse_Shoulie_Draw'],
                    subSkill:{
                        Damage:{
                            audio:"ext:术樱:2",
                            trigger:{source:'damageBefore'},
                            forced:true,
                            sub:true,
                            content:function(){
                                trigger.player.addMark('Diuse_Xueqi_Mark',trigger.num);
                                trigger.cancel();
                            },
                        },
                        Draw:{
                            audio:"ext:术樱:2",
                            trigger:{global:'phaseUseBefore'},
                            filter:function(event,player){
                                return event.player.countMark('Diuse_Xueqi_Mark')>1;
                            },
                            forced:true,
                            sub:true,
                            content:function(){
                                var Marknum=trigger.player.countMark('Diuse_Xueqi_Mark');
                                trigger.player.loseHp(Marknum-1);
                                trigger.player.removeMark('Diuse_Xueqi_Mark',Marknum-1);
                                player.recover(Marknum-1);
                            },
                        },
                    },
                },

                //空之律者
                Diuse_Qujian:{
                    forbid:['boss'],
                    audio:"ext:术樱:2",
                    trigger:{player:["useCard","respond"],},
                    forced:true,
                    filter:function (event,player){
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i].hasSkill('Diuse_Shikong')) return false;
                        }
                        return event.card.name=='shan';
                    },
                    content:function(){
                        'step 0'
                        player.chooseTarget(get.prompt2('Diuse_Qujian'),function(card,player,target){
                            return target!=player;
                        }).set('ai',function(target){
                            return 2-get.attitude(_status.event.player,target);
                        });
                        'step 1'
                        if(result.bool){
                            var target=result.targets[0];
                            target.disableSkill('Diuse_Qujian',lib.character[target.name][3]);
                            target.addSkill('Diuse_Shikong');
                            target.addMark('Diuse_Shikong',1);
                            target.storage.Qujian=player;
                            player.addMark('Diuse_SP',35);
                            player.addMark('Diuse_Yakong',1);
                        }
                    },
                    subSkill:{
                        Use:{audio:"ext:术樱:2",},
                    },
                },
                Diuse_Shikong:{
                    marktext:"时空",
                    mark:true,
                    intro:{
                        name:"时空区间",
                        content:function(storage,player,skill){
                            return '暂时失去武将卡牌上的技能且无法使用或打出牌。';
                        },
                    },
                    locked:true,
                    trigger:{player:"damageBegin4"},
                    forced:true,
                    content:function(){
                        var num=trigger.num;
                        trigger.cancel();
                        player.addMark('Diuse_Shikong',num);
                    },
                    mod:{
                        cardEnabled2:function(card,player){
                            return false;
                        },
                    },
                    group:['Diuse_Shikong_Use'],
                    subSkill:{
                        Use:{
                            audio:"Diuse_Qujian_Use",
                            trigger:{player:"phaseUseBegin"},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                return player.countMark('Diuse_Shikong');
                            },
                            content:function(){
                                var markNum=player.countMark('Diuse_Shikong');
                                var sto=player.storage.Qujian;
                                var markNum2=markNum;
                                if(!sto) event.finish();

                                player.enableSkill('Diuse_Qujian');
                                player.removeMark('Diuse_Shikong',markNum2);
                                player.unmarkSkill('Diuse_Shikong');
                                player.removeSkill('Diuse_Shikong');
                                markNum--;
                                player.damage(Math.floor(markNum/2),sto);
                            }
                        },
                    },
                },
                Diuse_Yakong:{
                    marktext:"亚空",
                    mark:true,
                    intro:{
                        name:"亚空之矛",
                        content:"mark",
                    },
                    locked:true,
                    audio:"ext:术樱:3",
                    trigger:{source:"damageAfter"},
                    forced:true,
                    filter:function(event,player){
                        if(player.hasSkill('Diuse_Yakong_Buff')) return false;
                        return true;
                    },
                    content:function(){
                        var num=trigger.num;
                        player.addMark('Diuse_Yakong',num);
                    },
                    group:['Diuse_Yakong_Use'], //Use改成Zhunbei 名字不改
                    subSkill:{
                        Use:{
                            audio:"ext:术樱:2",
                            trigger:{player:"phaseZhunbeiBegin"},
                            sub:true,
                            filter:function(event,player){
                                if(player.hasSkill('Diuse_Yakong_Buff')) return false;
                                return player.countMark('Diuse_Yakong')>=3;
                            },
                            check:function(){
                                return true;
                            },
                            content:function(){
                                var num=player.hp-player.countCards('h');
                                if(num>5) num=5;
                                player.draw(num);
                                player.addSkill('Diuse_Yakong_Buff');
                            },
                        },
                    },
                },
                Diuse_Yakong_Buff:{
                    trigger:{player:"useCard"},
                    charlotte:true,
                    forced:true,
                    popup:false,
                    filter:function(event,player){
                        var num=player.countMark('Diuse_Yakong');
                        if(num==undefined) num=0;
                        return num;
                    },
                    content:function(){
                        if(get.tag(trigger.card,'damage')){
                            trigger.baseDamage+=1;
                            var randomNum=game.Diuse_randomNum(100,0);
                            if(randomNum>=50){
                                game.playAudio('..','extension\\术樱','Diuse_Yakong_Buff3');
                            } else {game.playAudio('..','extension\\术樱','Diuse_Yakong_Buff4');}
                        } else {
                            player.draw();
                            var randomNum=game.Diuse_randomNum(100,0);
                            if(randomNum>=50){
                                game.playAudio('..','extension\\术樱','Diuse_Yakong_Buff1');
                            } else {game.playAudio('..','extension\\术樱','Diuse_Yakong_Buff2');}
                        }
                        player.removeMark('Diuse_Yakong',1);
                        var num=player.countMark('Diuse_Yakong');
                        if(num==0||num==undefined) player.removeSkill('Diuse_Yakong_Buff');
                    }
                },
                Diuse_Xujie:{
                    audio:"ext:术樱:1",
                    enable:"phaseUse",
                    diuse_sp:true,
                    filter:function(event,player){
                        var num=player.countMark('Diuse_SP');
                        if(num==undefined) num=0;
                        if((num-150)>=0) return true;
                        return false;
                    },
                    content:function (event,player,targets){
                        var num=0;
                        player.removeMark('Diuse_SP',150);
                        for(var i=0;i<game.players.length;i++){
                            if(game.players.hp==Infinity) continue;
                            num=num+game.players[i].hp;
                        }
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i]==player) continue;
                            var randnum=game.Diuse_randomNum(num,0);
                            if(randnum==0) continue;
                            randnum=Math.floor(randnum/game.players.length);
                            if(randnum==0) randnum=1;
                            game.players[i].damage(randnum);
                            num-=randnum;
                        }     
                        player.addMark('Diuse_Yakong',10);   
                        
                        if(player.hasSkill('Diuse_Caidan_End')&&player.countMark('Diuse_SP')<150) player.removeSkill('Diuse_Caidan_End');  //移除彩蛋;
                    },
                    ai:{
                        order:9,
                        result:{
                            target:function (player,target){
                                var numj=target.countCards('j');
                                var numhe=target.countCards('he');
                                if(numhe==0) return numj>0?6:-6;
                                return -6-(numj+1)/numhe;
                            },
                        },
                        threaten:1.1,
                    },
                    group:['Diuse_SP_useCard','Diuse_SP_damage'],
                },

                //彼岸双生
                Diuse_Mingan_End:{},
                Diuse_Mingan:{
                    audio:false,
                    enable:"phaseUse",
                    filter:function(event,player){
                        return player.countCards('h')&&!player.hasSkill('Diuse_Mingan_End');
                    },
                    content:function(){
                        'step 0'
                        if(player.name=='Diuse_Heixi'){
                            if(player.storage.Diuse_renge==undefined||player.storage.Diuse_renge){
                                var num=[0,1].randomGet();
                                if(num){
                                    game.playAudio('..','extension\\术樱','Diuse_Mingan11');
                                } else {
                                    game.playAudio('..','extension\\术樱','Diuse_Mingan12');
                                }
                            } else{
                                var num=[0,1].randomGet();
                                if(num){
                                    game.playAudio('..','extension\\术樱','Diuse_Mingan21');
                                } else {
                                    game.playAudio('..','extension\\术樱','Diuse_Mingan22');
                                }
                            }
                        }
                        'step 1'
                        player.chooseCard('h','请选择要放置牌堆底的牌',true);
                        'step 2'
                        if(result.bool){
                            ui.cardPile.appendChild(result.cards[0]);
                            game.updateRoundNumber();

                            if(player.countCards('h')==0){
                                player.draw(2);
                            } else {
                                player.draw();
                            }
                        }
                        game.log(player,'将一张手牌置于牌堆底');

                        if(player.storage.Diuse_renge==undefined||player.storage.Diuse_renge){
                            player.recover();
                        } else {
                            player.chooseUseTarget({name:'sha'},'是否视为使用一张【杀】？',true);
                        }
                        'step 3'
                        player.addTempSkill('Diuse_Mingan_End','phaseUseEnd');
                    },
                    ai:{
                        order:5,
                        threaten:0.5,
                        result:{
                            player:function (player,target){
                                return 1;
                            },
                        },
                    },
                },
                Diuse_Baihei:{
                    auido:false,
                    group:['Diuse_Bai','Diuse_Hei','Diuse_Heixi_PhaseBefore'],
                    preHidden:['Diuse_Bai','Diuse_Hei','Diuse_Heixi_PhaseBefore'],
                    mod:{
                        maxHandcardBase:function(player,num){
                            if(player.storage.Diuse_renge==undefined||player.storage.Diuse_renge) return num+2;
                        },
                        cardUsable:function(card,player,num){
                            var num1=player.storage.Diuse_Hei;
                            if(card.name=='sha') return num+num1;
                        },
                    },
                },
                Diuse_Heixi_PhaseBefore:{
                    auido:false,
                    forced:true,
                    popup:false,
                    trigger:{player:"phaseUseBefore"},
                    content:function(){
                        player.storage.Diuse_Hei=0;
                    },
                },
                Diuse_Bai:{
                    audio:false,
                    marktext:"白昼",
                    mark:true,
                    intro:{
                        content:function (storage,player,skill){
                            return '当产生共鸣时，就会有着奇怪的现象。';
                        },
                    },
                    trigger:{source:"damageAfter"},
                    forced:true,
                    filter:function(event,player){
                        if(player.storage.Diuse_renge==undefined||player.storage.Diuse_renge){
                            return player!=event.player;
                        }
                        return false;
                    },
                    content:function(){
                        'step 0'
                        if(player.name=='Diuse_Heixi'){
                            var num=[0,1,2].randomGet();
                            if(num==0){
                                game.playAudio('..','extension\\术樱','Diuse_Bai1');
                            } else if(num==1){
                                game.playAudio('..','extension\\术樱','Diuse_Bai2');
                            } else {
                                game.playAudio('..','extension\\术樱','Diuse_Bai3');
                            }
                        }
                        'step 1'
                        if(trigger.player.countMark('Diuse_Bai')){
                            if(trigger.player.countCards('h')){
                                trigger.player.chooseControl('弃一张','摸一张').set('prompt','请选择弃一张手牌或令'+get.translation(player)+'摸一张牌').set('ai',function(){
                                    if(get.attitude(trigger.player,player)>=2) return '摸一张';
                                    return '弃一张';
                                });
                                event.baiBool=true;
                                trigger.player.removeMark('Diuse_Bai',1);
                                trigger.player.unmarkSkill('Diuse_Bai');
                            } else {
                                trigger.player.chooseControl('摸一张').set('prompt','请选择弃一张手牌或令'+get.translation(player)+'摸一张牌').set('ai',function(){
                                    return '摸一张';
                                });
                                event.baiBool=true;
                                trigger.player.removeMark('Diuse_Bai',1);
                                trigger.player.unmarkSkill('Diuse_Bai');
                            }
                        } else if(trigger.player.countMark('Diuse_Hei')){
                            player.draw();
                            trigger.player.removeMark('Diuse_Hei',1);
                            trigger.player.unmarkSkill('Diuse_Hei');
                        } else {
                            trigger.player.addMark('Diuse_Bai');
                        }
                        'step 2'
                        if(result.control=='弃一张'){
                            game.log(trigger.player,'发动','#g【白昼】','，弃置一张手牌');
                            player.line(trigger.player);
                            trigger.player.chooseToDiscard('h',1,true);
                        }
                        if(result.control=='摸一张'){
                            trigger.player.line(player);
                            player.draw();
                        }
                        'step 3'
                        if(trigger.player.isEmpty(2)&&event.baiBool){
                            player.moveCard(true);
                            event.baiBool=false;
                        }
                    },
                },
                Diuse_Hei:{
                    marktext:"黑夜",
                    mark:true,
                    intro:{
                        content:function (storage,player,skill){
                            return '黑夜最适合进行共鸣之事了';
                        },
                    },
                    trigger:{source:"damageAfter"},
                    forced:true,
                    filter:function(event,player){
                        if(player.storage.Diuse_renge==false){
                            return player!=event.player;
                        }
                        return false;
                    },
                    content:function(){
                        'step 0'
                        if(player.name=='Diuse_Heixi'){
                            var num=[0,1,2].randomGet();
                            if(num==0){
                                game.playAudio('..','extension\\术樱','Diuse_Hei1');
                            } else if(num==1){
                                game.playAudio('..','extension\\术樱','Diuse_Hei2');
                            } else {
                                game.playAudio('..','extension\\术樱','Diuse_Hei3');
                            }
                        }

                        if(trigger.player.countMark('Diuse_Bai')){
                            player.draw();
                            trigger.player.removeMark('Diuse_Bai',1);
                            trigger.player.unmarkSkill('Diuse_Bai');
                        } else if(trigger.player.countMark('Diuse_Hei')){
                            if(trigger.player.countCards('h')){
                                player.chooseControl('弃一张','摸一张').set('prompt','请选择摸一张牌或令'+get.translation(trigger.player)+'弃一张牌').set('ai',function(){
                                    return '摸一张';
                                });
                            } else {
                                player.chooseControl('摸一张').set('prompt','请选择摸一张牌或令'+get.translation(trigger.player)+'弃一张牌').set('ai',function(){
                                    return '摸一张';
                                });
                            }
                            if(!trigger.player.isEmpty(2)){
                                player.storage.Diuse_Hei++;
                            }
                            trigger.player.removeMark('Diuse_Hei',1);
                            trigger.player.unmarkSkill('Diuse_Hei');
                        } else {
                            trigger.player.addMark('Diuse_Hei');
                        }
                        'step 1'
                        if(result.control=='弃一张'){
                            trigger.player.chooseToDiscard('h',1,true);
                        } else if(result.control=='摸一张'){
                            player.draw();
                        }
                    },
                },
                Diuse_Danzhong:{
                    enable:"phaseUse",
                    diuse_sp:true,
                    filter:function(event,player){
                        return player.countMark('Diuse_SP')>=100;
                    },
                    content:function(){
                        if(player.hasSkill('Diuse_Mingan_End')) player.removeSkill('Diuse_Mingan_End');
                        if(player.storage.Diuse_renge==undefined||player.storage.Diuse_renge){
                            game.playAudio('..','extension\\术樱','Diuse_Danzhong1');
                            player.storage.Diuse_renge=false;
                            player.storage.Diuse_liBool=true;
                            player.removeMark('Diuse_SP',100);
                            player.gainMaxHp();
                            for(var i=0;i<game.players.length;i++){
                                if(game.players[i]==player) continue;
                                game.players[i].damage();
                            }
                        } else {
                            game.playAudio('..','extension\\术樱','Diuse_Danzhong2');
                            player.storage.Diuse_renge=true;
                            player.storage.Diuse_biaoBool=true;
                            player.loseMaxHp();
                            player.removeMark('Diuse_SP',100);
                            for(var i=0;i<game.players.length;i++){
                                game.players[i].draw();
                            }
                        } 
                    },
                    ai:{
                        order:3,
                        threaten:0.5,
                        result:{
                            player:function (player,target){
                                return 1;
                            },
                        },
                    },
                    group:['Diuse_SP_useCard','Diuse_SP_damage','Diuse_Danzhong_Biao','Diuse_Danzhong_Li','Diuse_Danzhong_Jieshu'],
                    subSkill:{
                        Biao:{
                            audio:false,
                            trigger:{player:"phaseUseAfter"},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                return player.storage.Diuse_biaoBool;
                            },
                            content:function(){
                                player.storage.Diuse_biaoBool=false;
                                for(var i=0;i<game.players.length;i++){
                                    if(game.players[i]==player) continue;
                                    if(game.players[i].countCards('h')>game.players[i].hp) game.players[i].damage(1);
                                }
                            },
                        },
                        Li:{
                            audio:false,
                            trigger:{global:"dieAfter"},
                            forced:true,
                            sub:true,
                            filter:function(event,player){
                                return player.storage.Diuse_liBool;
                            },
                            content:function(){
                                player.storage.Diuse_liBool=false;
                                player.storage.Diuse_Danzhong_Li_recover=true;
                            },
                        },
                        Jieshu:{
                            trigger:{player:"phaseJieshuBegin"},
                            silent:true,
                            sub:true,
                            forced:true,
                            popup:false,
                            audio:false,
                            content:function(){
                                player.storage.Diuse_liBool=false;
                                player.storage.Diuse_biaoBool=false;
                                if(player.storage.Diuse_Danzhong_Li_recover) for(var i=0;i<game.players.length;i++) game.players[i].recover();
                                player.storage.Diuse_Danzhong_Li_recover=false;
                                if(player.hasSkill('Diuse_Caidan_End')&&player.countMark('Diuse_SP')<100) player.removeSkill('Diuse_Caidan_End');  //移除彩蛋;
                            },
                        },
                    },
                },
                Diuse_Shuangzi:{
                    audio:"ext:术樱:2",
                    trigger:{global:'gameDrawAfter',player:'enterGame'},
                    charlotte:true,
                    firstDo:true,
                    forced:true,
                    content:function(){
                        'step 0'
                        player.storage.Diuse_Shuangzi=0;
                        player.chooseControl('樱桃炸弹','蓝莓特工');
                        'step 1'
                        if(result.control=='樱桃炸弹'){
                            player.reinit('Diuse_Shuangzi','Diuse_Yingtao',[2,2]);
                            player.storage.Diuse_Shuangzi=1;
                        } else {
                            player.reinit('Diuse_Shuangzi','Diuse_Lanmei',[3,3]);
                        }
                        'step 2'
                        player.addSkill('Diuse_Shuangzi_After');
                    },
                },

                //头疼死我了 双子 不再维护
                Diuse_Shuangzi_After:{
                    trigger:{global:'gameDrawAfter'},
                    forced:true,
                    popup:false,
                    content:function(){
                        var num=player.storage.Diuse_Shuangzi;
                        'step 0'
                        if(player.storage.Diuse_Huojian_Swap_Num==undefined) player.storage.Diuse_Huojian_Swap_Num=0;
                        if(player.storage.Newdualside==undefined) player.storage.Newdualside=[];
                        if(player.storage.Newdualside_over) player.storage.Newdualside_over=false;
                        if(player.storage.Diuse_Yingtao_Hula==undefined) player.storage.Diuse_Yingtao_Hula=true;
                        if(player.storage.Diuse_Yingtao_Hula_Buff==undefined) player.storage.Diuse_Yingtao_Hula_Buff=false;
                        if(player.storage.Diuse_Huyuan_Damage==undefined) player.storage.Diuse_Huyuan_Damage=0;
                        if(player.storage.Diuse_Fangyv_Num==undefined) player.storage.Diuse_Fangyv_Num=0;
                        if(player.storage.Diuse_Shanliang_Num==undefined) player.storage.Diuse_Shanliang_Num=0;
                        var name=num==1?lib.character['Diuse_Lanmei']:lib.character['Diuse_Yingtao'];
                        event.cards=[];
                        event.num=0;
                        if(num==1){
                            player.storage.Newdualside[0]=get.infoHp(name[2]);
                            player.storage.Newdualside[1]=get.infoMaxHp(name[2]);
                            player.storage.Newdualside[4]=0;
                        } else {
                            player.storage.Newdualside[2]=get.infoHp(name[2]);
                            player.storage.Newdualside[3]=get.infoMaxHp(name[2]);
                            player.storage.Newdualside[5]=0;
                        }
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
                        player.addToExpansion(event.cards,'giveAuto',player).gaintag.add('Diuse_Newcard');
                        var cfg=player.storage.Newdualside;
                        if(num==1){
                            player.markSkillCharacter('Diuse_Newmark_Lanmei',{name:'Diuse_Lanmei'},'莉莉娅','当前体力：'+cfg[0]+'/'+cfg[1])+'<br>SP：'+cfg[4];
                        } else {
                            player.markSkillCharacter('Diuse_Newmark_Yingtao',{name:'Diuse_Yingtao'},'萝莎莉娅','当前体力：'+cfg[2]+'/'+cfg[3]+'<br>SP：'+cfg[5]);
                        }
                        'step 4'
                        var next=game.createEvent('Diuse_swapRoles');
                        next.player=player;
                        next.setContent(function(){
                            player.removeSkill('Diuse_Shuangzi_After');
                        });
                    },
                },
                Diuse_Newmark_Yingtao:{},
                Diuse_Newmark_Lanmei:{},
                Diuse_Newcard:{},
                Diuse_Kuaisu:{
                    audio:"ext:术樱:2",
                    enable:"phaseUse",
                    usable:1,
                    selectCard:[1,3],
                    selectTarget:1,
                    multitarget:true,
                    complexCard:true,
                    position:'hs',
                    filter:function(event,player){
                        return player.getCards('hs',function(card){
                            return get.type(card)=='trick';
                        });
                    },
                    filterCard:function(card){
                        return get.type(card)=='trick';
                    },  
                    filterTarget:function(){
                        return true;
                    },
                    check:function(card){
                        return 6-get.value(card);
                    },
                    content:function(){
                        var num=cards.length;
                        var card;
                        if(num==1){
                            card=game.createCard('shandian');
                        } else if(num==2) {
                            card=game.createCard('bingliang');
                        } else {
                            card=game.createCard('lebu');
                        }
                        targets[0].addJudge(card);
                        targets[0].$draw(card);
                        game.delay(2);
                    },
                    group:"Diuse_Kuaisu_Damage",
                    subSkill:{
                        Damage:{
                            audio:"ext:术樱:1",
                            trigger:{player:"damageBegin"},
                            filter:function(event,player){
                                var cards=player.getCards('h',function(card){
                                    return get.type(card)=='trick';
                                });
                                if(event.source==undefined||event.source==''||event.source.hp>player.hp) return false;
                                if(event.num>cards.length) return false;
                                for(var i of lib.inpile) {
                                    if(lib.card[i].type=='delay') return true;
                                }
                            },
                            content:function(){
                                player.storage.Diuse_Huyuan_Damage=trigger.num;
                                trigger.cancel();
                                var next=player.chooseToUse();
                                next.set('targets',game.filterPlayer(function(current){
                                    return trigger.source.contains(current);
                                }));
                                next.set('norestore',true);
                                next.set('_backupevent','Diuse_Kuaisu_Buff');
                                next.set('custom',{
                                    add:{},
                                    replace:{window:function(){}}
                                });
                                next.backup('Diuse_Kuaisu_Buff');
                            },
                        },
                    },
                },
                Diuse_Kuaisu_Buff:{
                    chooseButton:{
                        dialog:function(event,player){
                            var cards=player.getCards('hs',function(card){
                                return get.type(card)=='trick';
                            });
                            var list=[];
                            for(var i of lib.inpile){
                                if(get.type(i)=='delay'&&event.filterCard({
                                    name:i,
                                    cards:cards,
                                },player,event)){
                                    list.push(['锦囊','',i]);
                                }
                            }
                            return ui.create.dialog('快速冷却',[list,'vcard'],'hidden');
                        },
                        check:function(button){
                            var player=_status.event.player;
                            return player.getUseValue({name:button.link[2]})+1;
                        },
                        backup:function(links,player){
                            return {
                                popname:true,
                                filterCard:function(card){
                                    return get.type(card)=='trick';
                                },
                                filterTarget:function(card,player,target){
                                    return _status.event.targets&&_status.event.targets.contains(target)&&lib.filter.filterTarget.apply(this,arguments);
                                },
                                selectCard:player.storage.Diuse_Huyuan_Damage,
                                position:'h',
                                viewAs:{
                                    name:links[0][2],
                                },
                                sub:true,
                                onuse:function(links,player){
                                    player.storage.Diuse_Huyuan_Damage=0;
                                },
                            }
                        },
                        prompt:function(links,player){
                            return '将手牌中的'+player.storage.Diuse_Huyuan_Damage+'张牌牌当做'+get.translation(links[0][2])+'使用';
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
                Diuse_Huyuan:{
                    mark:true,
                    marktext:"牌",
                    intro:{
                        content:function(storage,player,skill){
                            var list=player.getExpansions('Diuse_Newcard');
                            var name=[];
                            if(list){
                                name=[];
                                for(var i=0;i<list.length;i++){
                                    name.push(get.translation(list[i].name));
                                }
                            }
                            if(name==[]) player.unmarkSkill('Diuse_Huyuan');
                            return name;
                        },
                    },
                    audio:"ext:术樱:2",
                    trigger:{global:"phaseEnd"},
                    discard:false,
                    filter:function(event,player){
                        var useCard=event.player.getHistory('useCard',function(evt){
                            return evt.targets;
                        }).length;
                        var respond=event.player.getHistory('respond',function(evt){
                            return evt.targets;
                        }).length;
                        var sourceDamage=event.player.getHistory('sourceDamage').length;
                        var damage=event.player.getHistory('damage').length;
                        if(player.storage.Newdualside_over) return false;
                        return useCard==0&&respond==0&&sourceDamage==0&&damage==0;
                    },
                    content:function(){
                        var next=game.createEvent('Diuse_swapRoles');
                        next.player=player;
                        next.setContent(function(){
                            var cfg=player.storage.Newdualside;
                            var card=player.getCards('h');
                            player.storage.Newdualside[0]=player.hp;
                            player.storage.Newdualside[1]=player.maxHp;
                            player.storage.Newdualside[4]=player.countMark('Diuse_SP');
                            player.removeMark('Diuse_SP',player.countMark('Diuse_SP'));
                            player.unmarkSkill('Diuse_Newmark_Yingtao');                  
                            player.markSkillCharacter('Diuse_Newmark_Lanmei',{name:'Diuse_Lanmei'},'莉莉娅','当前体力：'+cfg[0]+'/'+cfg[1]+'<br>SP：'+cfg[4]);
                            player.reinit('Diuse_Lanmei','Diuse_Yingtao',[cfg[2],cfg[3]]);
                            var num=cfg[5];
                            if(num) player.addMark('Diuse_SP',num);
                            if(player.getExpansions('Diuse_Newcard')) player.gain(player.getExpansions('Diuse_Newcard'),'gain2');
                            player.addToExpansion(card,'giveAuto',player).gaintag.add('Diuse_Newcard');
                        })
                    },
                    group:["Diuse_Huyuan_Die","Diuse_Huyuan_Swap"],
                    subSkill:{
                        Die:{
                            trigger:{player:'dieBefore'},
                            silent:true,
                            filter:function(event,player){
                                if(player.storage.dualside_over) return false;
                                return player.name=='Diuse_Lanmei'&&Array.isArray(player.storage.Newdualside);
                            },
                            content:function(){
                                'step 0'
                                trigger.cancel();
                                'step 1'
                                var next=game.createEvent('Diuse_swapRoles');
                                next.player=player;
                                next.setContent(function(){
                                    var cfg=player.storage.Newdualside;
                                    var card=player.getCards('h');
                                    player.reinit('Diuse_Lanmei','Diuse_Yingtao',[cfg[2],cfg[3]]);
                                    player.removeMark('Diuse_SP',player.countMark('Diuse_SP'));
                                    var num=cfg[5];
                                    if(num) player.addMark('Diuse_SP',num);
                                    if(player.getExpansions('Diuse_Newcard')) player.gain(player.getExpansions('Diuse_Newcard'),'gain2');
                                    player.unmarkSkill('Diuse_Newmark_Yingtao');
                                    player.storage.Newdualside_over=true;
                                    delete player.storage.Newdualside;
                                })
                            },
                        },
                        Swap:{
                            audio:"ext:术樱:1",
                            trigger:{player:"Diuse_swapRolesAfter"},
                            forced:true,
                            content:function(){
                                var cfg=player.storage.Newdualside;
                                'step 0'
                                var trickCard=get.cardPile(function(card){
                                    if(get.type(card)=='trick') return true;
                                    return false;
                                },'cardPile');
                                player.gain(trickCard,'gain2');
                                if(cfg!=undefined&&cfg[2]<cfg[3]){
                                    player.chooseControl('恢复','获得').set('ai',function(){
                                        return '获得';
                                    });
                                } else {
                                    player.chooseControl('获得').set('ai',function(){
                                        return '获得';
                                    });
                                }
                                'step 1'
                                if(result.control=='恢复'){
                                    cfg[2]++;
                                    if(cfg[2]>cfg[3]) cfg[2]=cfg[3];
                                } else {
                                    player.chooseTarget('请选择一名角色，获得其区域内的一张牌',true,function(card,player,target){
                                        return target.countCards('hej')>0;
                                    }).set('ai',function(target){
                                        var player=_status.event.player;
                                        var att=get.attitude(_status.event.player,target);
                                        if(att<0&&target.countCards('hej',function(card){
                                            return get.position(card)=='j'||get.value(card,target)>=0;
                                        })) return 2*att;
                                        else if(att>0&&target.countCards('e',function(card){
                                            return get.value(card,target)<5;
                                        })) return -att;
                                        return -1;
                                    });
                                }
                                'step 2'
                                if(result.bool){
                                    var target=result.targets[0];
                                    player.gainPlayerCard(target,'hej',true);
                                }
                            },
                        },
                    },
                },
                Diuse_Fangyv:{
                    audio:"ext:术樱:2",
                    dutySkill:true,
                    enable:"phaseUse",
                    filter:function(event,player){
                        return player.countMark('Diuse_SP')>=100
                    },
                    content:function(){
                        'step 0'
                        event.cards=[]; 
                        event.num=0;
                        event.index=[];
                        'step 1'
                        var card=get.cardPile(function(card){
                            if(event.cards.contains(card)) return false;
                            return get.type(card)=='trick';
                        },'cardPile');
                        if(card) event.cards.push(card);
                        event.num++;
                        'step 2'
                        if(event.num<2) event.goto(1);
                        'step 3'
                        player.gain(event.cards,'gain2');
                        player.chooseToDiscard('h',[1,Infinity],function(card){
                            return get.type(card)=='trick';
                        },true);
                        'step 4'
                        if(result.bool){
                            event.num=player.storage.Diuse_Fangyv_Num;
                            player.chooseTarget('选择'+event.num+'名角色',[1,event.num],true).set('ai',function(){
                                if(get.attitude(_status.event.player,target)>0){ return false; }
                                return true;
                            });
                        }
                        'step 5'
                        if(result.targets.length){
                            event.targets=result.targets;
                            for(var i=0;i<event.targets.length;i++){
                                if(event.targets[i].hp<player.hp) event.num++;
                            }
                        } else { event.finish() }
                        'step 6'
                        player.chooseControlList(true,function(event,player){
                            return list=[0,1,2,3].randomGet();
                        },
                            ['令'+get.translation(event.targets)+'跳过判定阶段',
                            '令'+get.translation(event.targets)+'跳过摸牌阶段',
                            '令'+get.translation(event.targets)+'跳过出牌阶段',
                            '令'+get.translation(event.targets)+'跳过弃牌阶段']).set('target',event.targets);
                        'step 7'
                        event.num--;
                        if(result.index&&event.targets.length){
                            for(var j=0;j<event.targets.length;j++){
                                if(result.index==0){
                                    if(!event.targets[j].hasSkill('Diuse_Judge')){
                                        event.targets[j].addSkill('Diuse_Judge');
                                        game.log(event.targets[j],'跳过下个判定阶段');
                                    }
                                } else if (result.index==1){
                                    if(!event.targets[j].hasSkill('Diuse_Draw')){
                                        event.targets[j].addSkill('Diuse_Draw');
                                        game.log(event.targets[j],'跳过下个摸牌阶段');
                                    }
                                } else if (result.index==2){
                                    if(!event.targets[j].hasSkill('Diuse_Use')){
                                        event.targets[j].addSkill('Diuse_Use');
                                        game.log(event.targets[j],'跳过下个出牌阶段阶段');
                                    }
                                } else {
                                    if(!event.targets[j].hasSkill('Diuse_Discard')){
                                        event.targets[j].addSkill('Diuse_Discard');
                                        game.log(event.targets[j],'跳过下个弃牌阶段');
                                    }
                                }   
                            }
                        }
                        if(event.num>0) event.goto(6);
                        'step 8'
                        var cfg=player.storage.Newdualside;
                        cfg[5]+=35;
                        player.removeMark('Diuse_SP',100);
                        player.storage.Diuse_Fangyv_Num=0;
                    },
                    group:['Diuse_SP_useCard','Diuse_SP_damage','Diuse_Fangyv_Fail','Diuse_Fangyv_Lose'],
                    subSkill:{
                        Fail:{
                            trigger:{player:"Diuse_Huojian_DieAfter"},
                            sub:true,
                            firstDo:true,
                            forced:true,
                            content:function(){
                                game.log(player,'使命失败');
                                player.gainMaxHp();
                                player.recover(1);
                                player.awakenSkill('Diuse_Fangyv');
                            },
                        },
                        Lose:{
                            trigger:{player:"loseAfter"},
                            filter:function(event,player){
                                if(event.getParent(3).name=='Diuse_Fangyv') return true;
                                return false;
                            },
                            forced:true,
                            firstDo:true,
                            popup:false,
                            content:function(){
                                player.storage.Diuse_Fangyv_Num=trigger.num;
                            },
                        },
                    },
                },
                Diuse_Judge:{
                    trigger:{player:"phaseJudgeBefore"},
                    forced:true,
                    firstDo:true,
                    popup:false,
                    content:function(){
                        trigger.cancel();
                        player.removeSkill('Diuse_Judge');
                    },
                },
                Diuse_Draw:{
                    trigger:{player:"phaseDrawBefore"},
                    forced:true,
                    firstDo:true,
                    popup:false,
                    content:function(){
                        trigger.cancel();
                        player.removeSkill('Diuse_Draw');
                    },
                },
                Diuse_Use:{
                    trigger:{player:"phaseUseBefore"},
                    forced:true,
                    firstDo:true,
                    popup:false,
                    content:function(){
                        trigger.cancel();
                        player.removeSkill('Diuse_Use');
                    },
                },
                Diuse_Discard:{
                    trigger:{player:"discardBefore"},
                    forced:true,
                    firstDo:true,
                    popup:false,
                    content:function(){
                        trigger.cancel();
                        player.removeSkill('Diuse_Discard');
                    },
                },
                Diuse_Hula:{
                    audio:"ext:术樱:2",
                    enable:"phaseUse",
                    complexCard:true,
                    position:'hs',
                    selectCard:[1,Infinity],
                    selectTarget:1,
                    multitarget:true,
                    filterCard:function(card){
                        return get.type(card)=='basic';
                    },
                    filterTarget:function(card,player,target){
                        return target!=player;
                    },                        
                    check:function(card){
                        return 6-get.value(card);
                    },
                    filter:function(event,player){
                        return player.countCards('h',function(card){
                            return get.type(card,'basic')=='basic';
                        })&&player.storage.Diuse_Yingtao_Hula;
                    },
                    content:function(){
                        'step 0'
                        var num=parseInt(cards.length/2);
                        if(targets[0].countCards('j')>=1) num++;
                        targets[0].damage(num);
                        'step 1'
                        if(player.countCards('h',function(card){
                            return get.type(card,'basic')=='basic';
                        })<targets[0].countCards('h',function(card){
                            return get.type(card,'basic')=='basic';
                        })) player.storage.Diuse_Yingtao_Hula=false;
                        'step 2'
                        if(player.Diuse_isMinBasicCards(true)) player.storage.Diuse_Yingtao_Hula_Buff=true;
                    },
                    mod:{
                        cardEnabled:function(card,player){
                            if(player.storage.Diuse_Yingtao_Hula_Buff&&get.type(card,'basic')=='basic') return false;
                        },
                        cardRespondable:function(card,player){
                            if(player.storage.Diuse_Yingtao_Hula_Buff&&get.type(card,'basic')=='basic') return false;
                        },
                        cardSavable:function(card,player){
                            if(player.storage.Diuse_Yingtao_Hula_Buff&&get.type(card,'basic')=='basic') return false;
                        },
                    },
                    group:"Diuse_Hula_Dying",
                    subSkill:{
                        Dying:{
                            trigger:{player:"dyingBegin"},
                            firstDo:true,
                            forced:true,
                            sub:true,
                            content:function(){
                                player.storage.Diuse_Yingtao_Hula=true;
                                player.storage.Diuse_Yingtao_Hula_Buff=false;
                            },
                        },
                    },
                },
                Diuse_Huojian:{
                    mark:true,
                    marktext:"牌",
                    intro:{
                        content:function(storage,player,skill){
                            var list=player.getExpansions('Diuse_Newcard');
                            var name=[];
                            if(list){
                                name=[];
                                for(var i=0;i<list.length;i++){
                                    name.push(get.translation(list[i].name));
                                }
                            }
                            if(name==[]) player.unmarkSkill('Diuse_Huojian');
                            return name;
                        },
                    },
                    audio:"ext:术樱:3",
                    trigger:{source:"damageAfter",player:"damageAfter"},
                    check:function (card){ return 1; },
                    filter:function(event,player){
                        if(player.storage.Newdualside_over) return false;
                        if(event.source==player&&event.player.hp<=1) return true;
                        if(event.player==player&&player.hp<=1) return true;
                        return false;
                    },
                    content:function (){
                        var next=game.createEvent('Diuse_swapRoles');
                        next.player=player;
                        next.setContent(function(){
                            var cfg=player.storage.Newdualside;
                            var card=player.getCards('h');
                            player.storage.Newdualside[2]=player.hp;
                            player.storage.Newdualside[3]=player.maxHp;
                            player.storage.Newdualside[5]=player.countMark('Diuse_SP');
                            player.removeMark('Diuse_SP',player.countMark('Diuse_SP'));
                            player.unmarkSkill('Diuse_Newmark_Lanmei');
                            player.markSkillCharacter('Diuse_Newmark_Yingtao',{name:'Diuse_Yingtao'},'萝莎莉娅','当前体力：'+cfg[2]+'/'+cfg[3]+'<br>SP：'+cfg[5]);
                            player.reinit('Diuse_Yingtao','Diuse_Lanmei',[cfg[0],cfg[1]]);
                            var num=cfg[4];
                            if(num) player.addMark('Diuse_SP',num);
                            if(player.getExpansions('Diuse_Newcard')) player.gain(player.getExpansions('Diuse_Newcard'),'gain2');
                            player.addToExpansion(card,'giveAuto',player).gaintag.add('Diuse_Newcard');
                        })
                    },
                    group:["Diuse_Huojian_Die","Diuse_Huojian_Swap","Diuse_Huojian_Lose"],
                    subSkill:{
                        Die:{
                            trigger:{player:'dieBefore'},
                            silent:true,
                            filter:function(event,player){
                                if(player.storage.dualside_over) return false;
                                return player.name=='Diuse_Yingtao'&&Array.isArray(player.storage.Newdualside);
                            },
                            content:function(){
                                'step 0'
                                trigger.cancel();
                                'step 1'
                                var next=game.createEvent('Diuse_swapRoles');
                                next.player=player;
                                next.setContent(function(){
                                    var cfg=player.storage.Newdualside;
                                    var card=player.getCards('h');
                                    player.reinit('Diuse_Yingtao','Diuse_Lanmei',[cfg[0],cfg[1]]);
                                    player.removeMark('Diuse_SP',player.countMark('Diuse_SP'));
                                    var num=cfg[4];
                                    if(num) player.addMark('Diuse_SP',num);
                                    if(player.getExpansions('Diuse_Newcard')) player.gain(player.getExpansions('Diuse_Newcard'),'gain2');
                                    player.unmarkSkill('Diuse_Newmark_Lanmei');
                                    player.storage.Newdualside_over=true;
                                    delete player.storage.Newdualside;
                                })
                            },
                        },
                        Swap:{
                            audio:"ext:术樱:1",
                            trigger:{player:"Diuse_swapRolesAfter"},
                            forced:true,
                            content:function(){
                                'step 0'
                                var basicCard=get.cardPile(function(card){
                                    if(get.type(card)=='basic') return true;
                                    return false;
                                },'cardPile');
                                player.gain(basicCard);
                                player.chooseTarget('选择一名角色，对其造成1点伤害',function(event,player,target){
                                    return target!=player;
                                },1,true).set('ai',function(){
                                    if(get.attitude(_status.event.player,target)>0){ return false; }
                                    return true;
                                });
                                'step 1'
                                if(result.targets.length){
                                    result.targets[0].damage();
                                    event.targets=result.targets[0];
                                }
                                'step 2'
                                if(player.countCards('h',function(card){
                                    return get.type(card)=='trick';
                                })>=1){
                                    player.chooseToDiscard('h',[1,Infinity],function(card){
                                        return get.type(card)=='trick';
                                    },true);
                                } else {
                                    player.loseHp();
                                    event.finish();
                                }
                                'step 3'
                                if(result.bool){
                                    var num=player.storage.Diuse_Huojian_Swap_Num
                                    if(num&&event.targets.countCards('h',function(card){
                                        return get.type(card,'trick');
                                    })){
                                        event.targets.chooseToDiscard('h',num,function(card){
                                            return get.type(card)=='trick';
                                        },true);
                                        player.storage.Diuse_Huojian_Swap_Num=0;
                                    }
                                }
                            },
                        },
                        Lose:{
                            trigger:{player:"loseAfter"},
                            filter:function(event,player){
                                if(event.getParent(3).name=='Diuse_Huojian_Swap') return true;
                                return false;
                            },
                            forced:true,
                            firstDo:true,
                            popup:false,
                            content:function(){
                                player.storage.Diuse_Huojian_Swap_Num=trigger.num;
                            },
                        },
                    },
                },
                Diuse_Shanliang:{
                    audio:"ext:术樱:2",
                    dutySkill:true,
                    enable:"phaseUse",
                    filter:function(event,player){
                        return player.countMark('Diuse_SP')>=100
                    },
                    content:function(){
                        'step 0'
                        event.cards=[]; 
                        event.num=0;
                        'step 1'
                        var card=get.cardPile(function(card){
                            if(event.cards.contains(card)) return false;
                            return get.type(card)=='basic';
                        },'cardPile');
                        if(card) event.cards.push(card);
                        event.num++;
                        'step 2'
                        if(event.num<2) event.goto(1);
                        'step 3'
                        player.gain(event.cards,'gain2');
                        player.chooseToDiscard('h',[1,Infinity],function(card){
                            return get.type(card)=='basic';
                        },true);
                        'step 4'
                        if(result.bool){
                            event.num=Math.ceil(player.storage.Diuse_Shanliang_Num/2);
                            player.chooseTarget('选择一名角色',function(event,player,target){
                                return target!=player;
                            },1,true).set('ai',function(){
                                if(get.attitude(_status.event.player,target)>0){ return false; }
                                return true;
                            });
                        }
                        'step 5'
                        if(result.targets.length){
                            if(result.targets[0].countCards('j')>=1) event.num++;
                            result.targets[0].damage(event.num);
                            var cfg=player.storage.Newdualside;
                            cfg[4]+=35;
                            player.removeMark('Diuse_SP',100);
                            player.storage.Diuse_Shanliang_Num=0;
                        }
                    },
                    group:['Diuse_SP_useCard','Diuse_SP_damage','Diuse_Shanliang_Fail','Diuse_Shanliang_Lose'],
                    subSkill:{
                        Fail:{
                            trigger:{player:"Diuse_Huyuan_DieAfter"},
                            sub:true,
                            firstDo:true,
                            forced:true,
                            content:function(){
                                game.log(player,'使命失败');
                                player.gainMaxHp(2);
                                player.recover(1);
                                player.awakenSkill('Diuse_Shanliang');
                            },
                        },
                        Lose:{
                            trigger:{player:"loseAfter"},
                            filter:function(event,player){
                                if(event.getParent(3).name=='Diuse_Shanliang') return true;
                                return false;
                            },
                            forced:true,
                            firstDo:true,
                            popup:false,
                            content:function(){
                                player.storage.Diuse_Shanliang_Num=trigger.num;
                            },
                        },
                    },
                },
            },
            translate:{
                Diuse_Wuli_Yishang:"物理易伤",
                Diuse_Yuansu_Yishang:"元素易伤",
                Diuse_Quanmian_Yishang:"全面易伤",
                Diuse_Wuli_Yishang_Mark:"物理易伤",
                Diuse_Yuansu_Yishang_Mark:"元素易伤",
                Diuse_Quanmian_Yishang_Mark:"全面易伤",
                Diuse_SP:"SP",
                Diuse_PlayerDie:"阵亡语音",
                Diuse_Xuesha:"血杀",
                "Diuse_Xuesha_info":"你的回合内，当有角色受到伤害后，你可以摸一张牌并令本回合使用【杀】的次数上限+1。",
                Diuse_Diewu:"蝶舞",
                "Diuse_Diewu_info":"出牌阶段限一次，你可以弃置一张红色牌并指定一名其他角色，其摸一张牌，然后你可以使用一张不计入次数的【杀】。",
                "Diuse_Xuesha2":"血杀",
                Diuse_Anhong:"暗洪",
                "Diuse_Anhong_info":"觉醒技。当你受到伤害前，你可以摸一张牌；当你受到伤害后，若你的体力低于2，则你恢复一点体力，失去该技能并获得【血杀】。",
                Diuse_Guozai:"过载",
                "Diuse_Guozai_info":"SP技。出牌阶段，你可消耗50SP开启过载状态且将手牌摸至体力上限与护盾值之和(最多为10)，期间每当你造成伤害时，此伤害+1且你与保护单位回复1点体力，然后扣10SP，若你的SP为0或使用超过50SP则关闭过载状态。",
                Diuse_Chonggou:"重构",
                "Diuse_Chonggou_info":"每回合限一次，当你造成伤害时，你可以选择：1：弃置X张牌并摸X张牌（X为你当前护盾值）2：使其获得其防具区的牌，然后其免受此伤害，其准备阶段开始时，令其使用此牌。",
                Diuse_Yinmie:"湮灭",
                "Diuse_Yinmie_info":"每回合限一次，当其他角色受到伤害前，若其防具区没有牌，你可以选择：1：使其摸两张牌然后该伤害+1；2：你弃置两张牌并使其进入保护名单。",
                Diuse_Fuhe:"负荷",
                "Diuse_Fuhe_info":"锁定技，游戏开始后，你获得当前体力值等量的物理护盾，你和保护单位受到物理伤害时优先扣除护盾；出牌阶段，若你的体力值与上回合结束时相同则将将护盾值充能至体力上限；回合结束时，你移除清空保护名单；你的手牌上限增加等量的护盾值。",
                Diuse_Wange:"挽歌",
                "Diuse_Wange_info":"每回合限一次，回合开始时，你选择进行一个摸牌或出牌阶段；当你的武将牌翻面时，你可选择：1：摸两张牌并恢复一点体力，2：获得技能【鸦羽】。",
                Diuse_Sangzhong:"丧钟",
                "Diuse_Sangzhong_info":"当你于回合外受到伤害后，你可以摸一张牌（若你没有手牌则改为摸两张），若该伤害大于2则你可改为摸一张牌（若你没有手牌则摸三张）或复原武将牌。",
                Diuse_Zhongqu:"终曲",
                "Diuse_Zhongqu_info":"出牌阶段限一次。你可以弃置一张牌并令一名角色进行判定，若点数为：1：你摸三张牌并随机获得其区域内的一张牌然后在你的下个回合开始前，你的【杀】伤害+1；2-7：你随机获得其区域内的一张牌并摸一张牌；8-12：你摸两张牌；13：你的武将牌翻面。",
                Diuse_Luoying:"落樱",
                "Diuse_Luoying_info":"出牌阶段限两次。当你使用可以造成伤害的牌指定目标后该次数减一。你可以选择一名指定角色，然后对其造成伤害后如果其拥有樱花标记则该伤害+1否则获得樱花标记，且你摸一张牌。",
                Diuse_Yishan:"一闪",
                "Diuse_Yishan_info":"在你使用闪后你可以引爆或给予其他角色樱花标记，如果该角色因此受到伤害则你摸X张牌。(X为你的武器距离)",
                Diuse_Renfan:"刃返",
                "Diuse_Renfan_info":"你使用或打出杀后，你可以与一名有手牌的角色摸一张牌。若场上有凛，则凛也摸一张。",
                "Diuse_Zhongqu1":"终曲",
                Diuse_Yayv:"鸦羽",
                "Diuse_Yayv_info":"锁定技。你的手牌数始终等于你的体力值。",
                Diuse_Shanbeng:"山崩",
                "Diuse_Shanbeng_info":"当你使用【杀】指定唯一目标后，你可以弃置至多三张【岚】然后获得相应<div onmousedown='Diuse_downText()' onmouseup='Diuse_upText(1)'><font color='purple'>效果</font></div>",
                Diuse_Xirang:"息壤",
                "Diuse_Xirang_info":"锁定技，你始终跳过摸牌阶段；若你的摸牌阶段被跳过，则你可摸两张牌或从牌堆底摸两张牌，然后从另一端摸一张牌；当你使用【杀】【闪】【桃】【酒】时，若你没有对应标记则摸一张牌并获得一个对应标记；弃牌阶段开始时，若你当前手牌不大于当前体力值且有标记则可以摸X张牌再弃置X/2张牌并且移除标记（X为【杀】【闪】【桃】【酒】对应标记的数量，X/2向下取整且至少为1）。",
                Diuse_Xunxin:"迅心",
                "Diuse_Xunxin_info":"锁定技。当你受到一点伤害后，你摸一张牌并选择弃置一张手牌；你将因弃置而进入弃牌堆的【杀】【闪】【桃】【酒】置于武将牌上，称之为【岚】。",
                Diuse_Xianfa:"仙法",
                "Diuse_Xianfa_info":"回合结束后，你可以指定至多X名其他角色，然后这些角色进入‘相引’状态；你的出牌阶段开始前，移除全场的‘相引’状态(X为你装备栏的空位且至多为3)。 相引：当你体力值或体力上限发生变化后，场上处于‘相引’的其他角色发生相同变化，然后移除全场的‘相引’状态。",
                Diuse_Yinyang:"阴阳",
                "Diuse_Yinyang_info":"每回合限一次。当你使用牌指定唯一其他角色为目标后，你可以执行以下效果：若你武器区为空则弃置其一张牌；若你防具区为空则其获得元素易伤直至其回合开始前；若均为空或均不为空则你摸一张牌。",
                Diuse_Tiandi:"天地",
                Diuse_Tiandi_A:"天地",
                Diuse_Tiandi_B:"天地",
                "Diuse_Tiandi_info":"锁定技，若你的武器区为空则你使用【杀】次数上限+1，若武器区与防具区均为空则手牌上限+2；每局游戏限一次，当你进入濒死状态后，你将体力回复至1点并修改仙法：出牌阶段开始时不会再移除全场的‘相引’状态；准备阶段，若你的防具区为空或武器区与防具区均不为空则你可以摸一张牌；结束阶段，你可以将你本回合【天地】的被动效果给一名其他角色。",
                Diuse_Yifa:"相引",//原仪法
                //"Diuse_Yifa_info":"每轮限一次。你选择一名角色随机临时获得崩坏包的一个角色的技能，如果目标不是自己则摸两张牌。主公技，限定技，觉醒技除外。",
                //"Diuse_Yinyang1":"阴",
                //"Diuse_Yinyang2":"阳",
                Diuse_Bingren:"兵刃",
                Diuse_Bingren_info:"锁定技。当你使用一张武器牌后，你根据当前武器攻击距离摸X张牌(X为武器距离/2，向下取整且最小为1)并获得相应<div onmousedown='Diuse_downText()' onmouseup='Diuse_upText(2)'><font color='purple'>技能</font></div>",
                Diuse_Fanchen:"凡尘",
                Diuse_Fanchen_info:"锁定技。当你于回合外第一次受到伤害后，你可以回复一点体力，若你的体力值大于1，则可改为将失去体力值至1点并进入物理易伤状态；当前回合结束后，你回复体力值至发动此技能前并摸X张牌（X为你回复的体力值）。",
                Diuse_Zhejian:"折剑",
                Diuse_Zhejian_info:"锁定技。其他角色无法弃置或获得你武器区的牌。",
                Diuse_Yi:"一",
                Diuse_Yi_info:"当你于你的回合内使用一张牌后，你可以弃置一张手牌并摸一张牌。",
                Diuse_Er:"二",
                Diuse_Er_info:"当你于回合内不因此技能获得一张牌时，你摸一张牌。",
                Diuse_San:"三",
                Diuse_San_info:"出牌阶段限两次，当你造成伤害后，你可以令场上一名角色受到一点无来源的伤害。",
                Diuse_Si:"四",
                Diuse_Si_info:"你使用【杀】或普通锦囊牌后你可以额外指定一个目标，若不这么做则你摸X张牌(X为你已损失的体力值且至少为1)",
                Diuse_Wu:"五",
                Diuse_Wu_info:"出牌阶段限一次，当你使用可造成伤害的牌指定目标后，你可以选择其中一个目标然后你摸X张牌(X其体力值且最多为5)。",
                Diuse_Liu:"六",
                Diuse_Liu_info:"你获得【一】【二】【三】【四】【五】。",
                Diuse_Fanchen1:"凡尘",
                Diuse_Leiming:"雷鸣",
                Diuse_Leiming_info:"出牌阶段。当你对一名其他角色连续使用两张牌后，你可以将一张【杀】当做雷【杀】对其合法使用。你于你下个出牌阶段开始时至多因此打出3张雷【杀】。",
                Diuse_Yingren:"影刃",
                Diuse_Yingren_info:"游戏开始时，你获得两个标记；当你打出或使用闪之后，你可以消耗一枚标记视为你使用一张雷【杀】，若你没有标记，则改为对当前回合角色随机使用手牌中的【杀】；一轮游戏开始时，若你标记小于2，则你获得一个标记。出牌阶段。若你有标记则可以主动释放。",
                Diuse_Yvlei:"御雷",
                Diuse_Yvlei_info:"SP技。出牌阶段。若你SP大于100则可以消耗20SP开启，并摸X张牌（X为体力上限与手牌数的差且最多为5）然后重置【雷鸣】次数。当你处于开启状态：你造成的雷属性伤害+1；每使用一张伤害类牌消耗10SP；你使用牌无距离限制；若因此消耗100SP则此技能结束。",
                Diuse_Leidian:"雷电",
                Diuse_Leidian_info:"当一名角色造成雷属性伤害时，你可以令其判定。若结果为黑色，则此伤害+1；若为红色，则你摸两张牌。",
                Diuse_Xueqi_Mark:"血契",
                Diuse_Xueqi:"血契",
                Diuse_Xueqi_info:"锁定技。游戏开始时，所有其他角色获得一个“血契”。当你的体力值大于1点时，你流失体力值至1；当你的体力值或体力上限发生变化后，你摸X张牌（X为变化值，如果你没有手牌则多摸一张牌）。",
                Diuse_Shenshi:"神蚀",
                Diuse_Shenshi_info:"锁定技。当你进入濒死时，你选择场上一名有标记的角色令其移除全部标记然后你回复X点体力（X为移除的标记数）；你的手牌上限等于Y（Y为全场标记数量+你最大体力值）",
                Diuse_Shoulie:"狩猎",
                Diuse_Shoulie_info:"锁定技。当你造成伤害时，改为令目标角色获得等量的“血契”；其他角色出牌阶段开始时，如果其“血契”数大于一，则其失去X点体力并使你恢复X点体力，随后其失去X个“血契”（X为其“血契”数-1）。",
                Diuse_Qujian:"区间",
                Diuse_Shikong:"时空区间",
                Diuse_Qujian_info:"锁定技，当你打出或使用【闪】后，若场上没“时空”标记，则选择一名其他角色令其获得1个“时空”，然后你回复35sp并获得1个“亚空”标记；有“时空”的角色失去其武将牌上的技能，无法使用或打出手牌且受到伤害时改为获得等量的“时空”直到其失去所有的“时空”；有”时空“的角色的出牌阶段开始时，其移除所有“时空”并受到你造成的X点伤害（X为（“时空”数量-1）/2且向下取整）",
                Diuse_Yakong:"亚空",
                Diuse_Yakong_Buff:"亚空",
                Diuse_Yakong_info:"锁定技。当你造成伤害后，若你不处于激活状态，则获得一个”亚空”。准备阶段，若”亚空”数不小于3，则你将手牌补至前体力值(最多补至5)，并在失去所有”亚空”前处于激活状态：当你使用牌时，根据其类型执行以下效果然后移除一个”亚空”：1，非攻击类型：你摸一张牌；2：攻击类型：该牌造成的伤害+1。",
                Diuse_Xujie:"虚界",
                Diuse_Xujie_info:"SP技。出牌阶段，你可以消耗125SP，对除你之外的角色造成X点伤害（X为场上角色体力平均值，向下取整且至少为1），然后你获得10个“亚空”。",
                Diuse_Mingan:"明光/暗影",
                Diuse_Mingan_info:"出牌阶段限一次，你可以将一张手牌置于牌堆底并摸一张牌(若你没有手牌则改为摸两张)，然后执行以下效果：表人格：回复1点体力；里人格：视为使用一张【杀】。",
                Diuse_Baihei:"白昼/黑夜",
                Diuse_Bai:"白昼",
                Diuse_Hei:"黑夜",
                Diuse_Baihei_info:"锁定技。当你对其他角色造成伤害后，若其没有“白昼/黑夜”标记则其获得一个“白昼/黑夜”，若有“白昼/黑夜”则执行以下效果：若你当前形态与“白昼/黑夜”不相对则你摸一张牌，否则根据“白昼/黑夜”类型执行以下效果：“白昼”: 其选择你摸一张牌或其弃置一张手牌, 若其防具区没有牌则你移动场上的一张牌；“黑夜”: 你选择你摸一张牌或其弃置一张手牌, 若其防具区有牌则你使用【杀】次数上限+1。表人格手牌上限+2，里人格体力上限+1。",
                Diuse_Danzhong:"诞生/终末",
                Diuse_Danzhong_info:"SP技。出牌阶段，你可以消耗100SP，重置【明光/暗影】使用次数，转换表/里人格并造成不同的效果：转换里人格时：对所有其他角色造成1点伤害，若有角色在此回合内阵亡，则所有角色在此回合结束时回复1点体力；转换表人格时：全场角色摸一张牌，此回合结束时，若有其他角色手牌数大于其体力值，则你对其造成1点伤害。",
                Diuse_Shuangzi:"双子",
                Diuse_Shuangzi_info:"锁定技。游戏开始时，你将武将替换为【樱桃炸弹】或【蓝莓特攻】；当前武将死亡后，若另一名武将存活，则你将武将替换为其且无法再次替换武将。",
                Diuse_Kuaisu:"快速冷却",
                Diuse_Kuaisu_Buff:"快速冷却",
                Diuse_Huyuan:"援护打击",
                Diuse_Fangyv:"防御反击",
                Diuse_Hula:"呼啦啦旋风",
                Diuse_Huojian:"火箭头槌",
                Diuse_Shanliang:"闪亮亮必杀",
                Diuse_Kuaisu_info:"每回合每项限一次，①出牌阶段，你可将一/二/三张锦囊牌视为闪电/兵粮寸断/乐不思蜀置于一名判定区没有牌的角色的判定区内，②当你受到体力不大于你的角色的伤害时，你可将等量于此次伤害值的锦囊牌视为任意延时类锦囊牌置于其判定区内，然后取消此伤害。",
                Diuse_Huyuan_info:"锁定技。当你登场后，你获得一张锦囊牌，然后令【樱桃炸弹】回复一点体力或获得一名角色区域里的一张牌。当一名角色的回合结束后，若其本回合没有使用与打出牌且没有造成与受到伤害，你可将武将替换为【樱桃炸弹】。",
                Diuse_Fangyv_info:"使命技，SP技。成功：出牌阶段，若你的SP不小于100，你可失去100SP，获得两张锦囊牌然后弃置任意张锦囊牌，令任意名角色在其下个回合失去共X个阶段（X为你弃置的锦囊牌数与这些角色中体力值不大于你的角色数之和，准备阶段与结束阶段除外），令【樱桃炸弹】回复35SP，然后重置此技能。失败：若【樱桃炸弹】死亡，你增加一点体力上限然后回复一点体力。",
                Diuse_Hula_info:"出牌阶段，你可弃置至少一张基本牌对一名其他角色造成X点伤害（X为你弃置的基本牌数/2，向下取整，若其判定区有牌，X的值加1），然后①若你基本牌数不大于其，你无法再次使用此技能，②你基本牌数为全场唯一最少，你无法使用、打出或弃置基本牌；当你的武将替换或进入濒死状态后，重置以上效果。",
                Diuse_Huojian_info:"锁定技。当你登场后，你获得一张基本牌，对一名其他角色造成一点伤害，然后若你①有锦囊牌，你需弃置至少一张锦囊牌然后其弃置等量的锦囊牌（没有则不弃，不足则全弃），②没有锦囊牌，你失去一点体力。当你造成/受到伤害后，若对方/你的体力值不大于1，你可将武将替换为【蓝莓特攻】。",
                Diuse_Shanliang_info:"使命技，SP技。成功：出牌阶段，若你的SP不小于100，你可失去100SP，获得两张基本牌，弃置至少一张基本牌，对一名其他角色造成Y点伤害（Y为你弃置的基本牌数/2，向上取整，若其判定区有牌，Y的值加1），令【蓝莓特攻】回复35SP，然后重置此技能。失败：若【蓝莓特攻】死亡，你增加两点体力上限然后回复一点体力。",
            },
        },
    },"术樱");
}