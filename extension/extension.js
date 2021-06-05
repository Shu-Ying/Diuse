game.import("extension",function(lib,game,ui,get,ai,_status){
    return {
        name:"术樱",
        content:function (config,pack){
            var f=function(Diuse){
            if(config[Diuse]){
                for(var i in lib.characterPack[Diuse]){
                    if(lib.character[i][4].indexOf("forbidai")<0)lib.character[i][4].push("forbidai");
                }
            }
        };
    f("Diuse");//此处填武将包英文名
},
editable:false,
precontent:function (Diuse){
    if(Diuse.enable){
        var url=lib.assetURL+'extension/术樱'

        if(lib.config.Diuse_local_version==undefined) game.saveConfig('Diuse_local_version','1.7.1');

        var Diuse_Text=document.createElement("div");
        var Diuse_Text_style={
            width:"calc(25%)",
            height:"calc(5%)",
            display:"table",
            background:'rgba(0,0,0,0.5)',
            position:"absolute",
            top:"0px",
            left:"calc(38%)",
            zIndex:"10",
            textAlign:"center",
            'font-size':'30px',
            'font-family':"'STXinwei','xinwei'",
        };
        for(var k in Diuse_Text_style){
            Diuse_Text.style[k]=Diuse_Text_style[k];
        };

        lib.extensionMenu.extension_术樱.local_version={
            "name":"扩展版本："+lib.config.Diuse_local_version,
            "clear":true,
            "nopointer":true,
        };
        lib.extensionMenu.extension_术樱.Uplog={
            name:'<div class="hth_menu">▶更新和说明</div>',
            clear: true,
            onclick:function(){
                if(this.hth_more==undefined){
                    var more=ui.create.div('.hth_more',
                    '<div style="text-align:left"><font size=3px>'+
                    '-----< 改动 >-----'+
                    '<br>识律小幅度削弱<br>'+
                    '<br>降低任务量需求<br>'+
                    '<br>修复了亡神白起死亡时会导致角色弃牌的BUG<br>'+
                    '-----< 崩坏包 >-----'+
                    '<br>符华技能重做，有很多适配卡牌适配中...<br>'+
                    '<br>因为部分更改，需要删除全部文件后替换压缩包文件<br>'+
                    '<br>-----< 天书乱斗 >-----'+
                    '<br>任务量根据不同难度有所不同<br>'+
                    '<br>修复众多BUG，每个难度因无法手气卡，补偿保护技能<br>'+
                    '<br>因第三关手牌数与体力上限挂钩，提前提醒不要选高达一号类似技能<br>'+
                    '</font></div>');
                    this.parentNode.insertBefore(more,this.nextSibling);
                    this.hth_more=more;
                    this.innerHTML='<div class="hth_menu">▼更新日志</div>';
                }
                else{
                        this.parentNode.removeChild(this.hth_more);
                        delete this.hth_more;
                        this.innerHTML='<div class="hth_menu">▶更新日志</div>';
                };
            },
        };
        lib.extensionMenu.extension_术樱.Benghuai={
            name:'<div class="hth_menu">▶崩坏3技能说明</div>',
            clear: true,
            onclick:function(){
                if(this.hth_more==undefined){
                    var more=ui.create.div('.hth_more',
                    '<div style="text-align:left"><font size=3px>'+
                    '-----< 识律 >-----'+
                    '<br>根据武器攻击距离获得相应技能<br>'+
                    '<br>一:当你于你的回合内使用一张牌后，你可以弃置一张手牌并摸一张牌。<br>'+
                    '<br>二:当你于回合内获得一张牌且不是因为此技能获得牌时，你摸一张牌。<br>'+
                    '<br>三:出牌阶段限两次。你造成伤害后你可以让场上的一名角色受到一点无伤害来源的伤害。<br>'+
                    '<br>四:你使用杀或普通锦囊后你可以多增加一个目标，如果取消则摸X张牌(X为你已损失的体力，如果为0则摸1)<br>'+
                    '<br>五:出牌阶段限一次，当你使用可造成伤害的牌指定目标后你可以选择其一个目标然后你摸X张牌。(X为目标当前体力)<br>'+
                    '<br>六:获得全部技能效果。<br>'+
                    '<br>-----< 符华 >-----'+
                    '<br>------<br>'+
                    '<br>------<br>'+
                    '<br>------<br>'+
                    ''+
                    ''+
                    ''+
                    '</font></div>');
                    this.parentNode.insertBefore(more,this.nextSibling);
                    this.hth_more=more;
                    this.innerHTML='<div class="hth_menu">▼崩坏3技能说明</div>';
                }
                else{
                        this.parentNode.removeChild(this.hth_more);
                        delete this.hth_more;
                        this.innerHTML='<div class="hth_menu">▶崩坏3技能说明</div>';
                };
            },
        };
        lib.extensionMenu.extension_术樱.Tianshu={
            name:'<div class="hth_menu">▶天书说明</div>',
            clear: true,
            onclick:function(){
                if(this.hth_more==undefined){
                    var more=ui.create.div('.hth_more',
                    '<div style="text-align:left"><font size=3px>'+
                    '-----< 第三关 >-----'+
                    '<br>Boss进入濒死会复活然后给随机任务，完成任务即可减少Boss体力上限<br>'+
                    '<br>任务名  普通/困难/阴间'+
                    '<br>任务一:摸牌 数量 25/45/85'+
                    '<br>任务二:伤害 8/15/25'+
                    '<br>任务三:恢复 3/7/12<br>'+
                    '<br>-----< 第四关 >-----'+
                    '<br>鬼阎王具有地府场地技能。场内角色受到伤害前其进行判定并根据效果执行！<br>'+
                    '<br>判定结果为红桃：'+
                    '<br>---------------<br>'+
                    '点数为1：其流失当前全部体力<br>'+
                    '点数为2-7：其流失一点体力<br>'+
                    '点数为8-13：其回复一点体力<br>'+
                    '<br>判定结果为黑桃：'+
                    '<br>---------------<br>'+
                    '点数为1：其受到当前体力值的无伤害来源伤害<br>'+
                    '点数为2-7：该次伤害+1<br>'+
                    '点数为8-13：该次伤害-1<br>'+
                    '<br>判定结果为梅花：'+
                    '<br>---------------<br>'+
                    '点数为1：其必须将武将面朝下<br>'+
                    '点数为2-7：其进入全面易伤状态直至其回合开始时<br>'+
                    '点数为8-13：其获得保护技能<br>'+
                    '<br>判定结果为方块：'+
                    '<br>---------------<br>'+
                    '点数为1：其必须弃置全部手牌<br>'+
                    '点数为2-7：其弃置一张牌<br>'+
                    '点数为8-13：其摸一张牌<br>'+
                    '<br>鬼阎王有更强力的技能！它能完全保护鬼阎王不受到伤害！同时也有强力的输出手段<br>'+
                    '<br>摸牌阶段结束后有50%的概率再摸两张牌'+
                    '<br>出牌阶段开始前有50%的概率使用一张杀'+
                    '<br>出牌阶段开始时有50%的概率使用一张酒'+
                    '<br>弃牌阶段结束后有50%的概率摸两张牌'+
                    '<br>鬼阎王造成伤害前有30%的概率使其+1'+
                    '<br>鬼阎王受到伤害前有30%的概率使其-1'+
                    '<br>鬼阎王受到伤害后有25%的概率恢复一点体力'+
                    '<br>鬼阎王受到伤害后有50%的概率摸一张牌'+
                    '<br>鬼阎王被杀指定后有10%的概率使使用者弃置一张牌'+
                    '<br>鬼阎王回合开始前有5%的概率执行一个额外有益的回合'+
                    '<br>鬼阎王被杀指定后有1%的概率使该牌失效'+
                    '<br>鬼阎王使用杀时有30%的概率出杀次数+1'+
                    '</font></div>');
                    this.parentNode.insertBefore(more,this.nextSibling);
                    this.hth_more=more;
                    this.innerHTML='<div class="hth_menu">▼天书说明</div>';
                }
                else{
                        this.parentNode.removeChild(this.hth_more);
                        delete this.hth_more;
                        this.innerHTML='<div class="hth_menu">▶天书说明</div>';
                };
            },
        };
        lib.extensionMenu.extension_术樱.Updata={
            "name":"<span style='text-decoration: underline'>版本检测</span>",
            "clear":true,
            "onclick":function(){
                download_version();
            },
        };
        lib.extensionMenu.extension_术樱.downmp3={
            "name":"语音下载",
            "clear":true,
            "onclick":function(){
                download_mp3();
            },
        };

        download_version=function(){
            var online_version;
            var httpRequest = new XMLHttpRequest();
            httpRequest.open("GET",'https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/extension/online_version.js',true);
            httpRequest.send(null);
            httpRequest.onreadystatechange=function(){
                if (httpRequest.readyState==4&&httpRequest.status==200){
                    online_version=httpRequest.responseText;
                    lib.init.js(url,'version',function(){
                        
                        try {
                            var local_version = Diuse_version;
                            var Diuse_num=1;
                          } catch (error) {
                                if(confirm('本地资源不完整！点击确认重新获取！')){
                                    game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/extension/files.js','extension/术樱/files.js',null);
                                    game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/extension/version.js','extension/术樱/version.js',null);
                                    game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/extension/extension.js','extension/术樱/extension.js',function(){
                                        game.saveConfig('Diuse_local_version',online_version);
                                        alert('下载完成，重启生效');
                                    },function(){
                                        alert('下载失败');
                                    });
                                }
                        }
                        if(local_version!=online_version&&Diuse_num==1){
                            if(confirm('检测到最新版本为:'+online_version+'本地版本为:'+local_version)){
                                game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/extension/files.js','extension/术樱/files.js',null);
                                game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/extension/version.js','extension/术樱/version.js',null);
                                game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/extension/extension.js','extension/术樱/extension.js',function(){
                                    game.saveConfig('Diuse_local_version',online_version);
                                    alert('下载完成，重启生效');
                                },function(){
                                    alert('下载失败');
                                });
                            }
                        } else {
                            if(Diuse_num==1) alert('本地版本为最新版');
                        }
                    });
                }
            }; 
        };

        download_mp3=function(){
            lib.init.js(url,'files',function(){
                var list=Diuse_mp3;
                var num=0;
                var num1=list.length;
                document.body.appendChild(Diuse_Text);
                var download1=function(){
                        game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/skin/'+list[0]+'.mp3','extension/术樱/'+list[0],function(){
                            num++
                            list.remove(list[0]);
                            if(list.length>0){
                                Diuse_Text.innerHTML='正在下载（'+num+'/'+num1+'）';
                                download1();
                            }else{
                                Diuse_Text.innerHTML='下载完毕';
                                alert('语音下载完毕!');
                                document.body.removeChild(Diuse_Text);
                            };
                    },function(){
                        if(confirm('下载'+list[0]+'失败，是否继续下载？（取消则关闭扩展ol并刷新游戏）')){
                            download1();
                        }else{
                            game.saveConfig('extension_术樱_enable',false);
                            game.reload();
                        };
                    });
                }
                download1();
            });
        };

        lib.extensionMenu.extension_术樱.downstatic={
            name:'<div class="hth_menu">动态皮肤下载</div>',
            clear: true,
            onclick:function(){
                lib.init.js(url,'files',function(){
                    var list=Diuse_static;
                    alert(list[0]);
                    alert(list.length);
                });
            }
        };
        lib.extensionMenu.extension_术樱.CPDD={
            name:"<span style='text- decoration: underline'>反馈BUG</span>",
            clear:true,
            onclick:function(){
                game.open('https://tieba.baidu.com/p/7295369748');
            },
        };

    	game.导入character=function(英文名,翻译名,obj,扩展包名){
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
    	game.导入card=function(英文名,翻译名,obj){var oobj=get.copy(obj);oobj.list=obj.card.list;oobj.card=obj.card.card;oobj.skill=obj.skill.skill;oobj.translate=Object.assign({},obj.card.translate,obj.skill.translate);game.import('card',function(){return oobj});lib.config.all.cards.push(英文名);if(!lib.config.cards.contains(英文名))lib.config.cards.push(英文名);lib.translate[英文名+'_card_config']=翻译名;};
		game.新增势力=function(名字,映射,渐变){var n,t;if(!名字)return;if(typeof 名字=="string"){n=名字;t=名字}else if(Array.isArray(名字)&&名字.length==2&&typeof 名字[0]=="string"){n=名字[0];t=名字[1]}else return;if(!映射||!Array.isArray(映射)||映射.length!=3)映射=[199,21,133];var y="("+映射[0]+","+映射[1]+","+映射[2];var y1=y+",1)",y2=y+")";var s=document.createElement('style');var l;l=".player .identity[data-color='diy"+n+"'],";l+="div[data-nature='diy"+n+"'],";l+="span[data-nature='diy"+n+"'] {text-shadow: black 0 0 1px,rgba"+y1+" 0 0 2px,rgba"+y1+" 0 0 5px,rgba"+y1+" 0 0 10px,rgba"+y1+" 0 0 10px}";l+="div[data-nature='diy"+n+"m'],";l+="span[data-nature='diy"+n+"m'] {text-shadow: black 0 0 1px,rgba"+y1+" 0 0 2px,rgba"+y1+" 0 0 5px,rgba"+y1+" 0 0 5px,rgba"+y1+" 0 0 5px,black 0 0 1px;}";l+="div[data-nature='diy"+n+"mm'],";l+="span[data-nature='diy"+n+"mm'] {text-shadow: black 0 0 1px,rgba"+y1+" 0 0 2px,rgba"+y1+" 0 0 2px,rgba"+y1+" 0 0 2px,rgba"+y1+" 0 0 2px,black 0 0 1px;}";s.innerHTML=l;document.head.appendChild(s);if(渐变&&Array.isArray(渐变)&&Array.isArray(渐变[0])&&渐变[0].length==3){var str="",st2=[];for(var i=0;i<渐变.length;i++){str+=",rgb("+渐变[i][0]+","+渐变[i][1]+","+渐变[i][2]+")";if(i<2)st2[i]="rgb("+渐变[i][0]+","+渐变[i][1]+","+渐变[i][2]+")";}var tenUi = document.createElement('style');tenUi.innerHTML = ".player>.camp-zone[data-camp='"+n+"']>.camp-back {background: linear-gradient(to bottom"+str+");}";tenUi.innerHTML += ".player>.camp-zone[data-camp='"+n+"']>.camp-name {text-shadow: 0 0 5px "+st2[0]+", 0 0 10px "+st2[1]+";}";document.head.appendChild(tenUi);}lib.group.add(n);lib.translate[n]= t;lib.groupnature[n]= "diy"+n;};


game.导入character("Diuse","崩坏3",{
    connect:true,
    character:{
        character:{
			Diuse_Shangxian:["female","qun",4,["Diuse_Xianfa","Diuse_Yinyang","Diuse_Tiandi"],[]],
            Diuse_Fuhua:["female","qun",4,["Diuse_Shanbeng","Diuse_Xirang","Diuse_Xunxin"],[]],
            Diuse_Bachongying:["female","qun",4,["Diuse_Luoying","Diuse_Yishan","Diuse_Renfan"],[]],
            Diuse_Kalian:["female","qun",4,["Diuse_Wange","Diuse_Sangzhong","Diuse_Zhongqu"],[]],
            Diuse_Xier:["female","qun",4,["Diuse_Anhong","Diuse_Diewu"],[]],
            Diuse_Buluoniya:["female","qun",4,["Diuse_Guozai","Diuse_Zhonggou","Diuse_Fuhe","Diuse_Yinmie"],[]],
            Diuse_Shilv:["female","qun",4,["Diuse_Bingren","Diuse_Fanchen","Diuse_Zhejian"],[]],
            Diuse_Yayi:["female","qun",4,["Diuse_Kongzhan","Diuse_Dianci","Diuse_Yvlei"],[]],
            Diuse_Yuexia:["female","qun","1/4",['Diuse_Xueqi','Diuse_Shenshi','Diuse_Shoulie','Vate','kagari_zongsi'],[]],
            //,'kagari_zongsi'
        },
        translate:{
			Diuse_Xier:"希儿",
            Diuse_Kalian:"卡莲",
            Diuse_Bachongying:"八重樱",
            Diuse_Fuhua:"符华",
            Diuse_Shangxian:"上仙",
            Diuse_Buluoniya:"布洛妮娅",
            Diuse_Shilv:"识律",
            Diuse_Yayi:"芽衣",
            Diuse_Yuexia:"月下",
        },
    },
    perfectPair:{
        Diuse_Xier:['Diuse_Buluoniya'],
        Diuse_Kalian:['Diuse_Bachongying'],
    },
    characterTitle:{
    },
    characterReplace:{}, //切换版本
    skill:{
        skill:{
            Diuse_Wuli_Yishang_Mark:{ //用于存储标记数量
                marktext:"易",
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
                nopop:true,
                filter:function (event,player){
                    return event.card&&(event.card.name=='sha')
                },
                content:function (){
                    trigger.num++;
                },
            },
            Diuse_Yuansu_Yishang_Mark:{
                marktext:"易",
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
                nopop:true,
                filter:function (event,player){
                    return event.card&&(event.nature=='thunder'||event.nature=='fire'||event.nature=='ice')
                },
                content:function (){
                    trigger.num++;
                },
            },
            Diuse_Quanmian_Yishang_Mark:{
                marktext:"易",
                mark:true,
                intro:{
                    content:function (storage,player,skill){
                    return '全面易伤，受到的伤害+1。'
                    },
                },
                locked:true,
            },
            Diuse_Quanmian_Yishang_Mark:{
                trigger:{
                    player:"damageBefore",
                },
                forced:true,
                nopop:true,
                content:function (){
                    trigger.num++;
                },
            },
            Diuse_Xuesha:{
                audio:"ext:术樱:2",
                audioname:["Diuse_Xier"],
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
            Diuse_Diewu:{
                audio:"ext:术樱:2",
                audioname:["Diuse_Xier"],
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
                content:function (targets)
                {
                    game.log(window.version);
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
            Diuse_Anhong:{
                juexingji:true,
                skillAnimation:true,
                forced:true,
                unique:true,
                group:['Diuse_Anhong_Juexing','Diuse_Anhong_Mopai'],
				subSkill:{
                    Juexing:{
                        audio:"ext:术樱:2",
                        audioname:["Diuse_Xier"],
                        juexingji:true,
                        skillAnimation:true,
                        forced:true,
                        unique:true,
                        trigger:{
                            player:"damageSource",
                        },
                        filter:function (event,player){
                            return player.hp<=2;
                        },
                        content:function (){
                            player.loseMaxHp();
                            player.recover();
                            game.log(player,'获得了技能','#g【血杀】')
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
                        audioname:["Diuse_Xier"],
                        trigger:{
                            player:"damageBefore",
                        },
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
            Diuse_Guozai:{
                audio:"ext:术樱:2",
                audioname:["Diuse_Buluoniya"],
                trigger:{
                    global:"gameDrawAfter",
                    player:"enterGame",
                },
                forced:true,
                content:function (){
                    player.gainMaxHp(player.maxHp);
                    player.draw(player.maxHp);
                    player.draw(player.maxHp);
                },
            },
            Diuse_Zhonggou:{
                audio:"ext:术樱:2",
                audioname:["Diuse_Buluoniya"],
                mod:{
                    maxHandcard:function (player,num){
                        return num+player.hp;
                    },
                },
                trigger:{
                    player:"damageBefore",
                },
                forced:true,
                content:function (card,player,target,current){
                    'step 0'
                    player.chooseControl('失去1点体力','减1点体力上限','取消').set('prompt','失去1点体力或减1点体力上限').set('ai',function(){
                        var num4=0
                        if(trigger.card!=undefined)
                        {
                            if(trigger.card.name =='sha' && trigger.card.nature == 'thunder') num4=1;
                            if(trigger.card.name =='sha' && trigger.card.nature == 'fire') num4=1;
                            if(trigger.card.name =='sha' && trigger.card.nature == 'ice') num4=1;
                            if(trigger.card.name =='huogong') num4=1;
                        }
                        
                        if(get.attitude(player,target)>=3&&trigger.source!=player&&num4)
                        {
                            return '取消';
                        } else if(player.hp==player.maxHp)  
                        {
                            return '失去1点体力';
                        } else {
                            return '减1点体力上限';
                        }
                    });
                    "step 1"
                    if(result.control=='失去1点体力'){
                        player.loseHp();
                        trigger.cancel();
                    }
                    else if(result.control=='减1点体力上限'){
                        player.loseMaxHp(true);
                        trigger.cancel();
                    }
                },
            },
            Diuse_Yinmie:{
                audio:"ext:术樱:2",
                audioname:["Diuse_Buluoniya"],
                enable:"phaseUse",
                usable:1,
                filterTarget:function (card,player,target)
                {
                    return target!=player;
                },
                selectTarget:1,
                content:function (targets)
                {
                    if(!targets[0].isLinked()){
                        targets[0].link(true);
                        player.logSkill('Diuse_Fuhe');
                    }
                    'step 0'
                    player.chooseControl('失去1点体力','减1点体力上限','取消').set('prompt','失去1点体力或减1点体力上限').set('ai',function(){
                        if(player.hp==player.maxHp)
                        {
                            return '失去1点体力';
                        } else {

                            return '减1点体力上限';
                        }
                    });
                    "step 1"
                    if(result.control=='失去1点体力'){
                        player.loseHp();
                    }
                    else{
                        player.loseMaxHp(true);
                    }
                    targets[0].draw(2);
                },
                ai:{
                    threaten:0.5,
                    order:8,
                    result:{
                        player:function (player,target){
                            if(get.attitude(player,target)<=0){
                                return -1;
                            } else {
                                return 1;
                            }  
                        },
                    },
                },
            },
            Diuse_Fuhe:{
                locked:true,
                trigger:{
                    player:["linkBefore","enterGame"],
                    global:"gameDrawAfter",
                },
                forced:true,
                filter:function (event,player){
                    return player.isLinked()==(event.name=='link');
                },
                content:function (){
                    if(trigger.name!='link') player.link(true);
                    else trigger.cancel();
                    player.addSkill('Diuse_Fuhe2');
                    player.addSkill('Diuse_Fuhe3');
                },
            },
            "Diuse_Fuhe2":{
                audio:"ext:术樱:2",
                audioname:["Diuse_Buluoniya"],
                trigger:{
                    player:"damageBefore",
                },
                priority:1,
                forced:true,
                nopop:true,
                filter:function (event,player){
                    return player.isLinked();
                },
                content:function (){
                    trigger.num++;
                },
            },
            "Diuse_Fuhe3":{
                audio:"ext:术樱:2",
                audioname:["Diuse_Buluoniya"],
                trigger:{
                    player:["gainMaxHpEnd","loseMaxHpEnd"],
                },
                forced:true,
                content:function (){
                    player.draw();
                },
            },
            Diuse_Wange:{
				group:['Diuse_Wange_Jieduan','Diuse_Wange_Jineng'],
				subSkill:{
					Jieduan:{
                        audio:"ext:术樱:2",
                        audioname:["Diuse_Kalian"],
                        trigger:{
                            player:"phaseBegin",
                        },
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
                        audioname:["Diuse_Kalian"],
                        forced:true,
                        trigger:{
                            player:"turnOverBefore",
                        },
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
                audioname:["Diuse_Kalian"],
                trigger:{
                    player:["damageEnd","phaseEnd"],
                },
                filter:function(event,player){
                    return _status.currentPhase!=player;
                },
                content:function(){
                    'step 0'
                    player.chooseControl('摸牌','复原武将','取消').set('prompt','请选择:摸一张牌(如果没有手牌则摸两张)复原武将').set('ai',function(){
                        if(player.classList.contains('turnedover'))
                        {
                            return '复原武将';
                        } else {
                            return '摸牌';
                        }
                    });
                    "step 1"
                    if(result.control=='摸牌'){
                        if(player.countCards('h')==0)
                        {
                            player.draw(2);
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
                audioname:["Diuse_Kalian"],
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
                        if(card.number==1){
                            player.draw(3);
                            var card=target.getCards('hej').randomGet();
                            player.gain(card,target,'giveAuto','bySelf');
                            player.addTempSkill('Diuse_Zhongqu1',{player:'phaseBefore'});
                        } else if(card.number>1 && card.number<=7){
                            var card=target.getCards('hej').randomGet();
                            player.gain(card,target,'giveAuto','bySelf');
                            player.draw();
                        } else if(card.number>7 && card.number<=12){
                            player.draw(2);
                        } else if(card.number==13){
                            player.turnOver();
                        }    
                        return -1;
                    });
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
                audioname:["Diuse_Kalian"],
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
            Diuse_Ying:{
                marktext:"樱",
                mark:true,
                intro:{
                    name:"落樱",
                    content:"mark",
                },
                locked:true,
            },
            Diuse_Luoying:{
                audio:"ext:术樱:2",
                audioname:["Diuse_Bachongying"],
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
                audioname:["Diuse_Bachongying"],
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
                audioname:["Diuse_Bachongying"],
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
            Diuse_Shanbeng:{
                audio:"ext:术樱:2",
                audioname:["Diuse_Fuhua"],
                trigger:{
                    player:"useCardToPlayered",
                },
				filter:function(event,player){
                    return event.card.name=='sha'&&!event.getParent().directHit.contains(event.target)&&player.storage.Diuse_Xunxin.length>0&&player.storage.Diuse_Xunxin;
				},
                content:function (){
                    var Diuse_Shanbeng = event.target;
                    "step 0"
                    player.chooseCardButton('弃置一个标记',1,player.storage.Diuse_Xunxin,true);
                    "step 1"
                    for(var i=0;i<result.links.length;i++){
                        player.storage.Diuse_Xunxin.remove(result.links[i]);
                    }
                    game.addVideo('storage',player,['Diuse_Xunxin',get.cardsInfo(player.storage.Diuse_Xunxin),'cards']);
                    game.cardsDiscard(result.links);
                    if (get.type(result.links[0])=='basic'){
                        var Diuse_Basic = get.name(result.links[0]);
                        switch (Diuse_Basic)
                        {
                            case 'sha': player.getStat().card.sha--;break;
                            case 'jiu': player.addTempSkill('Diuse_Sha_Jiu','shaAfter');break;
                            case 'tao': player.addTempSkill('Diuse_Sha_Tao','shaAfter');break;
                            case 'shan': player.addTempSkill('Diuse_Sha_Shan','shaAfter');break;
                            default: player.draw();
                        }
                    } else if (get.type(result.links[0])=='trick'){
                        var Diuse_Trick = get.name(result.links[0]);
                        switch (Diuse_Trick)
                        {
                            case 'shunshou': player.addTempSkill('Diuse_Sha_Shunshou','shaAfter');break;
                            case 'guohe': player.addTempSkill('Diuse_Sha_Guohe','shaAfter');break;
                            case 'wugu': player.addTempSkill('Diuse_Sha_Wugu','shaAfter');break;
                            case 'huogong': player.addTempSkill('Diuse_Sha_Huogong','shaAfter');break;
                            case 'taoyuan': player.addTempSkill('Diuse_Sha_Taoyuan','shaAfter');break;
                            case 'tiesuo': player.addTempSkill('Diuse_Sha_Tiesuo','shaAfter');break;
                            case 'wuzhong': player.addTempSkill('Diuse_Sha_Wuzhong','shaAfter');break;
                            case 'wanjian': player.addTempSkill('Diuse_Sha_Wanjian_Nanman','shaAfter');break;
                            case 'nanman': player.addTempSkill('Diuse_Sha_Wanjian_Nanman','shaAfter');break;
                            case 'jiedao': player.addTempSkill('Diuse_Sha_Jiedao','shaAfter');break;
                            case 'wuxie': player.addTempSkill('Diuse_Sha_Wuxie','shaAfter');break;
                            case 'juedou': player.addTempSkill('Diuse_Sha_Juedou','shaAfter');break;
                            default: player.addTempSkill('mashu','phaseUseAfter');
                        }
                    } else if(get.type(result.links[0])=='equip'){
                        var Diuse_Equip = get.name(result.links[0]);
                        if(get.subtype(result.links[0])=='equip3'){
                            player.addTempSkill('feiying','phaseUseAfter');
                        } else if(get.subtype(result.links[0])=='equip4'){
                            player.addTempSkill('mashu','phaseUseAfter');
                        } else if(get.subtype(result.links[0])=='equip5'){
                            player.draw(2);
                        } else {
                            switch (Diuse_Equip)
                            {
                                case 'zhuge': player.getStat().card.sha-=999;break;
                                case 'guding': player.addTempSkill('Diuse_Sha_Guding','shaAfter');break;
                                case 'hanbing': player.addTempSkill('Diuse_Sha_Hanbing','shaAfter');break;
                                case 'cixiong': player.addTempSkill('Diuse_Sha_Cixiong','shaAfter');break;
                                case 'zhuque': player.addTempSkill('Diuse_Sha_Zhuque','shaAfter');break;
                                case 'qinglong': player.addTempSkill('Diuse_Sha_Qinglong','shaAfter');break;
                                case 'qinggang': player.addTempSkill('Diuse_Sha_Qinggang','shaAfter');break;
                                case 'guanshi': player.addTempSkill('Diuse_Sha_Guanshi','shaAfter');break;
                                case 'baiyin': player.addTempSkill('Diuse_Sha_Baiyin','shaAfter');break;
                                case 'tengjia': player.addTempSkill('Diuse_Sha_Tengjia','shaAfter');break;
                                case 'bagua': player.addTempSkill('Diuse_Sha_Bagua','shaAfter');break;
                                case 'renwang': player.addTempSkill('Diuse_Sha_Renwang','shaAfter');break;
                                default: player.draw(2);
                            }
                        }
                    } else if(get.type(result.links[0])=='delay'){
                        var Diuse_Delay = get.name(result.links[0]);
                        switch (Diuse_Delay)
                        {
                            case 'shandian': player.addTempSkill('Diuse_Sha_Shandian','shaAfter');break;
                            case 'bingliang': player.addTempSkill('Diuse_Sha_Bingliang_Lebu','shaAfter');break;
                            case 'lebu': player.addTempSkill('Diuse_Sha_Bingliang_Lebu','shaAfter');break;
                            default: player.addTempSkill('Diuse_Sha_Bingliang_Lebu','shaAfter');
                        }
                    } else {
                        player.draw(2);
                    }
                },
            },
            Diuse_Sha_Fangtian:{
				trigger:{source:'damageAfter'},
                usable:1,
                content:function(){
                    player.chooseUseTarget({name:'sha'},'是否视为使用一张【杀】？');
                }
            },
            Diuse_Sha_Bingliang_Lebu:{
                trigger:{source:'damageBegin'},
				forced:true,
				popup:false,
				content:function(){
					trigger.player.addTempSkill('rezhixi','phaseUseAfter');
				}
            },
            Diuse_Sha_Jiu:{
				trigger:{source:'damageBegin'},
				filter:function(event){
					return event.card&&event.card.name=='sha'&&event.notLink();
				},
				forced:true,
				popup:false,
				content:function(){
					trigger.num++;
				}
			},
            Diuse_Sha_Tao:{
				trigger:{source:'damageBegin'},
				filter:function(event){
					return event.card&&event.card.name=='sha'&&event.notLink();
				},
				forced:true,
				popup:false,
				content:function(){
					player.recover();
				}
			},
            Diuse_Sha_Shan:{
                trigger:{
                    player:"useCardToPlayered",
                },
                forced:true,
				popup:false,
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
			},
            Diuse_Sha_Shunshou:{
                trigger:{source:'damageBegin'},
				filter:function(event){
					return event.card&&event.card.name=='sha'&&event.notLink();
				},
				forced:true,
				popup:false,
				content:function(){
					player.gainPlayerCard(trigger.player,true,'hej');
				}
            },
            Diuse_Sha_Guohe:{
                trigger:{source:'damageBegin'},
				filter:function(event){
					return event.card&&event.card.name=='sha'&&event.notLink();
				},
				forced:true,
				popup:false,
				content:function(){
                    player.discardPlayerCard(trigger.player,'hej',true);
				}
            },
            Diuse_Sha_Wugu:{
                trigger:{source:'damageBegin'},
				filter:function(event){
					return event.card&&event.card.name=='sha'&&event.notLink();
				},
				forced:true,
				popup:false,
				content:function(){
                    var Diuse_Sha_Wugu = player.hp
                    'step 0'
                    player.chooseTarget([1,Diuse_Sha_Wugu],get.prompt2('山崩'+'：选择至多'+player.hp+'名角色摸一张牌并展示')).set('ai',function(target){
                        if(get.attitude(player,target)<=0){
                            return -1;
                        } else {
                            return 1;
                        } 
                    });
                    'step 1'
                    if(result.bool)
                    {
                        for(var i=0;i<result.targets.length;i++){
                            result.targets[i].draw().set('visible',true);
                        }
                    } 
				}
            },
            Diuse_Sha_Huogong:{
                trigger:{source:'damageBegin'},
                forced:true,
				popup:false,
                content:function(){
                    player.viewHandcards(trigger.player);
                    'step 0'
                    player.chooseToDiscard('he',1);
                    'step 1'
                    if(result.bool){
                        trigger.player.damage('fire');
                    }
                    else{
                        trigger.player.addTempSkill('huogong2');
                    }
                },
            },
            Diuse_Sha_Shandian:{
				trigger:{source:'damageBegin'},
				filter:function(event){
					return event.card&&event.card.name=='sha'&&event.notLink();
				},
				forced:true,
				popup:false,
				content:function(){
					trigger.player.damage(3,'nosource','thunder'); 
				}
			},
            Diuse_Sha_Taoyuan:{
                trigger:{source:'damageBegin'},
				filter:function(event){
					return event.card&&event.card.name=='sha'&&event.notLink();
				},
				forced:true,
				popup:false,
				content:function(){
                    var Diuse_Sha_Taoyuan = player.hp
                    'step 0'
                    player.chooseTarget([1,Diuse_Sha_Taoyuan],get.prompt2('山崩'+'：选择至多'+player.hp+'名角色恢复一点体力')).set('ai',function(target){
                        if(get.attitude(player,target)<=0){
                            return -1;
                        } else {
                            return 1;
                        } 
                    });
                    'step 1'
                    if(result.bool)
                    {
                        for(var i=0;i<result.targets.length;i++){
                            result.targets[i].recover();
                        }
                    } 
				},
            },
            Diuse_Sha_Tiesuo:{
                trigger:{source:'damageBegin'},
				forced:true,
				popup:false,
				content:function(){
                    if(trigger.player.name!='link') trigger.player.link(true);
                    else player.draw();
                },
            },
            Diuse_Sha_Wuzhong:{
                trigger:{source:'damageBegin'},
				forced:true,
				popup:false,
				content:function(){
                    player.draw(2);
                },
            },
            Diuse_Sha_Wanjian_Nanman:{
                trigger:{source:'damageBegin'},
				filter:function(event){
					return event.card&&event.card.name=='sha'&&event.notLink();
				},
				forced:true,
				popup:false,
				content:function(){
                    var Sha_Wanjian_Nanman = player.hp
                    'step 0'
                    player.chooseTarget([1,Sha_Wanjian_Nanman],get.prompt2('山崩'+'：选择至多'+player.hp+'名角色弃一张牌')).set('ai',function(target){
                        if(get.attitude(player,target)<=0){
                            return -1;
                        } else {
                            return 1;
                        } 
                    });
                    'step 1'
                    if(result.bool)
                    {
                        for(var i=0;i<result.targets.length;i++){
                            result.targets[i].chooseToDiscard('he',1,true);
                        }
                    } 
				},
            },
            Diuse_Sha_Jiedao:{
                trigger:{source:'damageBegin'},
				forced:true,
				popup:false,
				content:function(){
                    if(trigger.player.isEmpty(1)==false)
                    {
                        player.draw(2);
                    }
                },
            },
            Diuse_Sha_Zhuque:{
                trigger:{source:'useCardToBefore'},
				forced:true,
				popup:false,
                filter:function(event,player){
                    if(event.card.name=='sha'&&!event.card.nature) return true;
                    return false;
                },
                check:function(event,player){
                    return false;
                },
				content:function(){
                    trigger.card.nature='fire';
                },
            },
            Diuse_Sha_Guding:{
                trigger:{source:'damageBegin'},
				forced:true,
				popup:false,
				content:function(){
                    if(trigger.player.countCards('h')==0)
                    {
                        trigger.num++;
                    }
                },
            }, 
            Diuse_Sha_Hanbing:{
                trigger:{source:'damageBegin'},
				forced:true,
				popup:false,
                content:function(){
					"step 0"
					if(trigger.player.countDiscardableCards(player,'he')){
						player.line(trigger.player);
						player.discardPlayerCard('he',trigger.player,true);
					}
					"step 1"
					if(trigger.player.countDiscardableCards(player,'he')){
						player.line(trigger.player);
						player.discardPlayerCard('he',trigger.player,true);
					}
                },
            },
            Diuse_Sha_Cixiong:{
                trigger:{
                    player:"useCardToPlayered",
                },
                forced:true,
				popup:false,
                filter:function(event,player){
                    if(event.card.name!='sha') return false;
					if(player.sex=='male'&&event.target.sex=='female') return true;
					if(player.sex=='female'&&event.target.sex=='male') return true;
					return false;
                },
				content:function(){
                    "step 0"
					trigger.target.chooseToDiscard('弃置一张手牌，或令'+get.translation(player)+'摸一张牌').set('ai',function(card){
						var trigger=_status.event.getTrigger();
						return -get.attitude(trigger.target,trigger.player)-get.value(card);
					});
					"step 1"
					if(result.bool==false) player.draw();
                }
            },
            Diuse_Sha_Zhuque:{
				trigger:{
					player:'useCardToPlayered',
				},
                forced:true,
				popup:false,
				content:function(){
                    trigger.card.nature='fire';
				},
            },
            Diuse_Sha_Qinggang:{
				trigger:{
					player:'useCardToPlayered',
				},
                forced:true,
				popup:false,
				content:function(){
					trigger.target.addTempSkill('qinggang2');
					trigger.target.storage.qinggang2.add(trigger.card);
				},
            },
            Diuse_Sha_Qinglong:{
				trigger:{player:'shaMiss'},
                forced:true,
				popup:false,
				content:function(){
                    player.chooseToUse(get.prompt('Shanbeng'),function(card,player,event){
                        if(get.name(card)!='sha') return false;
                        return lib.filter.filterCard.apply(this,arguments);
                    },trigger.target,-1);
				}
            },
            Diuse_Sha_Guanshi:{
                trigger:{player:'shaMiss'},
                forced:true,
				popup:false,
                filter:function(event,player){
                    return event.card.name=='sha'&&!event.getParent().directHit.contains(event.target);
                },
				content:function(){
                    "step 0"
					var next=player.chooseToDiscard(get.prompt('guanshi'),2,'he',function(card){
						return _status.event.player.getEquip('guanshi')!=card;
					});
					next.logSkill='guanshi_skill';
					next.set('ai',function(card){
						var evt=_status.event.getTrigger();
						if(get.attitude(evt.player,evt.target)<0){
							if(evt.baseDamage+evt.extraDamage>=Math.min(2,evt.target.hp)){
								return 8-get.value(card)
							}
							return 5-get.value(card)
						}
						return -1;
					});
					"step 1"
					if(result.bool){
						trigger.untrigger();
						trigger.trigger('shaHit');
						trigger._result.bool=false;
						trigger._result.result=null;
					}
				},
            },
            Diuse_Sha_Baiyin:{
				trigger:{source:'damageBegin'},
				filter:function(event){
					return event.card&&event.card.name=='sha'&&event.notLink();
				},
				forced:true,
				popup:false,
				content:function(){
					trigger.num++;
                    player.recover();
				}
            },
            Diuse_Sha_Tengjia:{
				trigger:{source:'damageBegin'},
				filter:function(event){
					if(event.card.name =='sha' && event.card.nature == 'fire') return true;
				},
				forced:true,
				popup:false,
				content:function(){
					trigger.num++;
				}
            },
            Diuse_Sha_Renwang:{
                trigger:{
                    player:"useCardToPlayered",
                },
				forced:true,
				popup:false,
                filter:function(event,player){
                    var Diuse_Sha_Renwang = get.color(event.card)
                    player.storage.Shanbeng=Diuse_Sha_Renwang;
                    return Diuse_Sha_Renwang;
                },
                content:function(){
                    var Diuse_Sha_Renwang2 = player.storage.Shanbeng;
                    if (Diuse_Sha_Renwang2=='red')
                    {
                        trigger.directHit.addArray(game.filterPlayer(function(current){
                            return current!=player;
                        }));
                    } else {
                        player.draw();
                    }
                },
            },
            Diuse_Sha_Wuxie:{
                trigger:{
                    player:"useCardToPlayered",
                },
				forced:true,
				popup:false,
                content:function(){
                    trigger.directHit.addArray(game.filterPlayer(function(current){
                        return current!=player;
                    }));
                },
            },
            Diuse_Sha_Juedou:{
                trigger:{
                    player:"useCardToPlayered",
                },
                forced:true,
				popup:false,
                filter:function(event,player){
                    return event.card.name=='sha'&&!event.getParent().directHit.contains(event.target);
                },
				content:function(){
                    player.chooseUseTarget({name:'juedou'},'是否视为使用一张【决斗】？',false);
                }
            },
            Diuse_Sha_Bagua:{ 
                trigger:{
                    player:"useCardToPlayered",
                },
                forced:true,
				popup:false,
                filter:function(event,player){
                    return event.card.name=='sha'&&!event.getParent().directHit.contains(event.target);
                },
                content:function(){
                    "step 0"
                    player.judge('bagua',function(card){return (get.color(card)=='red')?1.5:-0.5});
                    "step 1"
					if(result.judge>0){
                        trigger.directHit.addArray(game.filterPlayer(function(current){
                            return current!=player;
                        }));
					} else {
                        player.draw();
                    }
                },
            },
            Diuse_Xirang:{
                audio:"ext:术樱:2",
                audioname:["Diuse_Fuhua"],
                trigger:{
                    player:"phaseDrawBefore",
                },
                forced:true,
                content:function (target,player,num)
                {
                    trigger.cancel();
                    player.draw();
                    player.draw(2,'bottom');
                },
            },
            Diuse_Xunxin:{
                marktext:"岚",
                intro:{
                    content:'cards',
                    onunmark:function(storage,player){
                        if(storage&&storage.length){
                            player.$throw(storage,1000);
                            game.cardsDiscard(storage);
                            game.log(storage,'被置入了弃牌堆');
                        storage.length=0;
                        }
                    },
                },
                group:['Diuse_Xunxin_AtkDamage','Diuse_Xunxin_Lose','Diuse_Xunxin_Chu'],
				subSkill:{
                    AtkDamage:{
                        audio:"ext:术樱:2",
                        audioname:["Diuse_Fuhua"],
                        trigger:{
                            player:'damageEnd'
                        },
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
                            player.draw();
                            "step 2"
                            if(player.countCards('h')){
                                player.chooseCard('将一张手牌置于武将牌上作为“岚”',true);
                            }
                            else{
                                event.goto(4);
                            }
                            "step 3"
                            if(result.cards&&result.cards.length){
                                player.lose(result.cards,ui.special,'toStorage');
                                player.storage.Diuse_Xunxin=player.storage.Diuse_Xunxin.concat(result.cards);
                                player.syncStorage('Diuse_Xunxin');
                                player.markSkill('Diuse_Xunxin');
                                game.log(player,'将',result.cards,'置于武将牌上作为“岚”');
                            }
                            "step 4"
                            if(event.xunxinNum>0){
                                player.chooseBool(get.prompt2('Diuse_Xunxin')).set('frequentSkill','Diuse_Xunxin');
                            }
                            else event.finish();
                            "step 5"
                            if(result.bool){
                                player.logSkill('Diuse_Xunxin');
                                event.goto(1);
                            }
                        },
                        ai:{
                            maixie:true,
                            maixie_hp:true,
                            threaten:0.8,
                            effect:{
                                target:function(card,player,target){
                                    if(get.tag(card,'damage')){
                                        if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
                                        if(!target.hasFriend()) return;
                                        if(target.hp>=4) return [0.5,get.tag(card,'damage')*2];
                                        if(!target.hasSkill('Diuse_Xunxin')&&target.hp>1) return [0.5,get.tag(card,'damage')*1.5];
                                    }
                                }
                            }
                        }
                    },
                    Lose:{
                        trigger:{player:'loseAfter'},
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
                            var cards=[];
                            for(var i=0;i<trigger.cards2.length;i++){
                                if(get.position(trigger.cards2[i],true)=='d'){
                                    game.cardsGotoSpecial(trigger.cards2[i],'toStorage');
                                    player.storage.Diuse_Xunxin=player.storage.Diuse_Xunxin.concat(trigger.cards2[i]);
                                    player.syncStorage('Diuse_Xunxin');
                                    player.markSkill('Diuse_Xunxin');
                                    game.log(player,'将',trigger.cards2[i],'置于武将牌上作为“岚”');
                                }
                            }
                            'step 1'
                            player.markSkill('Diuse_Xunxin');
                        },
                    },
                    Chu:{
                        trigger:{player:'phaseUseBefore'},
                        direct:true,
                        content:function(){
                            if(player.storage.Diuse_Xunxin.length>=30)
                            {
                                player.draw(5);
                                player.addTempSkill('wansha',{player:'phaseUseAfter'});
                                player.addTempSkill('minigongxin',{player:'phaseUseAfter'});
                                player.addTempSkill('pingjian',{player:'phaseUseAfter'});
                                player.addTempSkill('Diuse_Yifa',{player:'phaseUseAfter'});
                            }
                            if(player.storage.Diuse_Xunxin.length>=20){
                                player.draw(4);
                                player.addTempSkill('wansha',{player:'phaseUseAfter'});
                                player.addTempSkill('minigongxin',{player:'phaseUseAfter'});
                            } else if(player.storage.Diuse_Xunxin.length>=15){
                                player.draw(3);
                                player.addTempSkill('pingjian',{player:'phaseUseAfter'});
                            } else if(player.storage.Diuse_Xunxin.length>=10){
                                player.draw(2);
                                player.addTempSkill('Diuse_Yifa',{player:'phaseUseAfter'});
                            } else if(player.storage.Diuse_Xunxin.length>=5){
                                player.draw(2);
                            }
                        },
                    },
                },
            },
            Diuse_Xianfa:{
                audio:"ext:术樱:2",
                audioname:["shangxian"],
                enable:"phaseUse",
                usable:1,
                discard:false,
                check:function (event,player){
                    if(ai.get.attitude(player,event.player)>=0) return true;      
                },
                filterTarget:function (card,player,target)
                {
                    return target!=player;
                },
                selectTarget:1,
                content:function (targets)
                {
                    if(player.storage.Yinyang==true){
                        player.draw();
                        targets[0].draw();
                        targets[0].addTempSkill('Diuse_Yinyang2',{player:'phaseAfter'});
                    }else{
                        player.draw();
                        targets[0].draw();
                        targets[0].addTempSkill('Diuse_Yinyang1',{player:'phaseAfter'});
                    }
                },
                ai:{
                    order:1,
                    player:function (player){
                        if(ai.get.attitude(player,target)>=3){
                            return 1;
                        } else {
                            return 0;
                        }            
                    },
                },
            },
            Diuse_Yinyang:{
                audio:"ext:术樱:2",
                audioname:["shangxian"],
                mark:true,
                locked:false,
                zhuanhuanji:true,
                marktext:"阴",
                intro:{
                    content:function (storage,player,skill){
                        var str=player.storage.Yinyang?'阳：摸牌阶段，你多摸一张牌':'阴：出牌阶段限一次。多使用一张杀';
                        return str;
                    },
                },
                trigger:{
                    player:"phaseEnd",
                },
                content:function (card,player,num){
                    if(player.storage.Yinyang==true){
                        player.storage.Yinyang=false;
                        player.removeSkill('Diuse_Yinyang2');
                        player.addSkill('Diuse_Yinyang1');
                    }else{
                        player.storage.Yinyang=true;
                        player.removeSkill('Diuse_Yinyang1');
                        player.addSkill('Diuse_Yinyang2');
                    }
                },
                ai:{
                    order:1,
                    result:{
                        target:-1,
                    },
                },
            },
            "Diuse_Yinyang1":{
                mod:{
                    cardUsable:function (card,player,num)
                    {
                        if(card.name=='sha') return num+1;
                    },
                },
            },
            "Diuse_Yinyang2":{
                trigger:{
                    player:"phaseDrawBegin2",
                },
                frequent:true,
                filter:function(event,player){
                    return !event.numFixed;
                },
                content:function(){
                    trigger.num++;
                },
                ai:{
                    threaten:1.3,
                },
            },
            Diuse_Tiandi:{
                audio:"ext:术樱:2",
                audioname:["shangxian"],
                unique:true,
                enable:"chooseToUse",
                mark:true,
                limited:true,
                skillAnimation:true,
                animationStr:"天地",
                animationColor:"fire",
                init:function (player){
                    player.storage.Tiandi=false;
                },
                filter:function (event,player){
                    if(player.storage.Tiandi) return false;
                    if(event.type=='dying'){
                        if(player!=event.dying) return false;
                        return true;
                    }
                    else if(event.parent.name=='phaseUse'){
                        return true;
                    }
                    return false;
                },
                content:function (){
                    'step 0'
                    player.awakenSkill('Diuse_Tiandi');
                    player.storage.Tiandi=true;
                    player.addSkill('Diuse_Yifa');
                    'step 1'
                    if(player.hp<=0){
                        player.link(false);
                        player.turnOver(false);
                        player.recover();
                        player.draw(3);
                    }
                    'step 2'
                    player.chooseTarget(get.prompt('Diuse_Tiandi'),'选择一名角色增加一点体力上限并摸一张牌',function(player,target){
                        return player!=target
                    })
                    "step 3"
                    if(result.bool){
                        result.targets[0].gainMaxHp(1);
                        result.targets[0].recover();
                    }
                },
                ai:{
                    order:0.5,
                    skillTagFilter:function (player,tag,target){
                        if(player!=target||player.storage.Tiandi) return false;
                    },
                    save:true,
                    result:{
                        player:function (player){
                            if(player.hp<=0) return 10;
                            if(player.hp<=1&&player.countCards('he')<=1) return 10;
                            return 0;
                        },
                    },
                    threaten:function (player,target){
                        if(!target.storage.Tiandi) return 0.6;
                    },
                },
                intro:{
                    content:"limited",
                },
            },
            Diuse_Yifa:{
                audio:"ext:术樱:2",
                audioname:["shangxian"],
                enable:"phaseUse",
                usable:1,
                filter:function (target,player){
                    return player.hp>=0;
                },
                content:function (){
                    "step 0"
                    player.chooseTarget(get.prompt('Diuse_Yifa'),'选择一名角色临时获得一个技能').set('ai',function(target){
                        var num3 =0;
                        if(ai.get.attitude(player,target)>=0){
                            num3++;
                        } else if(target==player){
                            num3++;
                        } 
                        return num3;
                        
                    });
                    "step 1"
                    if(result.bool){
                        var target=result.targets[0];  
                        if(target==player)
                        {
                            var num=[1,2,3,4,5,6,7,8,9,10,11,14,15,19,20,21].randomGet();
                            switch(num)
                            {
                                case 1:target.addTempSkill('Diuse_Xuesha',{player:'phaseUseAfter'});break;
                                case 2:target.addTempSkill('Diuse_Diewu',{player:'phaseUseAfter'});break;
                                case 3:target.addTempSkill('Diuse_Guozai',{player:'phaseUseAfter'});break;
                                case 4:target.addTempSkill('Diuse_Zhonggou',{player:'phaseUseAfter'});break;
                                case 5:target.addTempSkill('Diuse_Yinmie',{player:'phaseUseAfter'});break;
                                case 6:target.addTempSkill('Diuse_Renfan',{player:'phaseUseAfter'});break;
                                case 7:target.addTempSkill('Diuse_Wange',{player:'phaseUseAfter'});break;
                                case 8:target.addTempSkill('Diuse_Sangzhong',{player:'phaseUseAfter'});break;
                                case 9:target.addTempSkill('Diuse_Zhongqu',{player:'phaseUseAfter'});break;
                                case 10:target.addTempSkill('Diuse_Luoying',{player:'phaseUseAfter'});break;
                                case 11:target.addTempSkill('Diuse_Yishan',{player:'phaseUseAfter'});break;
                                case 14:target.addTempSkill('Diuse_Yayv',{player:'phaseUseAfter'});break;
                                case 15:target.addTempSkill('Diuse_Cunjin',{player:'phaseUseAfter'});break;

                                case 19:target.addTempSkill('Diuse_Bingren',{player:'phaseUseAfter'});break;
                                case 20:target.addTempSkill('Diuse_Fanchen',{player:'phaseUseAfter'});break;
                                case 21:target.addTempSkill('Diuse_Zhejian',{player:'phaseUseAfter'});break;
                                default: return 0;
                            }
                        }else{
                            var num=[1,2,3,4,5,6,7,8,9,10,11,12,14,15,19,20,21,22,23,24].randomGet();
                            player.draw(2);
                            switch(num)
                            {
                                case 1:target.addTempSkill('Diuse_Xuesha',{player:'phaseUseAfter'});break;
                                case 2:target.addTempSkill('Diuse_Diewu',{player:'phaseUseAfter'});break;
                                case 3:target.addTempSkill('Diuse_Guozai',{player:'phaseUseAfter'});break;
                                case 4:target.addTempSkill('Diuse_Zhonggou',{player:'phaseUseAfter'});break;
                                case 5:target.addTempSkill('Diuse_Yinmie',{player:'phaseUseAfter'});break;
                                case 6:target.addTempSkill('Diuse_Renfan',{player:'phaseUseAfter'});break;
                                case 7:target.addTempSkill('Diuse_Wange',{player:'phaseUseAfter'});break;
                                case 8:target.addTempSkill('Diuse_Sangzhong',{player:'phaseUseAfter'});break;
                                case 9:target.addTempSkill('Diuse_Zhongqu',{player:'phaseUseAfter'});break;
                                case 10:target.addTempSkill('Diuse_Luoying',{player:'phaseUseAfter'});break;
                                case 11:target.addTempSkill('Diuse_Yishan',{player:'phaseUseAfter'});break;
                                case 12:target.addTempSkill('Diuse_Xirang',{player:'phaseUseAfter'});break;
                                case 14:target.addTempSkill('Diuse_Yayv',{player:'phaseUseAfter'});break;
                                case 15:target.addTempSkill('Diuse_Cunjin',{player:'phaseUseAfter'});break;
                                case 19:target.addTempSkill('Diuse_Xianfa',{player:'phaseUseAfter'});break;
                                case 20:target.addTempSkill('Diuse_Yinyang',{player:'phaseUseAfter'});break;
                                case 21:target.addTempSkill('Diuse_Yifa',{player:'phaseUseAfter'});break;
                                case 22:target.addTempSkill('Diuse_Bingren',{player:'phaseUseAfter'});break;
                                case 23:target.addTempSkill('Diuse_Fanchen',{player:'phaseUseAfter'});break;
                                case 24:target.addTempSkill('Diuse_Zhejian',{player:'phaseUseAfter'});break;
                                default: return 0;
                            }
                        }
                    }
                },
                ai:{
                    order:10,
                    threaten:0.5,
                    result:{
                        player:1,
                    },
                },
            },
            Diuse_Bingren:{
                forced:true,
                audio:"ext:术樱:2",
                audioname:["Diuse_Shilv"],
                trigger:{
                    player:"equipAfter",
                },
                filter:function (event,player){
                    return get.subtype(event.card)=='equip1';
                },
                content:function (){
                    var Br1=player.getAttackRange();
                    player.removeSkill('Diuse_Yi');
                    player.removeSkill('Diuse_Er');
                    player.removeSkill('Diuse_San');
                    player.removeSkill('Diuse_Si');
                    player.removeSkill('Diuse_Wu');
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
                        audioname:["Diuse_Shilv"],
                        trigger:{
                            player:"useCardToPlayered",
                        }, 
                        frequent:true,
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
                        audioname:["Diuse_Shilv"],
                        trigger:{
                            player:"phaseAfter",
                        },
                        frequent:true,
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
                        },
                    },
                },
            },
            Diuse_Er:{
                audio:"ext:术樱:3",
                audioname:["Diuse_Shilv"],
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
                audioname:["Diuse_Shilv"],
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
                        var num3 =0;
                        if(ai.get.attitude(player,target)>=0){
                            num3++;
                        } else if(target==player){
                            num3++;
                        } 
                        return num3;
                        
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
                audioname:["Diuse_Shilv"],
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
                audioname:["Diuse_Shilv"],
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
                        player.draw(target.hp);
                    }
                },
            },
            Diuse_Fanchen:{
                audio:"ext:术樱:3",
                audioname:["Diuse_Shilv"],
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
                        if(player.countCards('h','shan')>=1)
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
                audioname:["Diuse_Shilv"],
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
            Diuse_Kongzhan:{
                audio:"ext:术樱:2",
                audioname:["Diuse_Yayi"],
                trigger:{
                    player:"shaBegin",
                },
                usable:1,
                content:function (){
                    'step 0'
                    player.chooseTarget(get.prompt('Diuse_Kongzhan'),function(card,player,target){
                        return _status.event.targets.contains(target);
                    }).set('ai',function(target){
                        return 2-get.attitude(_status.event.player,target);
                    }).set('targets',trigger.targets);
                    'step 1'
                    if(result.bool){
                        var target=result.targets[0];
                        event.target=target;
                        target.damage();
                        target.addTempSkill('Diuse_Kongzhan1');
                        target.addTempSkill('Diuse_Kongzhan2');
                    }
                },
            },
            Diuse_Kongzhan1:{
                trigger:{
                    player:["useCard","respond"],
                },
                usable:1,
                silent:true,
                popup:false,
                forced:true,
                filter:function(event,player){
                    return event.card.name=='shan';
                },
                content:function(){
                    player.draw(2);
                    player.removeSkill('Diuse_Kongzhan1');
                    player.removeSkill('Diuse_Kongzhan2');
                }
            },
            Diuse_Kongzhan2:{
                trigger:{
                    player:"damageBefore",
                },
                usable:1,
                silent:true,
                popup:false,
                forced:true,
                filter:function(event){
                    return event.card&&event.card.name=='sha';
                },
                content:function(){
                    trigger.source.draw(2);
                    player.removeSkill('Diuse_Kongzhan1');
                    player.removeSkill('Diuse_Kongzhan2');
                },
            },
            Diuse_Dianci:{
                group:['Diuse_Dianci_Mark','Diuse_Dianci_Hit'],
				subSkill:{
					Mark:{
                        marktext:"磁",
                        mark:true,
                        intro:{
                            content:function (storage,player,skill){
                            return '电磁能量'
                            },
                        },
                        locked:true,
                        audio:"ext:术樱:2",
                        audioname:["Diuse_Yayi"],
                        trigger:{
                            player:"useCardToPlayered",
                        },
                        frequent:true,
                        filter:function (event,player){
                            if(event.getParent().triggeredTargets3.length>1) return false;
                            if(!player.isPhaseUsing()) return false;
                            if(!['basic','trick'].contains(get.type(event.card))) return false;
                            if(get.tag(event.card,'damage')) return true;
                            return false;
                        },
                        content:function (){
                            player.addMark('Diuse_Dianci_Mark',1);
                        },
					},
					Hit:{
                        trigger:{
                            player:'useCardAfter',
                        },
                        filter:function(event,player){
                            if(player.hasSkill('Diuse_DianciY')||!player.countCards('h')) return false;
                            if(!event.targets||!event.targets.length||!event.isPhaseUsing(player)) return false;
                            var history=player.getHistory('useCard');
                            var index=history.indexOf(event)-1;
                            if(index<0) return false;
                            var evt=history[index];
                            if(!evt||!evt.targets||!evt.targets.length||!evt.isPhaseUsing(player)) return false;
                            for(var i=0;i<event.targets.length;i++){
                                if(evt.targets.contains(event.targets[i])&&lib.filter.filterTarget({name:'sha'},player,event.targets[i])) return true;
                            }
                            return false;
                        },
                        direct:true,
                        content:function(){
                            var targets=player.getLastUsed(1).targets;
                            var next=player.chooseToUse();
                            next.set('targets',game.filterPlayer(function(current){
                                return targets.contains(current)&&trigger.targets.contains(current);
                            }));
                            next.set('openskilldialog',get.prompt2('Diuse_Dianci'));
                            next.set('norestore',true);
                            next.set('_backupevent','Diuse_DianciX');
                            next.set('custom',{
                                add:{},
                                replace:{window:function(){}}
                            });
                            next.backup('Diuse_DianciX');
                            player.addMark('Diuse_Dianci_Mark',1);
                        },
                    }, 
                },
            },
            Diuse_DianciX:{
				filterCard:function(card){
					return get.itemtype(card)=='card';
				},
				position:"h",
				viewAs:{
					name:"sha",nature:'thunder',
				},
				filterTarget:function (card,player,target){
					return _status.event.targets&&_status.event.targets.contains(target)&&lib.filter.filterTarget.apply(this,arguments);
				},
				prompt:"将一张牌当杀使用，该杀占用使用杀的次数。",
				check:function (card){return 7-get.value(card)},
                onuse:function(links,player){player.addTempSkill('Diuse_DianciY')},
			},
            Diuse_DianciY:{},
            Diuse_Yvlei:{
                group:['Diuse_Yvlei_Draw','Diuse_Yvlei_Move'],
                subSkill:{
                    Draw:{
                        trigger:{player:'phaseBegin'},
                        filter:function(event,player){
                            var Yvlei1 = event.player.countMark('Diuse_Dianci_Mark');
                            if(Yvlei1 >= 3) return true;
                        },
                        content:function(){
                            var Diuse_Yvlei = player.countMark('Diuse_Dianci_Mark');
                            'step 0'
                            if (Diuse_Yvlei>=5)
                            {
                                var card=get.discardPile(function(card){
                                    return card.nature=='thunder'||card.name=='sha';
                                });
                                if(card) {
                                    player.gain(card,'gain2');
                                }
                                player.draw(2);
                                player.addSkill('Diuse_Leidian');
                                player.removeMark('Diuse_Dianci_Mark',5);
                            }
                            'step 1'
                            if(Diuse_Yvlei>=3)
                            {
                                var card=get.discardPile(function(card){
                                    return card.name=='sha';
                                });
                                if(card) player.gain(card,'gain2');
                                player.removeMark('Diuse_Dianci_Mark',3);
                                player.draw();
                            }
                        },
                    },
                    Move:{
                        trigger:{player:'damageBegin4'},
                        filter:function(event){
                            return event.nature=='thunder';
                        },
                        forced:true,
                        content:function(){
                            trigger.cancel();
                        },
                        ai:{
                            nofire:true,
                            effect:{
                                target:function(card,player,target,current){
                                    if(get.tag(card,'thunderDamage')) return 'zerotarget';
                                }
                            }
                        }
                    },
                },
            },
            Diuse_Leidian:{
                trigger:{
                    global:"damageBegin1",
                },
                filter:function(event){
                    return event.source&&event.nature=='thunder';
                },
                check:function(event,player){
                    return get.attitude(player,event.source)>0&&get.attitude(player,event.player)>0;
                },
                prompt:function(event){
                    return get.translation(event.source)+'即将对'+get.translation(event.player)+'造成伤害，'+get.prompt('Diuse_Leidian');
                },
                logTarget:"source",
                content:function(){
                    trigger.source.judge().callback=lib.skill.Diuse_Leidian.callback;
                },
                callback:function(){
                    var targets=game.filterPlayer(function(current){
                        return current!=player&&current.hasSkill('Diuse_Leidian');
                    });
                    var evt=event.getParent(2);
                    if(event.judgeResult.color=='black'){
                        evt._trigger.num++;
                    }
                    else{
                        player.draw(2);
                    }
                },
            },
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
                        audioname:["Diuse_Yuexia"],
						trigger:{global:"gameDrawAfter"},
                        forced:true,
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
                        audioname:["Diuse_Yuexia"],
                        trigger:{player:['changeHp','loseMaxHpAfter','gainMaxHpAfter']},
                        forced:true,
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
                        audioname:["Diuse_Yuexia"],
                        trigger:{player:"dyingBegin"},
                        forced:true,
                        filter:function(event,player){
                            var bool=game.hasPlayer(function(current){
                                return current!=player&&current.hasMark('Diuse_Xueqi_Mark');
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
                        audioname:["Diuse_Yuexia"],
                        trigger:{source:'damageBefore'},
                        forced:true,
                        content:function(){
                            trigger.player.addMark('Diuse_Xueqi_Mark',trigger.num);
                            trigger.cancel();
                        },
                    },
                    Draw:{
                        audio:"ext:术樱:2",
                        audioname:["Diuse_Yuexia"],
                        trigger:{global:'phaseUseBefore'},
                        filter:function(event,player){
                            return event.player.countMark('Diuse_Xueqi_Mark')>1;
                        },
                        forced:true,
                        content:function(){
                            var Marknum=trigger.player.countMark('Diuse_Xueqi_Mark');
                            trigger.player.loseHp(Marknum-1);
                            trigger.player.removeMark('Diuse_Xueqi_Mark',Marknum-1);
                            player.recover(Marknum-1);
                        },
                    },
                },
            },
            Vate:{
                trigger:{
                    target:"useCardToTargeted",
                },
                direct:true,
                filter:function(event,player){
                    return event.card.name=='sha';
                },
                content:function(){
                    var playern=trigger.player;
                    'step 0'
                    player.chooseCardTarget({
                        filterCard:true,
                        selectCard:1,
                        position:'he',
                        filterTarget:function(card,player,target,event){
                            return player!=target&&_status.event.targets.contains(target)&&_status.event.targets.contains(playern);
                        },
                        ai1:function(card){
                            if(card.name=='du') return 20;
                            if(_status.event.player.storage.drlt_xiongluan&&get.type(card)=="equip") return 15;
                            return 6-get.value(card);
                        },
                        ai2:function(target){
                            var att=get.attitude(_status.event.player,target);
                            if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
                                if(target.hasSkillTag('nodu')) return 0.1;
                                return 1-att;
                            }
                            return att-3;
                        },
                        prompt:get.prompt2('drlt_congjian'),
                        targets:trigger.targets,
                    });
                    'step 1'
                    if(result.bool){
                        event.target=result.targets[0];
                        player.line(event.target);
                        player.logSkill('drlt_congjian');
                        event.target.gain(result.cards[0],player,'give');
                        var num=1;
                        if(get.type(result.cards[0])=='equip') num=2;
                        player.draw(num);
                    };
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
			Diuse_Xuesha:"血杀",
            "Diuse_Xuesha_info":"你的回合内，有角色受到伤害后你可以摸一张牌并可以额外使用一张杀。",
            Diuse_Diewu:"蝶舞",
            "Diuse_Diewu_info":"出牌阶段限一次，你弃置一张红色牌并指定一名角色摸一张牌后可以使用一张杀（不计入出杀次数）。",
            "Diuse_Xuesha2":"血杀",
            Diuse_Anhong:"暗洪",
            "Diuse_Anhong_info":"觉醒技。当你受到伤害前你可以摸一张牌，如果你受到伤害后的体力低于2则恢复一点体力；失去该技能并获得技能血杀。",
            Diuse_Guozai:"过载",
            "Diuse_Guozai_info":"锁定技。游戏开始时。你的体力上限增加X点（X为你的角色体力上限）并摸Y张牌（Y为你的当前体力值上限）",
            Diuse_Zhonggou:"重构",
            "Diuse_Zhonggou_info":"锁定技。你的手牌上限+X（X为你的当前体力值），当你受到非属性伤害前你取消这次伤害并选择失去一点体力或减少一点体力上限。",
            Diuse_Yinmie:"湮灭",
            "Diuse_Yinmie_info":"出牌阶段限一次。你可以失去1点体力值上限或1点体力值让一名其他角色进入铁锁状态并摸2张牌。",
            Diuse_Fuhe:"负荷",
            "Diuse_Fuhe_info":"锁定技。你永远处于铁锁状态，当你受到伤害后该伤害+1。当你的体力上限发生变化后你摸一张牌。",
            "Diuse_Fuhe2":"负荷",
            "Diuse_Fuhe3":"负荷",
            Diuse_Wange:"挽歌",
            "Diuse_Wange_info":"回合开始时限一次。你额外获得任意一个有益阶段执行；你翻面时你摸两张牌并恢复一点体力或获得技能鸦羽。",
            Diuse_Sangzhong:"丧钟",
            "Diuse_Sangzhong_info":"你于回合外受到伤害后，你可以摸一张牌或复原武将。如果你没有手牌则改为摸两张。",
            Diuse_Zhongqu:"终曲",
            "Diuse_Zhongqu_info":"出牌阶段限一次。你可以弃一张牌并指定一名角色判定根据点数执行效果：1：你摸三张牌并随机获得其一张任何区域的牌然后在你下个回合开始前杀的伤害+1；2-7：你随机获得其一张任何区域的牌并摸一张牌；8-12：你摸两张牌；13：你的武将翻面。",
            Diuse_Luoying:"落樱",
            "Diuse_Luoying_info":"出牌阶段限两次。当你使用可以造成伤害的牌指定目标后该次数减一。你可以选择一名指定角色，然后对其造成伤害后如果其拥有樱花标记则该伤害+1否则获得樱花标记，且你摸一张牌。",
            Diuse_Yishan:"一闪",
            "Diuse_Yishan_info":"在你使用闪后你可以引爆或给予其他角色樱花标记，如果该角色因此受到伤害则你摸X张牌。(X为你的武器距离)",
            Diuse_Renfan:"刃返",
            "Diuse_Renfan_info":"你使用或打出杀后，你可以与一名有手牌的角色摸一张牌。若场上有凛，则凛也摸一张。",
            "Diuse_Zhongqu1":"终曲",
            Diuse_Yayv:"鸦羽",
            "Diuse_Yayv_info":"锁定技。你的手牌始终等于你的当前体力值。",
            Diuse_Shanbeng:"山崩",
            "Diuse_Shanbeng_info":"当你使用杀指定目标，你可以弃置一张标记牌然后获得相应效果",
            Diuse_Xirang:"息壤",
            "Diuse_Xirang_info":"摸牌阶段时，你跳过摸牌阶段。然后从牌堆顶摸一张，牌堆底摸两张。",
            Diuse_Xunxin:"迅心",
            Diuse_Xunxin_backup:"讯心",
            "Diuse_Xunxin_info":"锁定技。当你受到伤害后你摸一张牌并选择一张手牌放置武将牌上称之为‘岚’；你的牌因弃置而进入弃牌堆的牌会放置‘岚’中；出牌阶段开始时，你根据‘岚’的数量获得效果/技能。",
            Diuse_Xianfa:"仙法",
            "Diuse_Xianfa_info":"出牌限一次。你选择一名角色并在其出牌阶段结束之前获得与你相同的阴阳效果，然后你与其摸一张牌。",
            Diuse_Yinyang:"阴阳",
            "Diuse_Yinyang_info":"回合结束后。你可以转换阴阳并获得相应效果。(阴:多使用一张杀 阳:摸牌阶段多摸一张)",
            Diuse_Tiandi:"天地",
            "Diuse_Tiandi_info":"限定技。出牌阶段或者濒死时可以选择一名角色增加一点体力上限并恢复一点体力，然后你获得技能仪法。如果玩家处于濒死则会清空负面效果并恢复一点体力然后摸三张牌",
            Diuse_Yifa:"仪法",
            "Diuse_Yifa_info":"每轮限一次。你选择一名角色随机临时获得崩坏包的一个角色的技能，如果目标不是自己则摸两张牌。主公技，限定技，觉醒技除外。",
            "Diuse_Yinyang1":"阴",
            "Diuse_Yinyang2":"阳",
            Diuse_Bingren:"兵刃",
            Diuse_Bingren_info:"锁定技。在你使用一张武器牌后，根据当前武器攻击距离摸X张牌并获得相应的技能效果(X为武器距离/2，向下取整，最小且为1)",
            Diuse_Fanchen:"凡尘",
            Diuse_Fanchen_info:"锁定技。回合外第一次受到伤害后，你可以选择恢复一点体力或如果你的体力大于1，则将体力值改为1并进入物理易伤状态。当前回合结束后你恢复体力并摸X张牌（X为你恢复的体力）",
            Diuse_Zhejian:"折剑",
            Diuse_Zhejian_info:"锁定技。其他角色无法弃置或顺走你武器区的牌。",
            Diuse_Yi:"一",
            Diuse_Yi_info:"当你于你的回合内使用一张牌后，你可以弃置一张手牌并摸一张牌。",
            Diuse_Er:"二",
            Diuse_Er_info:"当你于回合内获得一张牌且不是因为此技能获得牌时，你摸一张牌。",
            Diuse_San:"三",
            Diuse_San_info:"出牌阶段限两次。你造成伤害后你可以让场上的一名角色受到一点无伤害来源的伤害。",
            Diuse_Si:"四",
            Diuse_Si_info:"你使用杀或普通锦囊后你可以多增加一个目标，如果取消则摸X张牌(X为你已损失的体力，如果为0则摸1)",
            Diuse_Wu:"五",
            Diuse_Wu_info:"出牌阶段限一次，当你使用可造成伤害的牌指定目标后你可以选择其一个目标然后你摸X张牌。(X为目标当前体力)",
            Diuse_Liu:"六",
            Diuse_Liu_info:"你获得全部攻击距离技能。",
            Diuse_Fanchen1:"凡尘",
            Diuse_Kongzhan:"空斩",
            Diuse_Kongzhan_info:"每回合限一次。你使用杀指定目标后你可以对其造成一点伤害，然后标记猎物。如果其打出或使用闪，其摸两张牌并清空猎物标记；如果其在此之前受到杀的伤害则你摸两张牌并清空猎物标记。回合结束后猎物标记清除。",
            Diuse_Kongzhan1:"空斩",
            Diuse_Kongzhan1_info:"空斩猎物标记，没有受到伤害会摸牌。",
            Diuse_Kongzhan2:"空斩",
            Diuse_Kongzhan2_info:"空斩猎物标记，没有受到伤害会摸牌。",
            Diuse_Dianci:"电磁",
            Diuse_DianciX:"电磁",
            Diuse_Dianci_info:"你使用可以造成伤害的牌指定目标后你可以获得一个电磁标记。如果你连续指定同一个目标两次后可以将一张手牌视为杀对其打出，并获得一个电磁标记。",
            Diuse_Yvlei:"御雷",
            Diuse_Yvlei_info:"锁定技。你免疫雷属性伤害。回合开始时，如果你的电磁标记大于三则可以消耗三个标记摸一张牌从弃牌堆获得一张杀；标记大于五则可以消耗五个标记摸两张牌并从弃牌堆优先获得一张雷杀（如果弃牌堆没有雷杀则换为杀），然后获得雷电技能。",
            Diuse_Leidian:"雷电",
            Diuse_Leidian_info:"当一名角色造成雷属性伤害时，你可以令其判定。若结果为黑色，则此伤害+1；若为红色，则你摸两张牌。",
            Diuse_Xueqi_Mark:"血契",
            Diuse_Xueqi:"血契",
            Diuse_Xueqi_info:"游戏开始时全场其他角色获得一个标记；锁定技。你的体力值超出1点后会流失其余体力，当你体力或上限发生变化后你摸X张牌（X为发生改变的数量，如果你没有手牌则多摸一张牌）",
            Diuse_Shenshi:"神蚀",
            Diuse_Shenshi_info:"锁定技。当你进入濒死时，你选择场上一名有标记的角色令其移除全部标记然后你回复X点体力（X为移除的标记数）；你的手牌上限等于Y（Y为全场标记数量+你最大体力值）",
            Diuse_Shoulie:"狩猎",
            Diuse_Shoulie_info:"锁定技。你造成伤害时改为其获得相同数量的标记；其他角色出牌阶段开始时如果其标记超出一个则其必须失去X点体力并使你恢复X点体力（X为其标记-1）随后其丢弃X个标记",
		},
    },
},"术樱");

    }
},help:{},config:{},package:{
    character:{
        character:{
            Boss_Diuse_Tianshu:["male","",0,["Boss_Tianshu_Go","Boss_Diuse_Tianshu_intro1","Boss_Diuse_Tianshu_intro2","Boss_Diuse_Tianshu_intro3","Boss_Diuse_Tianshu_intro4","Boss_Diuse_Tianshu_intro5"],["boss"],"qun"],
            
            Boss_Ordinary_Hankui:['female','shen',10,['boss_shenyi','Tianshu_Boss_Ordinary_Chiyan','Tianshu_Boss_Ordinary_Fali','Tianshu_Ordinary_Hankui_Die'],['qun','hiddenboss','bossallowed']],
            Boss_Difficulty_Hankui:['female','shen',13,['boss_shenyi','Tianshu_Boss_Difficulty_Chiyan','Tianshu_Boss_Difficulty_Fali','Tianshu_Difficulty_Hankui_Die'],['qun','hiddenboss','bossallowed']],
            Boss_Fucking_Hankui:['female','shen',15,['boss_shenyi','Tianshu_Boss_Chiyan','Tianshu_Boss_Fali','Tianshu_Boss_Shangshi','Tianshu_Fucking_Hankui_Die'],['qun','hiddenboss','bossallowed']],

            Boss_Ordinary_Baiqi:['male','shen',13,['boss_shenyi','boss_zhue','Tianshu_Boss_Tusha','Tianshu_Ordinary_Baiqi_Die'],['qun','hiddenboss','bossallowed']],
            Boss_Difficulty_Baiqi:['male','shen',16,['boss_shenyi','boss_zhue','Tianshu_Boss_Shangshi','Tianshu_Boss_Rentu_1','Tianshu_Boss_Tusha','Tianshu_Difficulty_Baiqi_Die'],['qun','hiddenboss','bossallowed']],
            Boss_Fucking_Baiqi:['male','shen',18,['boss_shenyi','boss_zhue','Tianshu_Boss_Shangshi','Tianshu_Boss_Tusha','Tianshu_Boss_Rentu','Tianshu_Fucking_Baiqi_Die'],['qun','hiddenboss','bossallowed']],

            Boss_Ordinary_WangshenBaiqi:['male','shen',3,['boss_shenyi','Tianshu_Boss_Tusha','Tianshu_Boss_Wangshen','Tianshu_Boss_Ordinary_Bumie','Tianshu_Ordinary_WangshenBaiqi_Die'],['qun','hiddenboss','bossallowed']],
            Boss_Difficulty_WangshenBaiqi:['male','shen',4,['boss_shenyi','Tianshu_Boss_Shangshi','Tianshu_Boss_Difficulty_Shashen','Tianshu_Boss_Difficulty_Bumie','Tianshu_Difficulty_WangshenBaiqi_Die'],['qun','hiddenboss','bossallowed']],
            Boss_Fucking_WangshenBaiqi:['male','shen',5,['boss_shenyi','Tianshu_Boss_Shangshi','Tianshu_Boss_Tusha','Tianshu_Boss_Wangshen','Tianshu_Boss_Fucking_Bumie','Tianshu_Fucking_WangshenBaiqi_Die','Tianshu_Boss_Fucking_Shashen'],['qun','hiddenboss','bossallowed']],
        
            Boss_Ordinary_Guiyanwang:['male','shen',8,['boss_shenyi','Tianshu_Boss_Difu','Tianshu_Boss_Tiemian'],['qun','hiddenboss','bossallowed']],
            Boss_Difficulty_Guiyanwang:['male','shen',16,['boss_shenyi','Tianshu_Boss_Difu','Tianshu_Boss_Tiemian'],['qun','hiddenboss','bossallowed']],
            Boss_Fucking_Guiyanwang:['male','shen',25,['boss_shenyi','Tianshu_Boss_Difu','Tianshu_Boss_Tiemian'],['qun','hiddenboss','bossallowed']],
        },
        translate:{
            Boss_Diuse_Tianshu:"伪天书乱斗",
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
        boss:{
            Boss_Diuse_Tianshu:{
				chongzheng:0,
				loopType:2,
				checkResult:function(player){
					if(player==game.boss&&game.boss.name!='Boss_Ordinary_Guiyanwang'&&game.boss.name!='Boss_Difficulty_Guiyanwang'&&game.boss.name!='Boss_Fucking_Guiyanwang'){
						return false;
					}
				},
				init:function(){
                    _status.additionalReward=function(){
                        return 500;
                    }
                    lib.inpile.remove('shandian');
                    lib.inpile.remove('huoshan');
                    lib.inpile.remove('hongshui');
                    lib.inpile.remove('fulei');
                    lib.inpile.add('honghuangzhili');
                    lib.inpile.sort(lib.sort.card);
                    for(var i=0;i<ui.cardPile.childElementCount;i++){
                        var node=ui.cardPile.childNodes[i];
                        if(node.name=='shandian'){
                            node.classList.remove('fullskin');
                            node.classList.remove('thunder');
                            node.init([node.suit,node.number,'honghuangzhili']);
                        }
                        else if(['huoshan','hongshui','fulei'].contains(node.name)){
                            node.remove();
                        }
                    }
				}
			},
        },
        game:{
            reserveDead:true,
            getSkillDialog:function(skills,prompt){
                var dialog=ui.create.dialog('hidden','forcebutton');
                if(prompt) dialog.addText(prompt);
                for(var i=0;i<skills.length;i++){
                    dialog.add('<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【'+get.translation(skills[i])+'】</div><div>'+lib.translate[skills[i]+'_info']+'</div></div>');
                }
                dialog.addText(' <br> ');
                return dialog;
            },
            skillsList:function(){
                var skills=[];
                var banned=[
                    'huoxin','jueqing','qinqing','beige','huashen',
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
                        if(!info||info.charlotte||(info.unique&&!info.gainable)||info.juexingji||info.limited||info.zhuSkill||info.hiddenSkill) continue;
                        skills.push(list[j]);
                    }
                }
                _status.skillsList=skills;
            },
            hpAndH:function(Hp,Pai){
                var dnum=0;
                var dead=game.dead.slice(0);
                for(var i=0;i<dead.length;i++){
                    if(!dead[i].side&&dead[i].maxHp>0&&dead[i].parentNode==game.players[i].parentNode){
                        dead[i].revive(dead[i].maxHp);
                        dnum++;
                    }
                }
                for(var i=0;i<game.players.length;i++){
                    if(game.players[i].side) continue;
                    game.players[i].hujia=0;
                    game.players[i].classList.remove('turnedover');
                    game.players[i].removeLink();
                    game.players[i].recover(Hp);
                    game.players[i].draw(Pai);
                }
            },
            taskNum:function(numTask,taskList){
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
            numRandom:function(){
                var num = Math.floor(Math.random() * (100 - 1)) + 1;
                return num;
            },
            newBoss:function(){
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
        },
    },
    skill:{
        skill:{
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
            Boss_Tianshu_Go:{
				trigger:{global:'gameStart'},
				forced:true,
				popup:false,
				fixed:true,
				unique:true,
				content:function(){
                    for(var i=0;i<game.players.length;i++){
                        if(game.players[i]==player) continue;
                        game.players[i].addSkill('Tianshu_Protect');
                    }
					player.smoothAvatar();
                    'step 0'
					game.players[0].chooseControl('普通','困难','阴间');
                    'step 1'
                    if(result.control=='普通'){
                        player.init('Boss_Ordinary_Hankui');
                        //player.init('Boss_Fucking_WangshenBaiqi');
                    } else if(result.control=='困难'){
                        player.init('Boss_Difficulty_Hankui');
                    } else {
                        player.init('Boss_Fucking_Hankui');
                    }
					_status.noswap=true;
					game.addVideo('reinit2',player,player.name);
				}
			},
            Tianshu_Protect:{
                mode:['boss'],
                trigger:{player:'damageBefore'},
                forced:true,
                content:function(){
                    trigger.cancel();
                    player.removeSkill('Tianshu_Protect');
                },
            },
            Tianshu_Boss_Ordinary_Chiyan:{
                mode:['boss'],
                group:['Tianshu_Boss_Ordinary_Chiyan_pha','Tianshu_Boss_Ordinary_Chiyan_Draw'],
                subSkill:{
                    pha:{
                        trigger:{
                            player:"phaseDrawBefore",
                        },
                        forced:true,
                        content:function (target,player,num)
                        {
                            trigger.cancel();
                        },
                    },
                    Draw:{
                        trigger:{
                            global:"gainAfter",
                        },
                        forced:true,
                        filter:function(event,player){
                            return(event.player.isAlive()&&event.player!=player&&event.player.isPhaseUsing()&&event.player.countCards('h')>event.player.maxHp)
                        },
                        content:function(player){
                            num=trigger.cards.length
                            player.draw(num);
                        },
                    },
                },
            },
            Tianshu_Boss_Ordinary_Fali:{
                mode:['boss'],
                trigger:{global:"phaseUseAfter"},
                forced:true,
                filter:function(event,player){
					return event.player!=player;
                },
                content:function(){
                    if(trigger.player.countCards('h')>trigger.player.hp){
                        player.draw()
                    }else{
                        trigger.player.chooseToDiscard(1,true);
                    }
                }
            },
            Tianshu_Boss_Difficulty_Chiyan:{
                mode:['boss'],
                trigger:{player:"phaseUseBefore"},
                forced:true,
                round:1,
                filter:function(event,player){
                    if(event.player.hp<event.player.maxHp) return true;  
                },
                content:function(player){
                    var list=game.players.slice(0);
                    list.remove(player);
                    if(list.length){
                        var target=list.randomGet();
                        player.line(target);
                        target.damage();
                        player.recover();
                    }
                }
            },
            Tianshu_Boss_Difficulty_Fali:{
                mode:['boss'],
                group:['Tianshu_Boss_Difficulty_Fali_IsC','Tianshu_Boss_Difficulty_Fali_Ma'],
                subSkill:{
                    IsC:{
                        trigger:{global:"useCard"},
                        forced:true,
                        filter:function(event,player){
                            if(!event.card.isCard){
                                if(event.player!=player) return true;
                                return false;
                            }
                        },
                        content:function(){
                            trigger.cancel();
                            player.draw();
                        }
                    },
                    Ma:{
                        trigger:{global:"phaseUseBefore"},
                        forced:true,
                        filter:function(event,player){
                            return (event.player!=player&&event.player.countCards('h')>=1&&event.player.countCards('h')>event.player.maxHp)
                        },
                        content:function(){
                            "step 0"
                            trigger.player.chooseCard(true,'交给'+get.translation(player)+'一张手牌').set('ai',function(card){
                                if(get.attitude(_status.event.player,_status.event.getParent().player)>0){
                                    return 11-get.value(card);
                                }else{
                                    return 7-get.value(card);
                                }
                            });
                            "step 1"
                            if(result.bool){
                                trigger.player.line(player);
                                player.gain(result.cards,trigger.source,'giveAuto');
                            }
                        },
                    },
                },
            },
            Tianshu_Boss_Chiyan:{
                mode:['boss'],
				mod:{
					targetInRange:function(card,player,target){
						return true;
					},
					selectTarget:function(card,player,range){
						if(card.name=='sha'){
							range[1]=-1;
							range[0]=-1;
						}
					},
					playerEnabled:function(card,player,target){
						if(card.name=='sha'&&target.isFriendOf(player)){
							return false;
						}
					}
				}
			},
            Tianshu_Boss_Fali:{
                mode:['boss'],
                marktext:"乏",
                mark:true,
                intro:{
                    content:function (storage,player,skill){
                    return '小心被跳过哦~'
                    },
                },
                forced:true,
                group:['Tianshu_Boss_Fali_D','Tianshu_Boss_Fali_F'],
                subSkill:{
                    F:{
                        locked:true,
                        trigger:{player:'damageBegin4'},
                        forced:true,
                        content:function(){
                            if(trigger.num>=2) trigger.num=1;

                            player.addMark('Tianshu_Boss_Fali',1);
                            if(player.countMark('Tianshu_Boss_Fali')>=5)
                            {
                                var evt=_status.event.getParent('phaseUse');
                                if(evt&&evt.name=='phaseUse'){
                                    evt.skipped=true;
                                }
                                var evt=_status.event.getParent('phase');
                                if(evt&&evt.name=='phase'){
                                    evt.finish();
                                }
                                player.removeMark('Tianshu_Boss_Fali',5);
                            }
                        },
                    },
                    D:{
                        locked:true,
                        trigger:{player:'phaseBefore'},
                        forced:true,
                        filter:function(event,player){
                            var D_Fmark = player.countMark('Tianshu_Boss_Fali');
                            if(D_Fmark<=0) return false;
                            return true;
                        },
                        content:function(){
                            player.removeMark('Tianshu_Boss_Fali',5);
                        },
                    },
                },
            },
            Tianshu_Boss_Rentu:{
                mode:['boss'],
                marktext:"屠",
                mark:true,
                intro:{
                    content:function (){
                    return '小心被跳过哦!'
                    },
                },
                forced:true,
                group:['Tianshu_Boss_Rentu_Dam','Tianshu_Boss_Rentu_H','Tianshu_Boss_Rentu_Dr','Tianshu_Boss_Rentu_EndDr'],
                subSkill:{
                    Dam:{
                        trigger:{
                            source:"damageBegin1",
                        },
                        forced:true,
                        filter:function(event,player){
                            return player.isMaxHandcard(true);
                        },
                        content:function(){
                            trigger.num++;
                        },
                    },
                    H:{
                        trigger:{
                            global:"phaseUseBegin",
                        },
                        forced:true,
                        filter:function(event,player){
                            return event.player!=player&&event.player.countCards('h')>event.player.maxHp;
                        },
                        content:function(){
                            var Boss_H = trigger.player.countCards('h')-trigger.player.maxHp;
                            trigger.player.chooseToDiscard(Boss_H,true,'h');
                        },
                    },
                    Dr:{
                        trigger:{
                            global:"gainAfter",
                        },
                        forced:true,
                        filter:function(event,player){
                            return event.player!=player;
                        },
                        content:function(){
                            player.addMark('Tianshu_Boss_Rentu',1);
                            if(player.countMark('Tianshu_Boss_Rentu')>8)
                            {
                                var evt=_status.event.getParent('phaseUse');
                                if(evt&&evt.name=='phaseUse'){
                                    evt.skipped=true;
                                }
                                var evt=_status.event.getParent('phase');
                                if(evt&&evt.name=='phase'){
                                    evt.finish();
                                }
                            }
                        },
                    },
                    EndDr:{
                        trigger:{
                            global:"phaseAfter",
                        },
                        forced:true,
                        filter:function(event,player){
                            return event.player!=player&&player.countMark('Tianshu_Boss_Rentu')>=1;
                        },
                        content:function(){
                            player.removeMark('Tianshu_Boss_Rentu',player.countMark('Tianshu_Boss_Rentu'));
                        },
                    },
                },
            },
            Tianshu_Boss_Rentu_1:{
                mode:['boss'],
                marktext:"屠",
                mark:true,
                intro:{
                    content:function (){
                    return '小心被跳过哦!'
                    },
                },
                forced:true,
                group:['Tianshu_Boss_Rentu_1_Dam','Tianshu_Boss_Rentu_1_Dr','Tianshu_Boss_Rentu_1_EndDr'],
                subSkill:{
                    Dam:{
                        trigger:{
                            source:"damageBegin1",
                        },
                        forced:true,
                        filter:function(event,player){
                            return player.isMaxHandcard(true);
                        },
                        content:function(){
                            trigger.num++;
                        },
                    },
                    Dr:{
                        trigger:{
                            global:"gainAfter",
                        },
                        forced:true,
                        filter:function(event,player){
                            return event.player!=player;
                        },
                        content:function(){
                            player.addMark('Tianshu_Boss_Rentu_1',1);
                            if(player.countMark('Tianshu_Boss_Rentu_1')>8)
                            {
                                var evt=_status.event.getParent('phaseUse');
                                if(evt&&evt.name=='phaseUse'){
                                    evt.skipped=true;
                                }
                                var evt=_status.event.getParent('phase');
                                if(evt&&evt.name=='phase'){
                                    evt.finish();
                                }
                            }
                        },
                    },
                    EndDr:{
                        trigger:{
                            global:"phaseAfter",
                        },
                        forced:true,
                        filter:function(event,player){
                            return event.player!=player&&player.countMark('Tianshu_Boss_Rentu_1')>=1;
                        },
                        content:function(){
                            player.removeMark('Tianshu_Boss_Rentu_1',player.countMark('Tianshu_Boss_Rentu_1'));
                        },
                    },
                },
            },
            Tianshu_Boss_Tusha:{
                mode:['boss'],
                trigger:{
                    source:"damageBegin",
                },
                forced:true,
                content:function(){
                    player.judge(function(card){
                        if(card.suit=='club'){ //梅花 
                            trigger.player.chooseToDiscard(2,true,'h');
                        } else if(card.suit=='heart'){ //红桃
                            player.recover();
                        } else if(card.suit=='spade'){ //黑桃
                            trigger.num++;
                        } else if(card.suit=='diamond'){ //方块
                            player.draw(2);
                        }
                        return -1;
                    });
                },
            },
            Tianshu_Boss_Shangshi:{
                mode:['boss'],
                trigger:{
                    player:"loseHpAfter",
                },
                forced:true,
                filter:function(event){
                    return event.num>0;
                },
                content:function(){
                    "step 0"
                    event.shangshiNum=trigger.num;
                    "step 1"
                    event.shangshiNum--;
                    player.recover();
                    player.draw();
                    "step 2"
                    if(event.shangshiNum>0){
                        event.goto(1);
                    } else event.finish();
                },
            },
            Tianshu_Boss_Wangshen:{
                mode:['boss'],
                forced:true,
                group:['Tianshu_Boss_Wangshen_Dr','Tianshu_Boss_Wangshen_H'],
                subSkill:{
                    H:{
                        trigger:{
                            global:"gainAfter",
                        },
                        forced:true,
                        filter:function(event,player){
                            return event.player!=player&&event.player.countCards('h')>event.player.maxHp;
                        },
                        content:function(){
                            var Boss_H = trigger.player.countCards('h')-trigger.player.maxHp;
                            trigger.player.chooseToDiscard(Boss_H,true,'h');
                        },
                    },
                    Dr:{
                        trigger:{
                            player:"damageAfter",
                        },
                        forced:true,
                        content:function(){
                            var evt=_status.event.getParent('phaseUse');
                            if(evt&&evt.name=='phaseUse'){
                                evt.skipped=true;
                            }
                            var evt=_status.event.getParent('phase');
                            if(evt&&evt.name=='phase'){
                                evt.finish();
                            }
                        },
                    },
                },   
            },
            Tianshu_Boss_Ordinary_Bumie:{
                mode:['boss'],
                marktext:"灭",
                mark:true,
                intro:{
                    content:function (){
                    return '不会死亡!'
                    },
                },
                forced:true,
                group:['Tianshu_Boss_Ordinary_Bumie_Dy','Tianshu_Boss_Ordinary_Bumie_Use','Tianshu_Boss_Ordinary_Bumie_Lose','Tianshu_Boss_Ordinary_Bumie_Die'],
                subSkill:{
                    Dy:{
                        trigger:{
                            global:"dyingBefore",
                        },
                        forced:true,
                        content:function(){
                            player.draw(3);
                            if(player.hp<=0){
                                player.recover(99999);
                                if(_status.Task==0){
                                    var num=[1,2,3].randomGet();
                                    if (num == 1){
                                        player.addSkill('Tianshu_Task_1');
                                    } else if(num == 2){
                                        player.addSkill('Tianshu_Task_2');
                                    } else {
                                        player.addSkill('Tianshu_Task_3');
                                    }
                                    _status.Task=1;
                                }
                            } else {
                                player.recover();
                            }
                        },
                    },
                    Use:{
                        trigger:{
                            player:"phaseBefore",
                        },
                        forced:true,
                        content:function(){
                            var numMark=0;
                            var taskOver=0;
                            var numTaskMark = player.countMark('Tianshu_Boss_Ordinary_Bumie');
                            if(numTaskMark==0||numTaskMark==undefined){
                                _status.Task=0;
                                var numBumie = player.maxHp
                                player.addMark('Tianshu_Boss_Ordinary_Bumie',numBumie);
                            }
                            if(player.hasSkill('Tianshu_Task_1')){
                                numMark=player.countMark('Tianshu_Task_1');
                                taskOver=game.taskNum(numMark,1);
                            } else if(player.hasSkill('Tianshu_Task_2')){
                                numMark=player.countMark('Tianshu_Task_2');
                                taskOver=game.taskNum(numMark,2);
                            } else {
                                numMark=player.countMark('Tianshu_Task_3');
                                taskOver=game.taskNum(numMark,3);
                            }
                            if(taskOver==1){
                                player.loseMaxHp(1);
                                if(player.hasSkill('Tianshu_Task_1')){
                                    player.removeMark('Tianshu_Task_1',player.countMark('Tianshu_Task_1'));
                                    player.removeSkill('Tianshu_Task_1');
                                } else if(player.hasSkill('Tianshu_Task_2')){
                                    player.removeMark('Tianshu_Task_2',player.countMark('Tianshu_Task_2'));
                                    player.removeSkill('Tianshu_Task_2');
                                } else {
                                    player.removeMark('Tianshu_Task_3',player.countMark('Tianshu_Task_3'));
                                    player.removeSkill('Tianshu_Task_3');
                                }
                                player.removeMark('Tianshu_Boss_Ordinary_Bumie',1);
                            }
                        },
                    },
                    Lose:{
                        trigger:{
                            player:"loseMaxHpAfter",
                        },
                        forced:true,
                        filter:function (event,player){
                            if(player.countMark('Tianshu_Boss_Ordinary_Bumie')!=player.maxHp) return true;
                        },
                        content:function(){
                            var loseNum = player.countMark('Tianshu_Boss_Ordinary_Bumie') - player.maxHp;
                            player.gainMaxHp(loseNum);
                        },
                    },
                    Die:{
                        trigger:{player:'dieBefore'},
                        forced:true,
                        content:function(){
                            if(player.countMark('Tianshu_Boss_Ordinary_Bumie')>=1){
                                trigger.cancel();
                                player.revive();
                            } else {
                                player.removeSkill('Tianshu_Boss_Wangshen');
                            }
                        },
                    },
                },
            },
            Tianshu_Boss_Difficulty_Bumie:{
                mode:['boss'],
                marktext:"灭",
                mark:true,
                intro:{
                    content:function (){
                    return '不会死亡!'
                    },
                },
                forced:true,
                group:['Tianshu_Boss_Difficulty_Bumie_Dy','Tianshu_Boss_Difficulty_Bumie_Use','Tianshu_Boss_Difficulty_Bumie_Lose','Tianshu_Boss_Difficulty_Bumie_Die'],
                subSkill:{
                    Dy:{
                        trigger:{
                            global:"dyingBefore",
                        },
                        forced:true,
                        content:function(){
                            player.draw(3);
                            if(player.hp<=0){
                                player.recover(99999);
                                if(_status.Task==0){
                                    var num=[1,2,3].randomGet();
                                    if (num == 1){
                                        player.addSkill('Tianshu_Task_1');
                                    } else if(num == 2){
                                        player.addSkill('Tianshu_Task_2');
                                    } else {
                                        player.addSkill('Tianshu_Task_3');
                                    }
                                    _status.Task=2;
                                }
                            } else {
                                player.recover();
                            }
                        },
                    },
                    Use:{
                        trigger:{
                            player:"phaseBefore",
                        },
                        forced:true,
                        content:function(){
                            var numMark=0;
                            var taskOver=0;
                            var numTaskMark = player.countMark('Tianshu_Boss_Difficulty_Bumie');
                            if(numTaskMark==0||numTaskMark==undefined){
                                _status.Task=0;
                                var numBumie = player.maxHp
                                player.addMark('Tianshu_Boss_Difficulty_Bumie',numBumie);
                            }
                            if(player.hasSkill('Tianshu_Task_1')){
                                numMark=player.countMark('Tianshu_Task_1');
                                taskOver=game.taskNum(numMark,1);
                            } else if(player.hasSkill('Tianshu_Task_2')){
                                numMark=player.countMark('Tianshu_Task_2');
                                taskOver=game.taskNum(numMark,2);
                            } else {
                                numMark=player.countMark('Tianshu_Task_3');
                                taskOver=game.taskNum(numMark,3);
                            }
                            if(taskOver==1){
                                player.loseMaxHp(1);
                                if(player.hasSkill('Tianshu_Task_1')){
                                    player.removeMark('Tianshu_Task_1',player.countMark('Tianshu_Task_1'));
                                    player.removeSkill('Tianshu_Task_1');
                                } else if(player.hasSkill('Tianshu_Task_2')){
                                    player.removeMark('Tianshu_Task_2',player.countMark('Tianshu_Task_2'));
                                    player.removeSkill('Tianshu_Task_2');
                                } else {
                                    player.removeMark('Tianshu_Task_3',player.countMark('Tianshu_Task_3'));
                                    player.removeSkill('Tianshu_Task_3');
                                }
                                player.removeMark('Tianshu_Boss_Difficulty_Bumie',1);
                            }
                        },
                    },
                    Lose:{
                        trigger:{
                            player:"loseMaxHpAfter",
                        },
                        forced:true,
                        filter:function (event,player){
                            if(player.countMark('Tianshu_Boss_Difficulty_Bumie')!=player.maxHp) return true;
                        },
                        content:function(){
                            var loseNum = player.countMark('Tianshu_Boss_Difficulty_Bumie') - player.maxHp;
                            player.gainMaxHp(loseNum);
                        },
                    },
                    Die:{
                        trigger:{player:'dieBefore'},
                        forced:true,
                        content:function(){
                            if(player.countMark('Tianshu_Boss_Difficulty_Bumie')>=1){
                                trigger.cancel();
                                player.revive();
                            } else {
                                player.removeSkill('Tianshu_Boss_Wangshen');
                            }
                        },
                    },
                },
            },
            Tianshu_Boss_Fucking_Bumie:{
                mode:['boss'],
                marktext:"灭",
                mark:true,
                intro:{
                    content:function (){
                    return '不会死亡!'
                    },
                },
                forced:true,
                group:['Tianshu_Boss_Fucking_Bumie_Dy','Tianshu_Boss_Fucking_Bumie_Use','Tianshu_Boss_Fucking_Bumie_Lose','Tianshu_Boss_Fucking_Bumie_Die'],
                subSkill:{
                    Dy:{
                        trigger:{
                            global:"dyingBefore",
                        },
                        forced:true,
                        content:function(){
                            player.draw(3);
                            if(player.hp<=0){
                                player.recover(99999);
                                if(_status.Task==0){
                                    var num=[1,2,3].randomGet();
                                    if (num == 1){
                                        player.addSkill('Tianshu_Task_1');
                                    } else if(num == 2){
                                        player.addSkill('Tianshu_Task_2');
                                    } else {
                                        player.addSkill('Tianshu_Task_3');
                                    }
                                    _status.Task=3;
                                }
                            } else {
                                player.recover();
                            }
                        },
                    },
                    Use:{
                        trigger:{
                            player:"phaseBefore",
                        },
                        forced:true,
                        content:function(){
                            var numMark=0;
                            var taskOver=0;
                            var numTaskMark = player.countMark('Tianshu_Boss_Fucking_Bumie');
                            if(numTaskMark==0||numTaskMark==undefined){
                                _status.Task=0;
                                var numBumie = player.maxHp
                                player.addMark('Tianshu_Boss_Fucking_Bumie',numBumie);
                            }
                            if(player.hasSkill('Tianshu_Task_1')){
                                numMark=player.countMark('Tianshu_Task_1');
                                taskOver=game.taskNum(numMark,1);
                            } else if(player.hasSkill('Tianshu_Task_2')){
                                numMark=player.countMark('Tianshu_Task_2');
                                taskOver=game.taskNum(numMark,2);
                            } else {
                                numMark=player.countMark('Tianshu_Task_3');
                                taskOver=game.taskNum(numMark,3);
                            }
                            if(taskOver==1){
                                player.loseMaxHp(1);
                                if(player.hasSkill('Tianshu_Task_1')){
                                    player.removeMark('Tianshu_Task_1',player.countMark('Tianshu_Task_1'));
                                    player.removeSkill('Tianshu_Task_1');
                                } else if(player.hasSkill('Tianshu_Task_2')){
                                    player.removeMark('Tianshu_Task_2',player.countMark('Tianshu_Task_2'));
                                    player.removeSkill('Tianshu_Task_2');
                                } else {
                                    player.removeMark('Tianshu_Task_3',player.countMark('Tianshu_Task_3'));
                                    player.removeSkill('Tianshu_Task_3');
                                }
                                player.removeMark('Tianshu_Boss_Fucking_Bumie',1);
                            }
                        },
                    },
                    Lose:{
                        trigger:{
                            player:"loseMaxHpAfter",
                        },
                        forced:true,
                        filter:function (event,player){
                            if(player.countMark('Tianshu_Boss_Fucking_Bumie')!=player.maxHp) return true;
                        },
                        content:function(){
                            var loseNum = player.countMark('Tianshu_Boss_Fucking_Bumie') - player.maxHp;
                            player.gainMaxHp(loseNum);
                        },
                    },
                    Die:{
                        trigger:{player:'dieBefore'},
                        forced:true,
                        content:function(){
                            if(player.countMark('Tianshu_Boss_Fucking_Bumie')>=1){
                                trigger.cancel();
                                player.revive();
                            } else {
                                player.removeSkill('Tianshu_Boss_Wangshen');
                            }
                        },
                    },
                },
            },
            Tianshu_Task_1:{
                mode:['boss'],
                marktext:"一",
                mark:true,
                intro:{
                    content:function (){
                    return '任务一:摸牌'
                    },
                },
                trigger:{
                    global:"gainAfter", //摸牌
                },
                forced:true,
                filter:function(event,player){
                    return event.player!=player;
                },
                content:function(){
                    "step 0"
                    event.Task_1_num=trigger.cards.length;
                    "step 1"
                    event.Task_1_num--;
                    player.addMark('Tianshu_Task_1',1);
                    "step 2"
                    if(event.Task_1_num>0){
                        event.goto(1);
                    } else event.finish();
                },
            },
            Tianshu_Task_2:{
                mode:['boss'],
                marktext:"二",
                mark:true,
                intro:{
                    content:function (){
                    return '任务二:伤害'
                    },
                },
                trigger:{
                    global:"damageEnd",//伤害
                },
                forced:true,
                filter:function(event,player){
                    return event.source&&event.source.isIn()&&event.source!=player;
                },
                content:function(){
                    "step 0"
                    event.Task_2_num=trigger.num;
                    "step 1"
                    event.Task_2_num--;
                    player.addMark('Tianshu_Task_2',1);
                    "step 2"
                    if(event.Task_2_num>0){
                        event.goto(1);
                    } else event.finish();
                },
            },
            Tianshu_Task_3:{
                mode:['boss'],
                marktext:"三",
                mark:true,
                intro:{
                    content:function (){
                    return '任务三:恢复'
                    },
                },
                trigger:{
                    global:"recoverAfter", //回血
                },
                forced:true,
                filter:function(event,player){
                    return event.source&&event.source.isIn()&&event.source!=player;
                },
                content:function(){
                    "step 0"
                    event.Task_3_num=trigger.num;
                    "step 1"
                    event.Task_3_num--;
                    player.addMark('Tianshu_Task_3',1);
                    "step 2"
                    if(event.Task_3_num>0){
                        event.goto(1);
                    } else event.finish();
                },
            },
            Tianshu_Boss_Shashen:{
                mode:['boss'],
                marktext:"杀",
                mark:true,
                intro:{
                    content:function (){
                        return '本回合伤害增加'
                    },
                },
                group:['Tianshu_Boss_Shashen_Draw','Tianshu_Boss_Shashen_Damage','Tianshu_Boss_Shashen_D'],
                subSkill:{
                    Draw:{
                        trigger:{
                            player:"phaseUseBefore",
                        },
                        forced:true,
                        content:function(){
                            var hNum = player.countCards('h')
                            var eNum = player.countCards('e')
                            if(hNum==0){
                                player.draw(player.maxHp);
                            } else player.draw(eNum);
                            for(var i=1;i<=5;i++){
                                if(player.isDisabled(i)==true) player.enableEquip(i);
                                if(player.isEmpty(i)==false) player.addMark('Tianshu_Boss_Shashen',1);
                            }
                        },
                    },
                    Damage:{
                        trigger:{
                            source:"damageBefore",
                        },
                        forced:true,
                        content:function(){
                            var damageNum = player.countMark('Tianshu_Boss_Shashen');
                            trigger.num+=damageNum;
                        },
                    },
                    D:{
                        trigger:{
                            player:"phaseAfter",
                        },
                        forced:true,
                        filter:function(event,player){
                            return player.countMark('Tianshu_Boss_Shashen')>=1;
                        },
                        content:function(){
                            player.removeMark('Tianshu_Boss_Shashen',player.countMark('Tianshu_Boss_Shashen'));
                        },
                    },
                },
            },
            Tianshu_Boss_Difficulty_Shashen:{
                mode:['boss'],
                trigger:{
                    player:"phaseUseBefore",
                },
                forced:true,
                frequent:true,
                content:function(){
                    var hNum = player.countCards('h')
                    var eNum = player.countCards('e')
                    if(hNum==0){
                        player.draw(player.maxHp);
                    } else player.draw(eNum+1);
                    for(var i=1;i<=5;i++){
                        if(player.isDisabled(i)==true) player.enableEquip(i);
                    }
                    var cardRandom=player.getCards('h').randomGet();
                    player.discard(cardRandom);
                    var target=game.players[cardRandom.number%game.players.slice(0).length];
                    if(cardRandom.suit=='club'){
                        player.line(target);
                        target.discard(1,true,'h');
                    } else if(cardRandom.suit=='heart'){ 
                        player.line(target);
                        target.recover();
                    } else if(cardRandom.suit=='spade'){
                        player.line(target);
                        target.damage(1,player);
                    } else if(cardRandom.suit=='diamond'){
                        player.line(target);
                        target.draw(2);
                    }
                },
            },
            Tianshu_Boss_Fucking_Shashen:{
                mode:['boss'],
                trigger:{
                    player:"phaseUseBefore",
                },
                forced:true,
                frequent:true,
                content:function(){          
                    var hNum = player.countCards('h')
                    var eNum = player.countCards('e')
                    if(hNum==0){
                        player.draw(player.maxHp);
                    } else player.draw(eNum+2);
                    for(var i=1;i<=5;i++){
                        if(player.isDisabled(i)==true) player.enableEquip(i);
                    }
                    var cardRandom=player.getCards('h').randomGet();
                    var list=game.players.slice(0);
                    player.discard(cardRandom);
                    if(cardRandom.suit=='club'){
                        if(list.length){
                            var target=list.randomGet();
                            player.line(target);
                            target.discard(parseInt(target.countCards('h')/2),true,'h');
                        }
                    } else if(cardRandom.suit=='heart'){ 
                        if(list.length){
                            var target=list.randomGet();
                            player.line(target);
                            target.recover();
                        }
                    } else if(cardRandom.suit=='spade'){
                        if(list.length){
                            var target=list.randomGet();
                            player.line(target);
                            target.damage(1,player);
                        };
                    } else if(cardRandom.suit=='diamond'){
                        if(list.length){
                            var target=list.randomGet();
                            player.line(target);
                            target.draw(2);
                        };
                    }
                },
            },
            Tianshu_Boss_Difu:{
                mode:['boss'],
                group:['Tianshu_Boss_Difu_Dam'],
                subSkill:{
                    Dam:{
                        trigger:{global:'damageBefore'},
                        forced:true,
                        content:function(){
                            if(trigger.player==player && game.numRandom()<=50){
                                player.judge(function(card){
                                    if(card.suit=='club'){ 
                                        trigger.player.addSkill('Tianshu_Protect');
                                    } else if(card.suit=='heart'){ 
                                        trigger.player.recover();
                                    } else if(card.suit=='spade'){ 
                                        trigger.num--;
                                    } else if(card.suit=='diamond'){ 
                                        trigger.player.draw();
                                    }
                                    return -1;
                                });
                            } else {
                                trigger.player.judge(function(card){
                                    if(card.suit=='club'){ 
                                        if(card.number==1){ //翻面
                                            trigger.player.popup('翻面');
                                            trigger.player.turnOver(true);
                                        } else if(card.number>=2 && card.number<=7){
                                            trigger.player.popup('易伤');
                                            trigger.player.addTempSkill('Diuse_Quanmian_Yishang',{player:'phaseBefore'});
                                        } else {
                                            trigger.player.popup('保护');
                                            trigger.player.addSkill('Tianshu_Protect');
                                        }
                                    } else if(card.suit=='heart'){ //红桃
                                        if(card.number==1){
                                            trigger.player.popup('濒死');
                                            trigger.player.loseHp(trigger.player.hp);
                                        } else if(card.number>=2 && card.number<=7){
                                            trigger.player.popup('流失');
                                            trigger.player.loseHp();
                                        } else {
                                            trigger.player.popup('恢复');
                                            trigger.player.recover();
                                        }
                                    } else if(card.suit=='spade'){ //黑桃
                                        if(card.number==1){
                                            trigger.player.popup('濒死');
                                            trigger.player.damage(trigger.player.hp,'nosource');
                                        } else if(card.number>=2 && card.number<=7){
                                            trigger.player.popup('加伤');
                                            trigger.num++;
                                        } else {
                                            trigger.player.popup('减伤');
                                            trigger.num--;
                                        }
                                    } else if(card.suit=='diamond'){ //方块
                                        if(card.number==1){
                                            trigger.player.popup('全弃');
                                            trigger.player.chooseToDiscard(trigger.player.countCards('h'),true,'h');
                                        } else if(card.number>=2 && card.number<=7){
                                            trigger.player.popup('弃牌');
                                            trigger.player.chooseToDiscard(true,'h');
                                        } else {
                                            trigger.player.popup('摸牌');
                                            trigger.player.draw();
                                        }
                                    }
                                    return -1;
                                });
                            }
                        },
                    },
                },
            },
            Tianshu_Boss_Tiemian:{
                mode:['boss'],
                group:['Tianshu_Boss_Tiemian_A','Tianshu_Boss_Tiemian_B','Tianshu_Boss_Tiemian_C','Tianshu_Boss_Tiemian_D','Tianshu_Boss_Tiemian_E','Tianshu_Boss_Tiemian_F','Tianshu_Boss_Tiemian_G','Tianshu_Boss_Tiemian_H',],
                subSkill:{
                    A:{
                        trigger:{player:'phaseDrawAfter'},
                        forced:true,
                        content:function(){
                            if(game.numRandom()<=50) player.draw(2);
                            game.log('鬼阎王成功额外摸两张牌');
                        },
                    },
                    B:{
                        trigger:{player:'phaseUseBefore'},
                        forced:true,
                        content:function(){
                            if(game.numRandom()<=50) {
                                player.chooseUseTarget({name:'sha'},'是否视为使用一张【杀】？',false);
                            } else {
                                game.log('没有成功打出杀');
                            }
                        },
                    },
                    C:{
                        trigger:{player:'phaseBegin'},
                        forced:true,
                        content:function(){
                            if(game.numRandom()<=50) {
                                player.chooseUseTarget({name:'jiu'},'是否视为使用一张【酒】？',false);
                            } else {game.log('鬼阎王没有成功使用酒');}
                            if(game.numRandom()<=5){
                                var num=[1,2].randomGet();
                                if(num==1){
                                    game.log('鬼阎王成功获得一个额外的出牌阶段');
                                    var next=player.phaseUse();
                                    event.next.remove(next);
                                    trigger.next.push(next);
                                } else {
                                    game.log('鬼阎王成功获得一个额外的摸牌阶段');
                                    var next=player.phaseDraw();
                                    event.next.remove(next);
                                    trigger.next.push(next);
                                }
                            }
                        },
                    },
                    D:{
                        trigger:{player:'phaseDiscardAfter'},
                        forced:true,
                        content:function(){
                            if(game.numRandom()<=50) {
                                player.draw(2);
                            } else {game.log('鬼阎王没有成功白嫖两张牌');}
                        },
                    },
                    E:{
                        trigger:{source:'damageBefore'},
                        forced:true,
                        content:function(){
                            if(game.numRandom()<=30){
                                trigger.num++;
                            } else {game.log('鬼阎王没有成功加伤');}
                        },
                    },
                    F:{
                        trigger:{player:'damageBefore'},
                        forced:true,
                        content:function(){
                            if(game.numRandom()<=30){
                                trigger.num--;
                            } else {game.log('鬼阎王没有使伤害-1');}
                            if(game.numRandom()<=50){
                                player.draw();
                            } else {game.log('鬼阎王没有嫖到一张牌');}
                        },
                    },
                    G:{
                        trigger:{target:"useCardToTargeted"},
                        forced:true,
                        filter:function(event,player){
                            return event.card.name=='sha';
                        },
                        content:function(){
                            if(game.numRandom()<=10){
                                player.discardPlayerCard('he',trigger.player,true);
                            } else {game.log('没有成功弃置一张牌');}
                            if(game.numRandom()==1){
                                trigger.cancel();
                            } else {game.log('没有成功使其失效');}
                        },
                    },
                    H:{
                        trigger:{player:"useCard"},
                        forced:true,
                        filter:function(event,player){
                            return event.card.name=='sha'&&event.getParent(2).name!='Tianshu_Boss_Tiemian';
                        },
                        content:function(){
                            if(game.numRandom()<=30){
                                player.getStat().card.sha--;
                                game.log('哦不，鬼阎王使他的出杀次数+1');
                            } else {game.log('鬼阎王成功的打出了一张杀，当然他再也不能额外打出杀了，除非他有诸葛连弩等');}
                        },
                    },
                },
            },
            Tianshu_Boss_Xingpan:{
                mode:['boss'],
                group:[],
                subSkill:{

                },
            },
            Tianshu_Boss_Zhennu:{
                mode:['boss'],
                group:[],
                subSkill:{

                },
            },

            Tianshu_Ordinary_Hankui_Die:{ //摸牌3 回复5
                mode:['boss'],
				trigger:{player:'dieBegin'},
				silent:true,
				unique:true,
				fixed:true,
				filter:function(event,player){
					return player==game.boss;
				},
				content:function(){
					player.hide();
					game.addVideo('hidePlayer',player);
					var list=[];
                    event.Diuse_Player;
                    if(event.Diuse_Player==undefined) event.Diuse_Player = 0
					game.delay();
                    'step 0'
                    game.hpAndH(5,3);
                    'step 1'
                    if(game.players[event.Diuse_Player]==game.boss) event.goto(4);
					'step 2'
                    if(!_status.skillsList){
                        game.skillsList();
                    }
					for(var A=0;A<6;A++){
						var Diuse_Not = _status.skillsList.randomGet();
						list.push(Diuse_Not);
						if(list.length==5) break;
					}
					if(!list.length){event.finish();return;}
                    //list.push('刷新');
					event.list=list;
					var dialog=game.getSkillDialog(event.list,'选择获得一个技能');
					game.players[event.Diuse_Player].chooseControl(event.list).set('ai',function(){
						return 0;
					}).dialog=dialog;
					'step 3'
                    // if(result.control=='刷新'){
                    //     event.goto(1);
                    //     return;
                    // }
					event.skill=result.control
                    game.log(game.players[event.Diuse_Player].name,'获得了【',event.skill,'】技能');
					game.players[event.Diuse_Player].addSkill(event.skill);
					event.list=[]
                    'step 4'
                    if(event.Diuse_Player+1<game.players.length){
                        event.Diuse_Player++;
                        event.goto(1);
                    } 
					'step 5'
					if(game.me!=game.boss){
						game.boss.changeSeat(6);
					}
					else{
						game.boss.nextSeat.changeSeat(3);
						game.boss.previousSeat.changeSeat(5);
					}
					game.changeBoss('Boss_Ordinary_Baiqi');
					game.delay(0.5);
                    'step 6'
					game.addBossFellow(game.me==game.boss?1:5,'boss_qinglong');
					game.addBossFellow(7,'boss_qinglong');
					'step 7'
                    game.newBoss();
				}
            },
            Tianshu_Difficulty_Hankui_Die:{
                mode:['boss'],
				trigger:{player:'dieBegin'},
				silent:true,
				unique:true,
				fixed:true,
				filter:function(event,player){
					return player==game.boss;
				},
				content:function(){
					player.hide();
					game.addVideo('hidePlayer',player);
					var list=[];	
                    event.Diuse_Player;
                    if(event.Diuse_Player==undefined) event.Diuse_Player = 0
					game.delay();
                    'step 0'
                    game.hpAndH(1,2);
                    'step 1'
                    if(game.players[event.Diuse_Player]==game.boss) event.goto(4);
					'step 2'
                    if(!_status.skillsList){
                        game.skillsList();
                    }
					for(var A=0;A<6;A++){
						var Diuse_Not = _status.skillsList.randomGet();
						list.push(Diuse_Not);
						if(list.length==5) break;
					}
					if(!list.length){event.finish();return;}
					event.list=list;
					var dialog=game.getSkillDialog(event.list,'选择获得一个技能');
					game.players[event.Diuse_Player].chooseControl(event.list).set('ai',function(){
						return 0;
					}).dialog=dialog;
					'step 3'
					event.skill=result.control
                    game.log(game.players[event.Diuse_Player].name,'获得了【',event.skill,'】技能');
					game.players[event.Diuse_Player].addSkill(event.skill);
					event.list=[]
                    'step 4'
                    if(event.Diuse_Player+1<game.players.length){
                        event.Diuse_Player++;
                        event.goto(1);
                    } 
					'step 5'
					if(game.me!=game.boss){
						game.boss.changeSeat(6);
					}
					else{
						game.boss.nextSeat.changeSeat(3);
						game.boss.previousSeat.changeSeat(5);
					}
					game.changeBoss('Boss_Difficulty_Baiqi');
					game.delay(0.5);
                    'step 6'
					game.addBossFellow(game.me==game.boss?1:5,'boss_qinglong');
					game.addBossFellow(7,'boss_qinglong');
					'step 7'
                    game.newBoss();
				}
            },
            Tianshu_Fucking_Hankui_Die:{ //摸2牌 或者 恢复一点体力
                mode:['boss'],
				trigger:{player:'dieBegin'},
				silent:true,
				unique:true,
				fixed:true,
				filter:function(event,player){
					return player==game.boss;
				},
				content:function(){
					player.hide();
					game.addVideo('hidePlayer',player);
					var list=[];	
                    event.Diuse_Player;
                    if(event.Diuse_Player==undefined) event.Diuse_Player = 0
					game.delay();
                    'step 0'
                    game.hpAndH(0,0);
					'step 1'
                    if(game.players[event.Diuse_Player]==game.boss) event.goto(6);
                    'step 2'
                    if(!_status.skillsList){
                        game.skillsList();
                    }
					for(var A=0;A<6;A++){
						var Diuse_Not = _status.skillsList.randomGet();
						list.push(Diuse_Not);
						if(list.length==5) break;
					}
					if(!list.length){event.finish();return;}
					event.list=list;
					var dialog=game.getSkillDialog(event.list,'选择获得一个技能');
					game.players[event.Diuse_Player].chooseControl(event.list).set('ai',function(){
						return 0;
					}).dialog=dialog;
					'step 3'
					event.skill=result.control
                    game.log(game.players[event.Diuse_Player].name,'获得了【',event.skill,'】技能');
					game.players[event.Diuse_Player].addSkill(event.skill);
                    'step 4'
                    game.players[event.Diuse_Player].chooseControl('回复一点体力','摸两张牌').set('ai',function(){
                        if(game.players[event.Diuse_Player].maxHp-game.players[event.Diuse_Player].hp>=2){
                            return '回复一点体力';
                        } else {return '摸两张牌';}
                    })
                    'step 5'
                    event.list=[]
                    if(result.control=='回复一点体力'){
                        game.players[event.Diuse_Player].recover();
                    } else {
                        game.players[event.Diuse_Player].draw(2);
                    }
                    'step 6'
                    if(event.Diuse_Player+1<game.players.length){
                        event.Diuse_Player++;
                        event.goto(1);
                    } 
					'step 7'
					if(game.me!=game.boss){
						game.boss.changeSeat(6);
					}
					else{
						game.boss.nextSeat.changeSeat(3);
						game.boss.previousSeat.changeSeat(5);
					}
					game.changeBoss('Boss_Fucking_Baiqi');
					game.delay(0.5);
                    'step 8'
					game.addBossFellow(game.me==game.boss?1:5,'boss_qinglong');
					game.addBossFellow(7,'boss_qinglong');
					'step 9'
                    game.newBoss();
				}
            },
            Tianshu_Ordinary_Baiqi_Die:{
				mode:['boss'],
				trigger:{player:'dieBegin'},
				silent:true,
				unique:true,
				fixed:true,
				filter:function(event,player){
					return player==game.boss;
				},
				content:function(){
                    player.hide();
                    if(player.nextSeat.hp>0){
                        player.nextSeat.die();
                        player.nextSeat.hide();
                    } else player.nextSeat.hide();
					if(player.previousSeat.hp>0){
                        player.previousSeat.die();
                        player.previousSeat.hide();
                    } else player.previousSeat.hide();
                    game.addVideo('hidePlayer',player);
					game.addVideo('hidePlayer',player.nextSeat);
					game.addVideo('hidePlayer',player.previousSeat);
					var list=[];	
                    event.Diuse_Player;
                    if(event.Diuse_Player==undefined) event.Diuse_Player = 0
					game.delay();
					'step 0'
                    game.hpAndH(5,3);
                    'step 1'
                    if(game.players[event.Diuse_Player]==game.boss) event.goto(4);
					'step 2'
                    if(!_status.skillsList){
                        lib.skill.Tianshu_GiveSkills.skillsList();
                    }
					for(var A=0;A<6;A++){
						var Diuse_Not = _status.skillsList.randomGet();
						list.push(Diuse_Not);
						if(list.length==5) break;
					}
					if(!list.length){event.finish();return;}
					event.list=list;
					var dialog=game.getSkillDialog(event.list,'选择获得一个技能');
					game.players[event.Diuse_Player].chooseControl(event.list).set('ai',function(){
						return 0;
					}).dialog=dialog;
					'step 3'
					event.skill=result.control
                    game.log(game.players[event.Diuse_Player].name,'获得了【',event.skill,'】技能');
					game.players[event.Diuse_Player].addSkill(event.skill);
					event.list=[]
                    'step 4'
                    if(event.Diuse_Player+1<game.players.length){
                        event.Diuse_Player++;
                        event.goto(1);
                    } 
					'step 5'
					game.changeBoss('Boss_Ordinary_WangshenBaiqi');
					game.delay(0.5);
					'step 6'
                    game.newBoss();
				}
            },
            Tianshu_Difficulty_Baiqi_Die:{
                mode:['boss'],
				trigger:{player:'dieBegin'},
				silent:true,
				unique:true,
				fixed:true,
				filter:function(event,player){
					return player==game.boss;
				},
				content:function(){
                    player.hide();
                    if(player.nextSeat.hp>0){
                        player.nextSeat.die();
                        player.nextSeat.hide();
                    } else player.nextSeat.hide();
					if(player.previousSeat.hp>0){
                        player.previousSeat.die();
                        player.previousSeat.hide();
                    } else player.previousSeat.hide();
                    game.addVideo('hidePlayer',player);
					game.addVideo('hidePlayer',player.nextSeat);
					game.addVideo('hidePlayer',player.previousSeat);
					var list=[];	
					event.Diuse_Player; 
					if(event.Diuse_Player==undefined) event.Diuse_Player = 0
					game.delay();
					'step 0'
                    game.hpAndH(1,2);
                    'step 1'
                    if(game.players[event.Diuse_Player]==game.boss) event.goto(4);
					'step 2'
                    if(!_status.skillsList){
                        lib.skill.Tianshu_GiveSkills.skillsList();
                    }
					for(var A=0;A<6;A++){
						var Diuse_Not = _status.skillsList.randomGet();
						list.push(Diuse_Not);
						if(list.length==5) break;
					}
					if(!list.length){event.finish();return;}
					event.list=list;
					var dialog=game.getSkillDialog(event.list,'选择获得一个技能');
					game.players[event.Diuse_Player].chooseControl(event.list).set('ai',function(){
						return 0;
					}).dialog=dialog;
					'step 3'
					event.skill=result.control
                    game.log(game.players[event.Diuse_Player].name,'获得了【',event.skill,'】技能');
					game.players[event.Diuse_Player].addSkill(event.skill);
					event.list=[]
                    'step 4'
                    if(event.Diuse_Player+1<game.players.length){
                        event.Diuse_Player++;
                        event.goto(1);
                    } 
					'step 5'
					game.changeBoss('Boss_Difficulty_WangshenBaiqi');
					game.delay(0.5);
					'step 6'
                    game.newBoss();
				}
            },
            Tianshu_Fucking_Baiqi_Die:{
                mode:['boss'],
				trigger:{player:'dieBegin'},
				silent:true,
				unique:true,
				fixed:true,
				filter:function(event,player){
					return player==game.boss;
				},
				content:function(){
                    player.hide();
                    if(player.nextSeat.hp>0){
                        player.nextSeat.die();
                        player.nextSeat.hide();
                    } else player.nextSeat.hide();
					if(player.previousSeat.hp>0){
                        player.previousSeat.die();
                        player.previousSeat.hide();
                    } else player.previousSeat.hide();
                    game.addVideo('hidePlayer',player);
					game.addVideo('hidePlayer',player.nextSeat);
					game.addVideo('hidePlayer',player.previousSeat);
					var list=[];	
					event.Diuse_Player; 
					if(event.Diuse_Player==undefined) event.Diuse_Player = 0
					game.delay();
                    'step 0'
                    game.hpAndH(0,0);
                    'step 1'
                    if(game.players[event.Diuse_Player]==game.boss) event.goto(6);
					'step 2'
                    if(!_status.skillsList){
                        lib.skill.Tianshu_GiveSkills.skillsList();
                    }
					for(var A=0;A<6;A++){
						var Diuse_Not = _status.skillsList.randomGet();
						list.push(Diuse_Not);
						if(list.length==5) break;
					}
					if(!list.length){event.finish();return;}
					event.list=list;
                    if(game.me==game.boss&&event.Diuse_Player==0) event.Diuse_Player=1
					var dialog=game.getSkillDialog(event.list,'选择获得一个技能');
					game.players[event.Diuse_Player].chooseControl(event.list).set('ai',function(){
						return 0;
					}).dialog=dialog;
					'step 3'
					event.skill=result.control
                    game.log(game.players[event.Diuse_Player].name,'获得了【',event.skill,'】技能');
					game.players[event.Diuse_Player].addSkill(event.skill);
                    'step 4'
                    game.players[event.Diuse_Player].chooseControl('回复一点体力','摸两张牌').set('ai',function(){
                        if(game.players[event.Diuse_Player].maxHp-game.players[event.Diuse_Player].hp>=2){
                            return '回复一点体力';
                        } else {return '摸两张牌';}
                    })
                    'step 5'
                    event.list=[]
                    if(result.control=='回复一点体力'){
                        game.players[event.Diuse_Player].recover();
                    } else {
                        game.players[event.Diuse_Player].draw(2);
                    }
					event.list=[]
                    'step 6'
                    if(event.Diuse_Player+1<game.players.length){
                        event.Diuse_Player++;
                        event.goto(1);
                    } 
					'step 7'
					game.changeBoss('Boss_Fucking_WangshenBaiqi');
					game.delay(0.5);
					'step 8'
                    game.newBoss();
				}
            },
            Tianshu_Ordinary_WangshenBaiqi_Die:{
                mode:['boss'],
				trigger:{player:'dieBegin'},
				silent:true,
				unique:true,
				fixed:true,
				filter:function(event,player){
					return player==game.boss;
				},
				content:function(){
                    player.removeSkill('Tianshu_Boss_Wangshen');
					player.hide();
					game.addVideo('hidePlayer',player);
					var list=[];	
					event.Diuse_Player; 
					if(event.Diuse_Player==undefined) event.Diuse_Player = 0
					game.delay();
                    'step 0'
                    game.hpAndH(5,3);
                    'step 1'
                    if(game.players[event.Diuse_Player]==game.boss) event.goto(4);
					'step 2'
                    if(!_status.skillsList){
                        game.skillsList();
                    }
					for(var A=0;A<6;A++){
						var Diuse_Not = _status.skillsList.randomGet();
						list.push(Diuse_Not);
						if(list.length==5) break;
					}
					if(!list.length){event.finish();return;}
					event.list=list;
					var dialog=game.getSkillDialog(event.list,'选择获得一个技能');
					game.players[event.Diuse_Player].chooseControl(event.list).set('ai',function(){
						return 0;
					}).dialog=dialog;
					'step 3'
					event.skill=result.control
                    game.log(game.players[event.Diuse_Player].name,'获得了【',event.skill,'】技能');
					game.players[event.Diuse_Player].addSkill(event.skill);
					event.list=[]
                    'step 4'
                    if(event.Diuse_Player+1<game.players.length){
                        event.Diuse_Player++;
                        event.goto(1);
                    } 
					'step 5'
					if(game.me!=game.boss){
						game.boss.changeSeat(6);
					}
					else{
						game.boss.nextSeat.changeSeat(3);
						game.boss.previousSeat.changeSeat(5);
					}
					game.changeBoss('Boss_Ordinary_Guiyanwang');
					game.delay(0.5);
					'step 6'
                    game.newBoss();
				}
            },
            Tianshu_Difficulty_WangshenBaiqi_Die:{
                mode:['boss'],
				trigger:{player:'dieBegin'},
				silent:true,
				unique:true,
				fixed:true,
				filter:function(event,player){
					return player==game.boss;
				},
				content:function(){
					player.hide();
					game.addVideo('hidePlayer',player);
					var list=[];	
					event.Diuse_Player; 
					if(event.Diuse_Player==undefined) event.Diuse_Player = 0
					game.delay();
                    'step 0'
                    game.hpAndH(1,2);
                    'step 1'
                    if(game.players[event.Diuse_Player]==game.boss) event.goto(4);
					'step 2'
                    if(!_status.skillsList){
                        game.skillsList();
                    }
					for(var A=0;A<6;A++){
						var Diuse_Not = _status.skillsList.randomGet();
						list.push(Diuse_Not);
						if(list.length==5) break;
					}
					if(!list.length){event.finish();return;}
					event.list=list;
					var dialog=game.getSkillDialog(event.list,'选择获得一个技能');
					game.players[event.Diuse_Player].chooseControl(event.list).set('ai',function(){
						return 0;
					}).dialog=dialog;
					'step 3'
					event.skill=result.control
                    game.log(game.players[event.Diuse_Player].name,'获得了【',event.skill,'】技能');
					game.players[event.Diuse_Player].addSkill(event.skill);
					event.list=[]
                    'step 4'
                    if(event.Diuse_Player+1<game.players.length){
                        event.Diuse_Player++;
                        event.goto(1);
                    } 
					'step 5'
					if(game.me!=game.boss){
						game.boss.changeSeat(6);
					}
					else{
						game.boss.nextSeat.changeSeat(3);
						game.boss.previousSeat.changeSeat(5);
					}
					game.changeBoss('Boss_Difficulty_Guiyanwang');
					game.delay(0.5);
					'step 6'
                    game.newBoss();
				}
            },
            Tianshu_Fucking_WangshenBaiqi_Die:{
                mode:['boss'],
				trigger:{player:'dieBegin'},
				silent:true,
				unique:true,
				fixed:true,
				filter:function(event,player){
					return player==game.boss;
				},
				content:function(){
                    player.removeSkill('Tianshu_Boss_Wangshen');
					player.hide();
					game.addVideo('hidePlayer',player);
					var list=[];	
					event.Diuse_Player; 
					if(event.Diuse_Player==undefined) event.Diuse_Player = 0
					game.delay();
                    'step 0'
                    game.hpAndH(0,0);
                    'step 1'
                    if(game.players[event.Diuse_Player]==game.boss) event.goto(6);
                    'step 2'
                    if(!_status.skillsList){
                        game.skillsList();
                    }
					for(var A=0;A<6;A++){
						var Diuse_Not = _status.skillsList.randomGet();
						list.push(Diuse_Not);
						if(list.length==5) break;
					}
					if(!list.length){event.finish();return;}
					event.list=list;
					var dialog=game.getSkillDialog(event.list,'选择获得一个技能');
					game.players[event.Diuse_Player].chooseControl(event.list).set('ai',function(){
						return 0;
					}).dialog=dialog;
					'step 3'
					event.skill=result.control
                    game.log(game.players[event.Diuse_Player].name,'获得了【',event.skill,'】技能');
					game.players[event.Diuse_Player].addSkill(event.skill);
                    'step 4'
                    game.players[event.Diuse_Player].chooseControl('回复一点体力','摸两张牌').set('ai',function(){
                        if(game.players[event.Diuse_Player].maxHp-game.players[event.Diuse_Player].hp>=2){
                            return '回复一点体力';
                        } else {return '摸两张牌';}
                    })
                    'step 5'
                    event.list=[]
                    if(result.control=='回复一点体力'){
                        game.players[event.Diuse_Player].recover();
                    } else {
                        game.players[event.Diuse_Player].draw(2);
                    }
                    'step 6'
                    if(event.Diuse_Player+1<game.players.length){
                        event.Diuse_Player++;
                        event.goto(1);
                    } 
					'step 7'
					if(game.me!=game.boss){
						game.boss.changeSeat(6);
					}
					else{
						game.boss.nextSeat.changeSeat(3);
						game.boss.previousSeat.changeSeat(5);
					}
					game.changeBoss('Boss_Fucking_Guiyanwang');
					game.delay(0.5);
					'step 8'
                    game.newBoss();
				}
            },
            Boss_Diuse_Tianshu_intro1:{nobracket:true},
			Boss_Diuse_Tianshu_intro2:{nobracket:true},
			Boss_Diuse_Tianshu_intro3:{nobracket:true},
            Boss_Diuse_Tianshu_intro4:{nobracket:true},
            Boss_Diuse_Tianshu_intro5:{nobracket:true},
        },
        translate:{
            Tianshu_Skill:"天书",
            Tianshu_Protect:"保护",
            Tianshu_Protect_info:'锁定技。无敌一次伤害，随后移除该技能。',
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
            
            Boss_Diuse_Tianshu_intro1:'&nbsp;第一关',
			Boss_Diuse_Tianshu_intro1_info:'挑战旱魃',
			Boss_Diuse_Tianshu_intro2:'&nbsp;第二关',
			Boss_Diuse_Tianshu_intro2_info:'挑战白起/青龙',
			Boss_Diuse_Tianshu_intro3:'&nbsp;第三关',
			Boss_Diuse_Tianshu_intro3_info:'挑战亡神白起',
            Boss_Diuse_Tianshu_intro4:'&nbsp;第四关',
			Boss_Diuse_Tianshu_intro4_info:'挑战鬼阎王',
            Boss_Diuse_Tianshu_intro5:'&nbsp;规则：',
			Boss_Diuse_Tianshu_intro5_info:'共四关，每通过一关，阵亡的角色会复活；随后每个角色摸两张牌和恢复一点体力。每名角色可以选择一个技能获取，然后游戏轮数清零。',
        },
    },
    intro:"所有素材均来自互联网，侵权必删。",
    author:"",
    diskURL:"",
    forumURL:"",
    version:"",
},files:{"character":[""],"card":[],"skill":[]}}})