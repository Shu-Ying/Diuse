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
//重新缩进 防止后续缩进过长
editable:false,
precontent:function (Diuse){

    lib.skill._diuse_dieAudio={ //阵亡语音
        trigger:{player:'dieBegin'},
        forced:true,
        charlotte:true,
        popup:false,
        lastDo:true,
        unique: true,
        forceDie:true,
        content:function(){
            game.playAudio('..','extension\\术樱',trigger.player.name+'_Die');
        }
    };

    var layoutPath = lib.assetURL + 'extension/术樱';
	lib.init.css(layoutPath, 'extension');

    if(Diuse.enable){
        var url=lib.assetURL+'extension/术樱'
        var Diuse_Button=true;

        if(lib.config.extension_术樱_benghuai3off==undefined) game.saveConfig('extension_术樱_benghuai3off',true);
        if(lib.config.extension_术樱_tianshuoff==undefined) game.saveConfig('extension_术樱_tianshuoff',true);
        if(lib.config.extension_术樱_yuanshenoff==undefined) game.saveConfig('extension_术樱_yuanshenoff',true);
        if(lib.config.show_splash!='off') game.saveConfig('show_splash','off');
        if(lib.config.extension_术樱_tianshu_new==undefined) game.saveConfig('extension_术樱_tianshu_new',4);
        if(lib.config.extension_术樱_tianshu_add_list==undefined) game.saveConfig('extension_术樱_tianshu_list','');
        if(lib.config.extension_术樱_kuangbaooff==undefined) game.saveConfig('extension_术樱_kuangbaooff',false);
        if(lib.config.extension_术樱_baizhanoff==undefined) game.saveConfig('extension_术樱_baizhanoff',false);
        if(lib.config.extension_术樱_skillsoff==undefined) game.saveConfig('extension_术樱_skillsoff',false);

        game.saveConfig('Diuse_local_version','1.7.44');

        var httpRequest = new XMLHttpRequest();
        httpRequest.open("GET",'https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/extension/online_version.js',true);
        httpRequest.send(null);
        httpRequest.onreadystatechange=function(){if(httpRequest.readyState==4&&httpRequest.status==200){game.saveConfig('Diuse_online_version',httpRequest.responseText)}else{game.saveConfig('Diuse_online_version','无法访问服务器')}}    

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
        lib.extensionMenu.extension_术樱.online_version={
            "name":"最新版本："+lib.config.Diuse_online_version,
            "clear":true,
            "nopointer":true,
        };
        lib.extensionMenu.extension_术樱.Uplog={
            "name":'<div class="hth_menu">▶更新和说明</div>',
            "clear": true,
            "onclick":function(){
                if(this.hth_more==undefined){
                    var more=ui.create.div('.hth_more',
                    '<div style="text-align:left"><font size=3px>'+
                    //'<br><br>'+
                    '-----< 改动 >-----'+
                    '<br>优化算法<br>'+
                    '<br>重构部分技能<br>'+
                    '<br>修复了众多BUGbr>'+
                    '<br>还有很多很多改动，时间原因没有测试BUG，只能靠大家慢慢游玩发现了。<br>'+
                    '<br>在1.7.8版本加入的禁用BOSS相关函数，导致无法禁将和重置禁将池，受到影响的小伙伴们我在这里道歉，对不起。现1.7.9及以上修复...<br>'+
                    '<br>优化了UI调用，解决了部分界面带来的问题<br>'+
                    '<br>在1.7.1及以上版本都可以使用网络更新啦！<br>'+
                    '-----< 崩坏包 >-----'+
                    '<br>布洛妮娅技能重做<br>'+
                    '<br>因为部分更改，需要删除全部文件后替换压缩包文件<br>'+
                    '<br>-----< 天书乱斗 >-----'+
                    '<br>98%跟踪官方进度<br>'+
                    '<br>部分BOSS添加自创内容。影响不大。<br>'+
                    '<br>修复众多BUG，每个难度因无法手气卡，补偿保护技能<br>'+
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
        // lib.extensionMenu.extension_术樱.Tianshu={
        //     "name":'<div class="hth_menu">▶天书说明</div>',
        //     "clear": true,
        //     "onclick":function(){
        //         if(this.hth_more==undefined){
        //             var more=ui.create.div('.hth_more',
        //             '<div style="text-align:left"><font size=3px>'+
        //             '-----< 第三关 >-----'+
        //             '<br>Boss进入濒死会复活然后给随机任务，完成任务即可减少Boss体力上限<br>'+
        //             '<br>任务名  普通/困难/阴间'+
        //             '<br>任务一:摸牌 数量 25/45/85'+
        //             '<br>任务二:伤害 8/15/25'+
        //             '<br>任务三:恢复 3/7/12<br>'+
        //             '<br>-----< 第四关 >-----'+
        //             '<br>鬼阎王具有地府场地技能。场内角色受到伤害前其进行判定并根据效果执行！<br>'+
        //             '<br>判定结果为红桃：'+
        //             '<br>---------------<br>'+
        //             '点数为1：其流失当前全部体力<br>'+
        //             '点数为2-7：其流失一点体力<br>'+
        //             '点数为8-13：其回复一点体力<br>'+
        //             '<br>判定结果为黑桃：'+
        //             '<br>---------------<br>'+
        //             '点数为1：其受到当前体力值的无伤害来源伤害<br>'+
        //             '点数为2-7：该次伤害+1<br>'+
        //             '点数为8-13：该次伤害-1<br>'+
        //             '<br>判定结果为梅花：'+
        //             '<br>---------------<br>'+
        //             '点数为1：其必须将武将面朝下<br>'+
        //             '点数为2-7：其进入全面易伤状态直至其回合开始时<br>'+
        //             '点数为8-13：其获得保护技能<br>'+
        //             '<br>判定结果为方块：'+
        //             '<br>---------------<br>'+
        //             '点数为1：其必须弃置全部手牌<br>'+
        //             '点数为2-7：其弃置一张牌<br>'+
        //             '点数为8-13：其摸一张牌<br>'+
        //             '<br>鬼阎王有更强力的技能！它能完全保护鬼阎王不受到伤害！同时也有强力的输出手段<br>'+
        //             '<br>摸牌阶段结束后有50%的概率再摸两张牌'+
        //             '<br>出牌阶段开始前有50%的概率使用一张杀'+
        //             '<br>出牌阶段开始时有50%的概率使用一张酒'+
        //             '<br>弃牌阶段结束后有50%的概率摸两张牌'+
        //             '<br>鬼阎王造成伤害前有30%的概率使其+1'+
        //             '<br>鬼阎王受到伤害前有30%的概率使其-1'+
        //             '<br>鬼阎王受到伤害后有25%的概率恢复一点体力'+
        //             '<br>鬼阎王受到伤害后有50%的概率摸一张牌'+
        //             '<br>鬼阎王被杀指定后有10%的概率使使用者弃置一张牌'+
        //             '<br>鬼阎王回合开始前有5%的概率执行一个额外有益的回合'+
        //             '<br>鬼阎王被杀指定后有1%的概率使该牌失效'+
        //             '<br>鬼阎王使用杀时有30%的概率出杀次数+1'+
        //             '</font></div>');
        //             this.parentNode.insertBefore(more,this.nextSibling);
        //             this.hth_more=more;
        //             this.innerHTML='<div class="hth_menu">▼天书说明</div>';
        //         }
        //         else{
        //             this.parentNode.removeChild(this.hth_more);
        //             delete this.hth_more;
        //             this.innerHTML='<div class="hth_menu">▶天书说明</div>';
        //         };
        //     },
        // };
        lib.extensionMenu.extension_术樱.Updata={
            "name":"版本检测",
            "clear":true,
            "onclick":function(){
                if(confirm('点击确定会检测版本')&&Diuse_Button){
                    Diuse_Button=false;
                    download_version();
                } else if(Diuse_Button==false){
                    alert('有其他文件正在下载，请稍后再试吧。');
                }
            },
        };
        lib.extensionMenu.extension_术樱.RepairBug={
            "name":"本地资源修复",
            "clear":true,
            "onclick":function(){
                if(confirm('点击确定会检测本地资源，并尝试修复')&&Diuse_Button){
                    Diuse_Button=false;
                    RepairBug();
                } else if(Diuse_Button==false){
                    alert('有其他文件正在下载，请稍后再试吧。');
                }
            },
        };
        lib.extensionMenu.extension_术樱.Filling={
            "name":"查漏补缺&nbsp;<--补齐丢失资源 建议更新后必点",
            "clear":true,
            "onclick":function(){
                if(confirm('点击确定会检测本地丢失资源，并开始修补；若是武将立绘则是静态，若需动态请手动下载（请注意流量使用情况！务必在WIFI状态下修补）')&&Diuse_Button){
                    Diuse_Button=false;
                    download_filter();
                } else if(Diuse_Button==false){
                    alert('有其他文件正在下载，请稍后再试吧。');
                }
            },
        };
        lib.extensionMenu.extension_术樱.dynamic_name={
            "name":'动态皮肤选择下载',
            "init":'八重樱',
            "item":{
                八重樱:'八重樱',
                布洛妮娅:'布洛妮娅',
                符华:'符华',
                上仙:'上仙',
                识之律者:'识之律者',
                希儿:'希儿',
                芽衣:'芽衣',
                月下初拥:'月下初拥',
                空之律者:'空之律者',
                彼岸双生:'彼岸双生',
                八重神子:'八重神子',
            },
            visualMenu:function(node){
                node.className='button character controlbutton';
                node.style.backgroundSize='';
            },
            onclick:function(layout){
                game.saveConfig('extension_术樱_dynamic_name',layout);
                switch(layout){
                    case '八重樱':{
                        if(confirm('是否下载八重樱的动态皮肤[约为17.2MB]')){
                            download_dynamic('Diuse_Bachongying.jpg');
                        }
                        break;
                    }
                    case '布洛妮娅':{
                        if(confirm('是否下载布洛妮娅的动态皮肤[约为19.3MB]')){
                            download_dynamic('Diuse_Buluoniya.jpg');
                        }
                        break;
                    }
                    case '符华':{
                        if(confirm('是否下载符华的动态皮肤[约为17.8MB]')){
                            download_dynamic('Diuse_Fuhua.jpg');
                        }
                        break;
                    }
                    case '上仙':{
                        if(confirm('是否下载上仙的动态皮肤[约为19.6MB]')){
                            download_dynamic('Diuse_Shangxian.jpg');
                        }
                        break;
                    }
                    case '识之律者':{
                        if(confirm('是否下载识之律者的动态皮肤[约为14.1MB]')){
                            download_dynamic('Diuse_Shilv.jpg')
                        }
                        break;
                    }
                    case '希儿':{
                        if(confirm('是否下载希儿的动态皮肤[约为18.0MB]')){
                            download_dynamic('Diuse_Xier.jpg');
                        }
                        break;
                    }
                    case '芽衣':{
                        if(confirm('是否下载芽衣的动态皮肤[约为7.56MB]')){
                            download_dynamic('Diuse_Yayi.jpg');
                        }
                        break;
                    }
                    case '月下初拥':{
                        if(confirm('是否下载月下初拥的动态皮肤[约为16.4MB]')){
                            download_dynamic('Diuse_Yuexia.jpg');
                        }
                        break;
                    }
                    case '空之律者':{
                        if(confirm('是否下载空之律者的动态皮肤[约为19.35MB]')){
                            download_dynamic('Diuse_Konglv.jpg');
                        }
                        break;
                    }
                    case '彼岸双生':{
                        if(confirm('是否下载彼岸双生的动态皮肤[约为12.6MB]')){
                            download_dynamic('Diuse_Heixi.jpg');
                        }
                        break;
                    }
                    case '八重神子':{
                        if(confirm('是否下载八重神子的动态皮肤[约为17.8MB]')){
                            download_dynamic('Diuse_Bachongshenzi.jpg');
                        }
                        break;
                    }
                    default: alert('未知错误！');
                }
            },
        };
        lib.extensionMenu.extension_术樱.downall={
            "name":'资源下载',
            "init":'static',
            "item":{
                static:'全静态',
                tianshu:'天书乱斗',
                dynamic:'全动态',
                mp3:'全配音',
            },
            visualMenu:function(node){
                node.className='button character controlbutton';
                node.style.backgroundSize='';
            },
            onclick:function(layout){
                game.saveConfig('extension_术樱_downall',layout);
                switch(layout){
                    case 'static':{
                        if(confirm('点击确定会下载全部静态皮肤（处于动态的皮肤均会被替换！不包含天书）[约为2MB]')&&Diuse_Button){
                            Diuse_Button=false;
                            download_static();
                        } else if(Diuse_Button==false){
                            alert('有其他文件正在下载，请稍后再试吧。');
                        }
                        break;
                    }
                    case 'tianshu':{
                        if(confirm('点击确定会下载全部天书皮肤[约为30.00MB]')&&Diuse_Button){
                            Diuse_Button=false;
                            download_tianshu();
                        } else if(Diuse_Button==false){
                            alert('有其他文件正在下载，请稍后再试吧。');
                        }
                        break;
                    }
                    case 'mp3':{
                        if(confirm('点击确定会下载全部配音[约为7.2MB]')&&Diuse_Button){
                            Diuse_Button=false;
                            download_mp3();
                        } else if(Diuse_Button==false){
                            alert('有其他文件正在下载，请稍后再试吧。');
                        }
                        break;
                    }
                    case 'dynamic':{
                        if(confirm('点击确定会下载全部动态[约为180MB]')&&Diuse_Button){
                            Diuse_Button=false;
                            download_dynamic_all();
                        } else if(Diuse_Button==false){
                            alert('有其他文件正在下载，请稍后再试吧。');
                        }
                        break;
                    }
                }
            }
        };
        lib.extensionMenu.extension_术樱.br1={
            clear: true,
            nopointer: true,
            name: '--------------------',
        },
        lib.extensionMenu.extension_术樱.Benghuai={
            "name":'<div class="hth_menu">▶崩坏3技能说明</div>',
            "clear": true,
            "onclick":function(){
                if(this.hth_more==undefined){
                    var more=ui.create.div('.hth_more',
                    '<div style="text-align:left"><font size=3px>'+
                    '-----< SP >-----'+
                    '<br>SP用来释放角色的终极技能，每个角色所需的SP均不同。<br>'+
                    'SP获取必须遵守以下规则：<br>'+
                    '使用属性杀：7<br>'+
                    '使用闪：6<br>'+
                    '使用普通杀：5<br>'+
                    '使用普通锦囊：4<br>'+
                    '打出闪：5<br>'+
                    '造成伤害：5*伤害值<br>'+
                    '以及部分技能获取<br>'+
                    '-----< 识之律者 >-----'+
                    '<br>根据武器攻击距离获得相应技能<br>'+
                    '一:当你于你的回合内使用一张牌后，你可以弃置一张手牌并摸一张牌。<br>'+
                    '二:当你于回合内获得一张牌且不是因为此技能获得牌时，你摸一张牌。<br>'+
                    '三:出牌阶段限两次。你造成伤害后你可以让场上的一名角色受到一点无伤害来源的伤害。<br>'+
                    '四:你使用杀或普通锦囊后你可以多增加一个目标，如果取消则摸X张牌(X为你已损失的体力，如果为0则摸1)<br>'+
                    '五:出牌阶段限一次，当你使用可造成伤害的牌指定目标后你可以选择其一个目标然后你摸X张牌。(X为目标当前体力)<br>'+
                    '六:获得全部技能效果。<br>'+
                    '<br>-----< 符华 >-----'+
                    '<br>弃置的牌都必须遵循以下规则<br>'+
                    '<br>三张重复'+
                    '<br>【桃】 恢复两点体力并摸三张牌'+
                    '<br>【闪】 此杀必须两张闪响应 然后你摸两张牌'+
                    '<br>【杀】 此杀不可被响应 出杀次数上限+2'+
                    '<br>【酒】 此杀伤害+3<br>'+
                    '<br>两张重复'+
                    '<br>【桃】 恢复一点体力并摸两张牌'+
                    '<br>【闪】 此杀需要打出两张闪响应'+
                    '<br>【杀】 不可以被响应'+
                    '<br>【酒】 此杀伤害+2<br>'+
                    '<br>一张'+
                    '<br>【桃】 命中后恢复一点体力'+
                    '<br>【闪】 命中后摸一张牌'+
                    '<br>【杀】 出杀次数上限+1'+
                    '<br>【酒】 此杀伤害+1'+
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
        lib.extensionMenu.extension_术樱.benghuai3off={
            "name":"崩坏3开关",
            "init":true,
            "intro":"关闭后，关闭崩坏3武将包。"
        };
        lib.extensionMenu.extension_术樱.br2={
            clear: true,
            nopointer: true,
            name: '--------------------',
        },
        lib.extensionMenu.extension_术樱.yuanshenoff={
            "name":"原神开关",
            "init":true,
            "intro":"关闭后，关闭原神武将包。"
        };
        lib.extensionMenu.extension_术樱.br3={
            clear: true,
            nopointer: true,
            name: '--------------------',
        },
        lib.extensionMenu.extension_术樱.DIYplayer={
            "name":'<div class="hth_menu">▶DIY将作者</div>',
            "clear": true,
            "onclick":function(){
                if(this.hth_more==undefined){
                    var more=ui.create.div('.hth_more',
                    '<div style="text-align:left"><font size=3px>'+
                    '晋·钟会 作者：红雨<br>'+
                    '魏·司马昭 作者：红雨<br>'+
                    '魏·司马师 作者：红雨<br>'+
                    '魏·庞会 作者：红雨<br>'+
                    '魏·曹髦 作者：红雨<br>'+
                    '魏·曹操 作者：Sou177<br>'+
                    '群·吕布 作者：Sou177<br>'+
                    '蜀·诸葛尚 作者：安徽阿斗<br>'+
                    '</font></div>');
                    this.parentNode.insertBefore(more,this.nextSibling);
                    this.hth_more=more;
                    this.innerHTML='<div class="hth_menu">▼DIY将作者</div>';
                }
                else{
                    this.parentNode.removeChild(this.hth_more);
                    delete this.hth_more;
                    this.innerHTML='<div class="hth_menu">▶DIY将作者</div>';
                };
            },
        };
        lib.extensionMenu.extension_术樱.diyoff={
            "name":"DIY开关",
            "init":true,
            "intro":"关闭后，关闭DIY武将包。"
        };
        lib.extensionMenu.extension_术樱.br4={
            clear: true,
            nopointer: true,
            name: '--------------------',
        },
        lib.extensionMenu.extension_术樱.tianshuoff={
            "name":"天书乱斗开关",
            "init":true,
            "intro":"关闭后，关闭天书乱斗模式（在非挑战模式下自动关闭）"
        };
        lib.extensionMenu.extension_术樱.giveaiskill={
            "name":"单人控制AI技能",
            "init":false,
            "intro":"开启后，天书乱斗模式每次过关且处于单人控制规则下则玩家给AI选择技能。"
        };
        lib.extensionMenu.extension_术樱.tianshu_xvni={
            "name":'虚拟偶像',
            "init":'random',
            "item":{
                Xiaojiu:'小酒',
                Xiaosha:'小杀',
                Xiaoshan:'小闪',
                Xiaole:'小乐',
                Xiaotao:'小桃',
                random:'随机',
            },
            visualMenu:function(node){
                node.className='button character controlbutton';
                node.style.backgroundSize='';
            },
            onclick:function(layout){
                game.saveConfig('extension_术樱_tianshu_xvni',layout);
            }
        };
        lib.extensionMenu.extension_术樱.tianshuskill={
            "name":'天书技能选择',
            "init":'OFF',
            "item":{
                OFF:'关闭',
                Zhiheng:'制衡',
                Wusheng:'武圣',
                Rende:'仁德',
                Yingzi:'英姿',
                Random:'随机',
            },
            "intro":"选择后每次过关就会出现你选择的技能。",
            visualMenu:function(node){
                node.className='button character controlbutton';
                node.style.backgroundSize='';
            },
            onclick:function(layout){
                game.saveConfig('extension_术樱_tianshu_skill',layout);
            },
        };
        lib.extensionMenu.extension_术樱.tianshuaddoff={
            "name":"天书自定义关卡(需重启",
            "init":false,
            "intro":"关闭后，击败天书乱斗模式下第四关则通关(需重启"
        };

        if(lib.config.extension_术樱_tianshuaddoff){
            lib.extensionMenu.extension_术樱.tianshunew={
                "name":"关卡总数",
                "item":{
                    5:'5',
                    10:'10',
                    15:'15',
                    20:'20',
                    25:'25',
                    30:'30',
                    35:'35',
                    40:'40',
                    45:'45',
                    50:'50',
                    55:'55',
                    60:'60',
                    65:'65',
                    70:'70',
                    75:'75',
                    80:'80',
                    85:'85',
                    90:'90',
                    95:'95',
                    100:'100',
                },
                visualMenu:function(node){
                    node.className='button character controlbutton';
                    node.style.backgroundSize='';
                },
                onclick:function(layout){
                    game.saveConfig('extension_术樱_tianshu_new',layout);
                    //game.saveConfig('extension_术樱_tianshu_new',6);
                },
            };

            lib.extensionMenu.extension_术樱.tianshubutton={
                "name":"自定义关卡",
                "clear":true,
                onclick:function(){
                    newTianShuBossList();
                },
            };

            lib.extensionMenu.extension_术樱.randomoff={
                "name":"混合BOSS",
                "init":false,
                "intro":"开启后将自定义Boss和正常关卡Boss随机组合，关闭后若关卡超过5则自动用正常关卡BOSS随机组合"
            };

            // lib.extensionMenu.extension_术樱.baizhanoff={
            //     "name":"百战天书增强BOSS公式",
            //     "init":false,
            //     "intro":"启用后若关卡大于5则会增强BOSS体力,伤害,摸牌等"
            // };

            lib.extensionMenu.extension_术樱.kuangbaooff={
                "name":"狂暴机制",
                "init":false,
                "intro":"A.每关的第五轮开始时（只第五轮该机制才生效），所有角色玩家弃置各自区域里的所有牌。<br>"+"B.每关的第七轮起（第七轮开始之后的每轮该机制皆生效），玩家角色玩家在各自的回合开始时失去1点体力。"
            };

            lib.extensionMenu.extension_术樱.skillsoff={
                "name":"百战天书技能奖励机制",
                "init":false,
                "intro":"每次选择技能数量+1，但主动技只能拥有一个。"
            };
        }

        lib.extensionMenu.extension_术樱.Log={
            "name":"<span style='text-decoration: underline'>反馈BUG</span>",
            "clear":true,
            "onclick":function(){
                game.open('https://tieba.baidu.com/p/7592422139');
            },
        };
        lib.extensionMenu.extension_术樱.thank={
            "name":"最后感谢极光佬，诗笺佬和其他大佬网络上的文献，还有反馈BUG的玩家。谢谢！",
            "clear":true,
            "nopointer":true,
        };

        newTianShuBossList=function(){
            _status.buttonNode; //用于判断输入框回车之后响应事件
            _status.nameList;
            var manual = ui.create.div('.manual', manual);
			var menu = ui.create.div('.menu', manual);
			var input = menu.appendChild(document.createElement('input'));
			input.onkeydown=function(e){
                if(e&&e.keyCode==13){
                    if(_status.buttonNode==2){
                        deleteNewBossList(dialog,manual,input.value);
                    } else {
                        addNewBossList(dialog,manual,input.value);
                    }
                }
			};
            
			var addNewBoss = ui.create.div('.addNewBoss',menu); //加入新boss
            var newBossList = ui.create.div('.newBossList',menu);
            var deleteNewBossAllList = ui.create.div('.deleteNewBossAllList',menu);
            var deleteNewBoss = ui.create.div('.deleteNewBoss',menu);
            var playerList = ui.create.div('.playerList',menu);

			var close = ui.create.div('.close', menu);
			var dialog=ui.create.dialog();
			dialog.noImage=true;
			dialog.style.backgroundImage="";

			var content = manual.appendChild(dialog);	
			content.classList.remove('nobutton');
			content.classList.add('content');
			content.style.transform = '';
			content.style.opacity = '';
			content.style.height = '';

            newBossList.innerHTML = '列表';
            newBossList.id='newBossList';
			newBossList.addEventListener('click', function(){
                newBossShow(dialog,manual);
			});

            deleteNewBossAllList.innerHTML = '清除';
			deleteNewBossAllList.addEventListener('click', function(){
                if(confirm('点击确定清除全部自定义Boss')){
                    game.saveConfig('extension_术樱_tianshu_add_list','');
                    newBossShow(dialog,manual);
                    alert('清除完毕!');
                }
			});

			addNewBoss.innerHTML = '搜索';
			addNewBoss.addEventListener('click', function(){
                addNewBossList(dialog,manual,input.value);
                input.value="";
                _status.buttonNode=1;
			});

            deleteNewBoss.innerHTML = '登陆'; //暂时弃用
			deleteNewBoss.addEventListener('click', function(){
                alert('暂未开放');
                //deleteNewBossList(dialog,manual,input.value);
                //input.value="";
                //_status.buttonNode=2;
			});
			
            playerList.innerHTML = '排行榜';
			playerList.addEventListener('click', function(){
                alert('暂未开放');
			});

            dialog.addText("使用说明: 点击列表查看自定义BOSS列表<br><br>"+
            "点击清空按钮清空自定义BOSS列表中全部Boss<br><br>"+
            "点击列表列举出Boss列表，并可以删除列表中的Boss<br><br>"+
            "点击搜索并在输入框内输入武将名称即可罗列相似武将<br><br>"+
            "需要注意的是，输入框需要输入武将名称而不是英文<br>一旦启用自定义Boss，那么必须保持不禁用武将和Boss列表大于1");

            // close1.addEventListener('click', function(){
			// 	alert(close1.value);
			// 	//game.tujianBegin(content , close , input.value , manual);
			// 	//input.value="";
			// });

			close.innerHTML = '关闭';
			close.addEventListener('click', function(){
				manual.remove();
				ui.arena.show();
				ui.system.show();

                game.resume2();
                if(game.onresume2){
                    game.onresume2();
                }
                ui.arena.classList.remove('menupaused');
                ui.historybar.classList.remove('menupaused');
                ui.window.classList.remove('touchinfohidden');
                ui.config2.classList.remove('pressdown2');
				//ui.menuContainer.show();
			});
			
			//_status.paused = true;
			ui.arena.classList.remove('menupaused');
			ui.arena.hide();
			ui.system.hide();
			ui.menuContainer.hide();
			ui.window.appendChild(manual);
        },

        newBossShow=function(dialog,manual){
            dialog=ui.create.dialog();
            dialog.noImage=true;
            dialog.style.backgroundImage="";

            var content = manual.appendChild(dialog);	
            content.classList.remove('nobutton');
            content.classList.add('content');
            content.style.transform = '';
            content.style.opacity = '';
            content.style.height = '';

            var list=lib.config.extension_术樱_tianshu_add_list;
            if(list==undefined||list==''){
                dialog.addText("无BOSS");
            } else {
                list=list.split(",");

                for(var i=0;i<list.length;i++){
                    for (var j in lib.character) {
                        if (j==list[i]) {
                            dialog.addSmall([[j], 'character']);
                            var del=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
                            del.link=i;
                            del.innerHTML='<span>'+'删除'+'</span>';
                            del.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
                                if(lib.config.extension_术樱_tianshu_add_list.length<=1){
                                    game.saveConfig('extension_术樱_tianshu_add_list','');
                                } else if(lib.config.extension_术樱_tianshu_add_list.length==2){
                                    if(this.link!=1){
                                        game.saveConfig('extension_术樱_tianshu_add_list',list[this.link]);
                                    } else {
                                        game.saveConfig('extension_术樱_tianshu_add_list',list[0]);
                                    }
                                } else {
                                    game.saveConfig('extension_术樱_tianshu_add_list','');
                                    for(var k=0;k<list.length;k++){
                                        if(k==this.link) continue;
                                        if(lib.config.extension_术樱_tianshu_add_list==undefined||lib.config.extension_术樱_tianshu_add_list==''){
                                            game.saveConfig('extension_术樱_tianshu_add_list',list[k]);
                                        } else {
                                            game.saveConfig('extension_术樱_tianshu_add_list',lib.config.extension_术樱_tianshu_add_list+','+list[k]);
                                        }
                                    }
                                    document.getElementById('newBossList').click(); //刷新列表
                                }
                            });
                            dialog.addAuto(del);
                        } 
                    }
                }
            }
        },

        addNewBossList=function(dialog,manual,val){
            dialog=ui.create.dialog();
            dialog.noImage=true;
            dialog.style.backgroundImage="";
            
            var content = manual.appendChild(dialog);	
            content.classList.remove('nobutton');
            content.classList.add('content');
            content.style.transform = '';
            content.style.opacity = '';
            content.style.height = '';

            var result=val;
            var value = false;
            var list=[];

            if (result == "" || result == null) {
                result = "请输入武将名称";
                alert(result);	
            } else {
                for (var a in lib.character) {
                    if (lib.translate[a]&&lib.translate[a].indexOf(result)!=-1) {
                        list.add(a);
                        value = true;
                    }
                }
    
                for(var i=0;i<list.length;i++){
                    dialog.addSmall([[list[i]], 'character']); 
                    var add=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
                    add.link=i;
                    add.innerHTML='<span>'+'加入'+'</span>';
                    add.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
                        if(lib.config.extension_术樱_tianshu_add_list==undefined||lib.config.extension_术樱_tianshu_add_list==''){
                            game.saveConfig('extension_术樱_tianshu_add_list',list[this.link]);
                        } else {
                            game.saveConfig('extension_术樱_tianshu_add_list',lib.config.extension_术樱_tianshu_add_list+','+list[this.link]);
                        }
                        alert('成功加入至列表');
                    });
                    dialog.addAuto(add);
                }
                
                _status.nameList=list;
                
                if (value == false) {
                    alert('找不到名为' + result + '的武将!');
                }    
            }
        },

        deleteNewBossList=function(dialog,manual,val){
            dialog=ui.create.dialog();
            dialog.noImage=true;
            dialog.style.backgroundImage="";
            
            var content = manual.appendChild(dialog);	
            content.classList.remove('nobutton');
            content.classList.add('content');
            content.style.transform = '';
            content.style.opacity = '';
            content.style.height = '';

            var result=val;

            if (result == "" || result == null) {
                result = "你没有输入名称";
                alert(result);	
                return;
            } 

            var list=lib.config.extension_术樱_tianshu_add_list.split(",");
            var value = false;
            var newList=[];

            for (var i=0;i<list.length;i++) {
            	var pushBool=true;
                if (String(lib.translate[list[i]]) == String(result)) {
                    if(confirm('已找到'+ result +'武将，点击确定移除自定义Boss列表。')){
                        pushBool=false;
                    } 
                    value=true;
                }
                if(pushBool) newList.push(list[i]);
            }
            if(newList){
                game.saveConfig('extension_术樱_tianshu_add_list','');
                for(var j=0;j<newList.length;j++){
                    if(lib.config.extension_术樱_tianshu_add_list==undefined||lib.config.extension_术樱_tianshu_add_list==''){
                        game.saveConfig('extension_术樱_tianshu_add_list',newList[j]);
                    } else {
                        game.saveConfig('extension_术樱_tianshu_add_list',lib.config.extension_术樱_tianshu_add_list+','+newList[j]);
                    }
                }
            }


            if (value == false) {
                alert('找不到名为' + result + '的武将或者武将不存在自定义Boss列表中。');
            }
        },


        download_filter=function(){
            lib.init.js(url,'files',function(){
                var tianshu_list=Diuse_tianshu,mp3_list=Diuse_mp3,static_list=Diuse_static,css_list=Diuse_css;
                var url_beta='extension/术樱/';
                var num=0;
                var num1=tianshu_list.length,num2=mp3_list.length,num3=static_list.length,num4=css_list.length;
                var listnum=num1+num2+num3+num4;
                document.body.appendChild(Diuse_Text);
                var download1=function(){
                    var url_search=url_beta+tianshu_list[0];
                    game.readFile(url_search,function(){
                        num++;
                        tianshu_list.remove(tianshu_list[0]);
                        if(tianshu_list.length>0){
                            Diuse_Text.innerHTML='正在查漏补缺（'+num+'/'+listnum+'）';
                            download1();
                        } else {
                            download2();
                        }
                    },function(){
                        game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/image/tianshu/'+tianshu_list[0],'extension/术樱/'+tianshu_list[0],function(){
                            num++;
                            tianshu_list.remove(tianshu_list[0]);
                            if(tianshu_list.length>0){
                                Diuse_Text.innerHTML='正在查漏补缺（'+num+'/'+listnum+'）';
                                download1();
                            } else {
                                download2();
                            }
                        },function(){
                            if(confirm('下载'+tianshu_list[0]+'失败，是否继续下载？')){
                                download1();
                            }
                        });
                    });
                }
                var download2=function(){
                    var url_search=url_beta+mp3_list[0];
                    game.readFile(url_search,function(){
                        num++;
                        mp3_list.remove(mp3_list[0]);
                        if(mp3_list.length>0){
                            Diuse_Text.innerHTML='正在查漏补缺（'+num+'/'+listnum+'）';
                            download2();
                        } else {
                            download3();
                        }
                    },function(){
                        game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/skin/'+mp3_list[0],'extension/术樱/'+mp3_list[0],function(){
                            num++;
                            mp3_list.remove(mp3_list[0]);
                            if(mp3_list.length>0){
                                Diuse_Text.innerHTML='正在查漏补缺（'+num+'/'+listnum+'）';
                                download2();
                            } else {
                                download3();
                            }
                        },function(){
                            if(confirm('下载'+mp3_list[0]+'失败，是否继续下载？')){
                                download2();
                            }
                        });
                    });
                }
                var download3=function(){
                    var url_search=url_beta+css_list[0];
                    game.readFile(url_search,function(){
                        num++;
                        css_list.remove(css_list[0]);
                        if(css_list.length>0){
                            Diuse_Text.innerHTML='正在查漏补缺（'+num+'/'+listnum+'）';
                            download3();
                        }else{
                            download4();
                        };
                    },function(){
                        game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/css/'+css_list[0],'extension/术樱/'+css_list[0],function(){
                            num++;
                            css_list.remove(css_list[0]);
                            if(css_list.length>0){
                                Diuse_Text.innerHTML='正在查漏补缺（'+num+'/'+listnum+'）';
                                download3();
                            }else{
                                download4();
                            };
                        },function(){
                            if(confirm('下载'+css_list[0]+'失败，是否继续下载？')){
                                download3();
                            }
                        });
                    });
                }
                var download4=function(){
                    var url_search=url_beta+static_list[0];
                    game.readFile(url_search,function(){
                        num++;
                        static_list.remove(static_list[0]);
                        if(static_list.length>0){
                            Diuse_Text.innerHTML='正在查漏补缺（'+num+'/'+listnum+'）';
                            download4();
                        }else{
                            Diuse_Text.innerHTML='查漏补缺完毕';
                            Diuse_Button=true;
                            alert('查漏补缺完毕!');
                            document.body.removeChild(Diuse_Text);
                        };
                    },function(){
                        game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/image/static/'+static_list[0],'extension/术樱/'+static_list[0],function(){
                            num++;
                            static_list.remove(static_list[0]);
                            if(static_list.length>0){
                                Diuse_Text.innerHTML='正在查漏补缺（'+num+'/'+listnum+'）';
                                download4();
                            }else{
                                Diuse_Text.innerHTML='查漏补缺完毕';
                                Diuse_Button=true;
                                alert('查漏补缺完毕!');
                                document.body.removeChild(Diuse_Text);
                            };
                        },function(){
                            if(confirm('下载'+static_list[0]+'失败，是否继续下载？')){
                                download4();
                            }
                        });
                    });
                }
                
                download1();
            },function(){
                Diuse_Button=true;
                alert('本地资源不完整！请检查文件完整性。');
            });
        },
        download_version=function(){
            var online_version;
            var httpRequest = new XMLHttpRequest();
            httpRequest.open("GET",'https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/extension/online_version.js',true);
            httpRequest.send(null);
            httpRequest.onreadystatechange=function(){
                if (httpRequest.readyState==4&&httpRequest.status==200){
                    online_version=httpRequest.responseText;
                    game.saveConfig('Diuse_online_version',httpRequest.responseText)
                    lib.init.js(url,'version',function(){
                        try {
                            var local_version = Diuse_version;
                            var Diuse_num=1;
                        } catch (error) {
                            if(confirm('本地资源不完整！点击确认重新获取！')){
                                game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/extension/files.js','extension/术樱/files.js',function(){},function(){});
                                game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/extension/version.js','extension/术樱/version.js',function(){},function(){});
                                game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/extension/extension.js','extension/术樱/extension.js',function(){
                                    game.saveConfig('Diuse_local_version',online_version);
                                    Diuse_Button=true;
                                    alert('下载完成，重启生效');
                                },function(){
                                    Diuse_Button=true;
                                    alert('下载失败');
                                });
                            } else {
                                Diuse_Button=true;
                            }
                        }
                        if(local_version!=online_version&&Diuse_num==1){
                            if(confirm('检测到最新版本为:'+online_version+'本地版本为:'+local_version)){
                                game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/extension/files.js','extension/术樱/files.js',function(){},function(){});
                                game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/extension/version.js','extension/术樱/version.js',function(){},function(){});
                                game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/extension/extension.js','extension/术樱/extension.js',function(){
                                    game.saveConfig('Diuse_local_version',online_version);
                                    Diuse_Button=true;
                                    alert('下载完成，重启生效');
                                },function(){
                                    Diuse_Button=true;
                                    alert('下载失败');
                                });
                            } else {
                                Diuse_Button=true;
                            }
                        } else {
                            if(Diuse_num==1){
                                Diuse_Button=true;
                                alert('本地版本为最新版');
                            } 
                        }
                    },function(){
                        if(confirm('本地资源不完整！点击确认重新获取！')){
                            game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/extension/files.js','extension/术樱/files.js',function(){},function(){});
                            game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/extension/version.js','extension/术樱/version.js',function(){},function(){});
                            game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/extension/extension.js','extension/术樱/extension.js',function(){
                                game.saveConfig('Diuse_local_version',online_version);
                                Diuse_Button=true;
                                alert('下载完成，重启生效');
                            },function(){
                                Diuse_Button=true;
                                alert('下载失败');
                            });
                        } else {
                            Diuse_Button=true;
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
                        game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/skin/'+list[0],'extension/术樱/'+list[0],function(){
                            num++
                            list.remove(list[0]);
                            if(list.length>0){
                                Diuse_Text.innerHTML='正在下载（'+num+'/'+num1+'）';
                                download1();
                            }else{
                                Diuse_Text.innerHTML='下载完毕';
                                Diuse_Button=true;
                                alert('语音下载完毕!');
                                document.body.removeChild(Diuse_Text);
                            };
                        },function(){
                            if(confirm('下载'+list[0]+'失败，是否继续下载？')){
                                download1();
                            }
                        });
                    }
                download1();
            },function(){
                Diuse_Button=true;
                alert('本地资源不完整！请检查文件完整性。');
            });
        };
        download_static=function(){
            lib.init.js(url,'files',function(){
                var list=Diuse_static;
                var num=0;
                var num1=list.length;
                document.body.appendChild(Diuse_Text);
                var download1=function(){
                        game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/image/static/'+list[0],'extension/术樱/'+list[0],function(){
                            num++
                            list.remove(list[0]);
                            if(list.length>0){
                                Diuse_Text.innerHTML='正在下载（'+num+'/'+num1+'）';
                                download1();
                            }else{
                                Diuse_Text.innerHTML='下载完毕';
                                Diuse_Button=true;
                                alert('静态皮肤下载完毕!');
                                document.body.removeChild(Diuse_Text);
                            };
                        },function(){
                            if(confirm('下载'+list[0]+'失败，是否继续下载？')){
                                download1();
                            }
                        });
                    }
                download1();
            },function(){
                Diuse_Button=true;
                alert('本地资源不完整！请检查文件完整性。');
            });
        };
        download_tianshu=function(){
            lib.init.js(url,'files',function(){
                var list=Diuse_tianshu;
                var num=0;
                var num1=list.length;
                document.body.appendChild(Diuse_Text);
                var download1=function(){
                    game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/image/tianshu/'+list[0],'extension/术樱/'+list[0],function(){
                        num++
                        list.remove(list[0]);
                        if(list.length>0){
                            Diuse_Text.innerHTML='正在下载（'+num+'/'+num1+'）';
                            download1();
                        }else{
                            Diuse_Text.innerHTML='下载完毕';
                            Diuse_Button=true;
                            alert('天书皮肤下载完毕!');
                            document.body.removeChild(Diuse_Text);
                        };
                    },function(){
                        if(confirm('下载'+list[0]+'失败，是否继续下载？')){
                            download1();
                        }
                    });
                }
                download1();
            },function(){
                Diuse_Button=true;
                alert('本地资源不完整！请检查文件完整性。');
            });
        };
        download_dynamic=function(dynamic_name){
            game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/image/dynamic/'+dynamic_name,'extension/术樱/'+dynamic_name,function(){
                Diuse_Button=true;
                alert('所选皮肤下载完毕!');
            },function(){
                if(confirm('下载'+dynamic_name+'失败，是否继续下载？')){
                    download_dynamic(dynamic_name);
                }
            });
        };
        download_dynamic_all=function(){
            lib.init.js(url,'files',function(){
                var list=Diuse_dynamic;
                var num=0;
                var num1=list.length;
                document.body.appendChild(Diuse_Text);
                var download1=function(){
                    game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/image/dynamic/'+list[0],'extension/术樱/'+list[0],function(){
                        num++
                        list.remove(list[0]);
                        if(list.length>0){
                            Diuse_Text.innerHTML='正在下载（'+num+'/'+num1+'）';
                            download1();
                        }else{
                            Diuse_Text.innerHTML='下载完毕';
                            Diuse_Button=true;
                            alert('动态皮肤下载完毕!');
                            document.body.removeChild(Diuse_Text);
                        };
                    },function(){
                        if(confirm('下载'+list[0]+'失败，是否继续下载？')){
                            download1();
                        }
                    });
                }
                download1();
            },function(){
                Diuse_Button=true;
                alert('本地资源不完整！请检查文件完整性。');
            });
        };
        download_files_all=function(){
            lib.init.js(url,'files',function(){
                var list=Diuse_dynamic;
                var num=0;
                var num1=list.length;
                document.body.appendChild(Diuse_Text);
                var download1=function(){
                    game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/image/dynamic/'+list[0],'extension/术樱/'+list[0],function(){
                        num++
                        list.remove(list[0]);
                        if(list.length>0){
                            Diuse_Text.innerHTML='正在下载（'+num+'/'+num1+'）';
                            download1();
                        }else{
                            Diuse_Text.innerHTML='下载完毕';
                            Diuse_Button=true;
                            alert('动态皮肤下载完毕!');
                            document.body.removeChild(Diuse_Text);
                        };
                    },function(){
                        if(confirm('下载'+list[0]+'失败，是否继续下载？')){
                            download1();
                        }
                    });
                }
                download1();
            },function(){
                Diuse_Button=true;
                alert('本地资源不完整！请检查文件完整性。');
            });
        };
        RepairBug=function(){
            lib.init.js(url,'files',function(){
                lib.init.js(url,'version',function(){RepairBugGo();},function(){
                    game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/extension/version.js','extension/术樱/version.js',function(){alert('version资源修复成功！');Diuse_Button=true;},function(){alert('version资源修复失败！');Diuse_Button=true;});
                });
            },function(){
                game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/extension/files.js','extension/术樱/files.js',function(){alert('files资源修复成功！');Diuse_Button=true;},function(){alert('files资源修复失败！');Diuse_Button=true;});
                lib.init.js(url,'version',function(){},function(){
                    game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/extension/version.js','extension/术樱/version.js',function(){alert('version资源修复成功！');Diuse_Button=true;},function(){alert('version资源修复失败！');Diuse_Button=true;});
                });
            });
        };
        RepairBugGo=function(){
            Diuse_Button=true;
            if(confirm('本地资源文件检测无误，若有问题点击确定重新下载全部资源。')){
                Diuse_Button=false;
                game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/extension/files.js','extension/术樱/files.js',function(){},function(){});
                game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/extension/version.js','extension/术樱/version.js',function(){},function(){});
                game.download('https://diuse.coding.net/p/extension/d/noname_extension/git/raw/master/extension/extension.js','extension/术樱/extension.js',function(){
                    Diuse_Button=true;
                    alert('下载完成，重启生效');
                },function(){
                    Diuse_Button=true;
                    alert('下载失败');
                });
            }
        };
        /*var mode=lib.config.all.mode.slice(0);
        var pveBannedName=['Shengxiao_Zishu','Shengxiao_Chouniu','Shengxiao_Yinhu','Shengxiao_Maotu','Shengxiao_Chenlong','Shengxiao_Sishe','Shengxiao_Wuma','Shengxiao_Weiyang','Shengxiao_Shenhou','Shengxiao_Youji',
        'Shengxiao_Xvgou','Shengxiao_Haizhu','Nianshou_Dawei','Nianshou_Dashu','Nianshou_Dawu','Nianshou_Daqun','Xishou_Dawei','Xishou_Dashu','Xishou_Dawu','Xishou_Daqun','Zhuogui_Boss_Baowei','Zhuogui_Boss_Baowei_Difficulty',
        'Zhuogui_Boss_Baowei_Fucking','Zhuogui_Boss_Heibaiwuchang','Zhuogui_Boss_Heibaiwuchang_Difficulty','Qingqing_Boss_Dongzhuo','Zhuogui_Boss_Heibaiwuchang_Fucking','Qingqing_Boss_Dongzhuo_Difficulty','Qingqing_Boss_Dongzhuo_Fucking',
        'Qingqing_Boss_Yuanshu','Qingqing_Boss_Yuanshu_Difficulty','Qingqing_Boss_Yuanshu_Fucking','Tianshu_Boss_Xuannv','Tianshu_Boss_Xuannv_Difficulty','Tianshu_Boss_Xuannv_Fucking','Tianshu_Boss_Hanba','Tianshu_Boss_Hanba_Difficulty',
        'Tianshu_Boss_Hanba_Fucking','Xvni_Xiaosha','Xvni_Xiaoshan','Xvni_Xiaojiu','Xvni_Xiaotao','Xvni_Xiaole','Boss_Ordinary_Hankui','Boss_Difficulty_Hankui','Boss_Fucking_Hankui','Boss_Ordinary_Baiqi','Boss_Difficulty_Baiqi',
        'Boss_Fucking_Baiqi','Boss_Ordinary_WangshenBaiqi','Boss_Difficulty_WangshenBaiqi','Boss_Fucking_WangshenBaiqi','Boss_Ordinary_Guiyanwang','Boss_Difficulty_Guiyanwang','Boss_Fucking_Guiyanwang','Qingqing_Boss_Simayi_Fucking',
        'Zhuogui_Boss_Yvsai','Zhuogui_Boss_Yvsai_Difficulty','Zhuogui_Boss_Yvsai_Fucking','Qingqing_Boss_Lvbu','Qingqing_Boss_Lvbu_Difficulty','Qingqing_Boss_Lvbu_Fucking','Qingqing_Boss_Simayi','Qingqing_Boss_Simayi_Difficulty',
        'Longzhou_Boss_Taoshen','Longzhou_Boss_Taoshen_Difficulty','Longzhou_Boss_Taoshen_Fucking','Longzhou_Boss_Caoe','Longzhou_Boss_Caoe_Difficulty','Longzhou_Boss_Caoe_Fucking'];
        //'','','','','','','','','','','','','','','','','',
        
        for(var i=0;i<mode.length;i++){
            var modeBanndeList=lib.config[mode[i]+'_banned'];
            if(modeBanndeList==''||modeBanndeList==undefined){
                game.saveConfig(mode[i]+'_banned',pveBannedName);
            } else {
                modeBanndeList=JSON.stringify(modeBanndeList)
                modeBanndeList=modeBanndeList.substring(1,modeBanndeList.length - 1);
                modeBanndeList=modeBanndeList.replace(/\"/g, "");
                var modeBanned=modeBanndeList.split("," );
                for(var j=0;j<modeBanned.length;j++){
                    pveBannedName.push(modeBanned[j])        
                }   
                var bannedList=[]
                for(j = 0; j < pveBannedName.length; j++){
                    for(k = j + 1; k < pveBannedName.length; k++){
                        if(pveBannedName[j] === pveBannedName[k]){
                            j = ++k;
                        }
                    }
                    bannedList.push(pveBannedName[j]); 
                }
                game.saveConfig(mode[i]+'_banned',bannedList);
            }
        }*/

        if(lib.config.extension_术樱_benghuai3off){
            game.Benghuai3=function(英文名,翻译名,obj,扩展包名){
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

                lib.element.player.shanbeng_same=function(same,card_name){
                    switch(card_name){
                        case 'sha':{if(same==1){this.getStat().card.sha--;} else if(same==2){this.addTempSkill('Shanbeng_same_2_sha','shaAfter')} else {this.addTempSkill('Shanbeng_same_3_sha','shaAfter')};break;}
                        case 'shan':{if(same==1){this.addTempSkill('Shanbeng_same_1_shan','shaAfter')}else if(same==2){this.addTempSkill('Shanbeng_same_2_shan','shaAfter')}else{this.addTempSkill('Shanbeng_same_3_shan','shaAfter')};break;}
                        case 'tao':{if(same==1){this.addTempSkill('Shanbeng_same_1_tao','shaAfter')}else if(same==2){this.addTempSkill('Shanbeng_same_2_tao','shaAfter')}else{this.addTempSkill('Shanbeng_same_3_tao','shaAfter')};break;}
                        case 'jiu':{if(same==1){this.addTempSkill('Shanbeng_same_1_jiu','shaAfter')}else if(same==2){this.addTempSkill('Shanbeng_same_2_jiu','shaAfter')}else{this.addTempSkill('Shanbeng_same_3_jiu','shaAfter')};break;}
                    }
                };
            };

            game.Benghuai3("Benghuai3","崩坏3",{
                connect:true,
                character:{
                    character:{
                        Diuse_Shangxian:["female","qun",4,["Diuse_Xianfa","Diuse_Yinyang","Diuse_Tiandi"],[]],
                        Diuse_Fuhua:["female","qun",4,["Diuse_Shanbeng","Diuse_Xirang","Diuse_Xunxin"],[]],
                        Diuse_Bachongying:["female","qun",4,["Diuse_Luoying","Diuse_Yishan","Diuse_Renfan"],[]],
                        Diuse_Kalian:["female","qun",4,["Diuse_Wange","Diuse_Sangzhong","Diuse_Zhongqu"],[]],
                        Diuse_Xier:["female","qun",4,["Diuse_Anhong","Diuse_Diewu"],[]],
                        Diuse_Buluoniya:["female","qun",3,["Diuse_Guozai","Diuse_Chonggou","Diuse_Fuhe","Diuse_Yinmie"],[]],
                        Diuse_Shilv:["female","qun",4,["Diuse_Bingren","Diuse_Fanchen","Diuse_Zhejian"],[]],
                        Diuse_Yayi:["female","qun",4,["Diuse_Kongzhan","Diuse_Dianci","Diuse_Yvlei"],[]],
                        Diuse_Yuexia:["female","qun","1/4",['Diuse_Xueqi','Diuse_Shenshi','Diuse_Shoulie'],[]],
                        Diuse_Konglv:["female","qun",5,['Diuse_Qujian','Diuse_Yakong','Diuse_Xujie'],[]],
                        Diuse_Heixi:["female","qun",4,['Diuse_Mingan','Diuse_Baihei','Diuse_Danzhong'],[]],
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
                    },
                },
                perfectPair:{
                    Diuse_Xier:['Diuse_Buluoniya'],
                    Diuse_Kalian:['Diuse_Bachongying'],
                },
                characterTitle:{},
                characterReplace:{}, //切换版本
                game:{ //普通自定义函数
                    randomNum:function(num1,num2){
                        var num = Math.floor(Math.random() * (num1 - num2)) + 1;
                        return num;
                    },
                },
                skill:{
                    skill:{
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
                        Diuse_SP:{
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
                                        var randomNum=game.randomNum(100,0);
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
                                        var randomNum=game.randomNum(100,0);
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
                            content:function (event,player,targets)
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
                        Diuse_Guozai:{
                            audio:"ext:术樱:2",
                            enable:"phaseUse",
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
                            content:function(){
                                player.addMark('Diuse_Fuhe',player.hp);
                                player.storage.Fuhe_List=[]; //保护列表
                                player.storage.Fuhe_Hp=[];
                                player.storage.Fuhe_Buff=true; //SP技能 过载
                                player.storage.Fuhe_Damage=0; //过载计数
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
                            trigger:{player:"useCardToPlayered"},
                            filter:function(event,player){
                                return event.card.name=='sha'&&event.targets.length==1&&player.getExpansions('Diuse_Xunxin').length>0;
                            },
                            content:function (){
                                'step 0'
                                if(player.getExpansions('Diuse_Xunxin').length==1){
                                    player.chooseControl('一').set('prompt','请选择弃置的标记数量').set('ai',function(){return '一';});
                                } else if(player.getExpansions('Diuse_Xunxin').length<=2){
                                    player.chooseControl('一','二').set('prompt','请选择弃置的标记数量').set('ai',function(){
                                        var list=['一','二'].randomGet();
                                        return list;
                                    });
                                } else {
                                    player.chooseControl('一','二','三').set('prompt','请选择弃置的标记数量').set('ai',function(){
                                        var list=['一','二','三'].randomGet();
                                        return list;
                                    });
                                }
                                "step 1"
                                if(result.control=='一'){
                                    player.chooseCardButton('弃置一个标记',1,player.getExpansions('Diuse_Xunxin'),true);
                                } else if(result.control=='二'){
                                    player.chooseCardButton('弃置两个标记',2,player.getExpansions('Diuse_Xunxin'),true);
                                } else if(result.control=='三'){
                                    player.chooseCardButton('弃置三个标记',3,player.getExpansions('Diuse_Xunxin'),true);
                                }
                                "step 2"
                                if(result.links.length==3){
                                    if(result.links[result.links.length-1].name==result.links[result.links.length-2].name){ //第三个和第二个比
                                        if(result.links[result.links.length-1].name==result.links[result.links.length-3].name){ //如果三个全部相等
                                            player.shanbeng_same(3,result.links[result.links.length-1].name);
                                        } else { //两个相同
                                            player.shanbeng_same(2,result.links[result.links.length-1].name);
                                            player.shanbeng_same(1,result.links[result.links.length-3].name);
                                        }
                                    } else if(result.links[result.links.length-1].name==result.links[result.links.length-3].name){ //第三个和第一个比
                                        player.shanbeng_same(2,result.links[result.links.length-1].name);
                                        player.shanbeng_same(1,result.links[result.links.length-2].name);
                                    } else if(result.links[result.links.length-2].name==result.links[result.links.length-3].name){ //第二个和第一个比
                                        player.shanbeng_same(2,result.links[result.links.length-2].name);
                                        player.shanbeng_same(1,result.links[result.links.length-1].name);
                                    } else { //都不相同
                                        player.shanbeng_same(1,result.links[result.links.length-1].name);
                                        player.shanbeng_same(1,result.links[result.links.length-2].name);
                                        player.shanbeng_same(1,result.links[result.links.length-3].name);
                                    }
                                } else if(result.links.length==2){
                                    if(result.links[result.links.length-1].name==result.links[result.links.length-2].name){
                                        player.shanbeng_same(2,result.links[result.links.length-1].name);
                                    } else {
                                        player.shanbeng_same(1,result.links[result.links.length-1].name);
                                        player.shanbeng_same(1,result.links[result.links.length-2].name);
                                    }
                                } else {
                                    player.shanbeng_same(1,result.links[0].name);
                                }
                                'step 3'
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
                                        if(player.countCards('h')){
                                            player.draw();
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
                            trigger:{player:"phaseEnd",},
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
                                    trigger:{player:"phaseUseBefore",},
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
                            check:function(){
                                if(get.attitude(player,event.player)>0) return false;
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
                                            if(get.attitude(player,target)>=0){
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
                                    }
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
                                    trigger:{
                                        player:"useCardToPlayered",
                                    },
                                    frequent:true,
                                    sub:true,
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
                                    sub:true,
                                    direct:true,
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
                                    sub:true,
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
                                    forced:true,
                                    sub:true,
                                    filter:function(event){
                                        return event.nature=='thunder';
                                    },
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
                                    return 2-get.attitude(player,target);
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
                                    var randomNum=game.randomNum(100,0);
                                    if(randomNum>=50){
                                        game.playAudio('..','extension\\术樱','Diuse_Yakong_Buff3');
                                    } else {game.playAudio('..','extension\\术樱','Diuse_Yakong_Buff4');}
                                } else {
                                    player.draw();
                                    var randomNum=game.randomNum(100,0);
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
                                    var randnum=game.randomNum(num,0);
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
                                    if(player.storage.renge==undefined||player.storage.renge){
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

                                if(player.storage.renge==undefined||player.storage.renge){
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
                                    if(player.storage.renge==undefined||player.storage.renge) return num+2;
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
                                if(player.storage.renge==undefined||player.storage.renge){
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
                                        trigger.player.chooseControl('弃一张','摸一张').set('prompt','请选择弃1张手牌或令'+get.translation(player)+'摸1张牌').set('ai',function(){
                                            if(get.attitude(trigger.player,player)>=2) return '摸一张';
                                            return '弃一张';
                                        });
                                        event.baiBool=true;
                                        trigger.player.removeMark('Diuse_Bai',1);
                                    } else {
                                        trigger.player.chooseControl('摸一张').set('prompt','请选择弃1张手牌或令'+get.translation(player)+'摸1张牌').set('ai',function(){
                                            return '摸一张';
                                        });
                                        event.baiBool=true;
                                        trigger.player.removeMark('Diuse_Bai',1);
                                    }
                                } else if(trigger.player.countMark('Diuse_Hei')){
                                    player.draw();
                                    trigger.player.removeMark('Diuse_Hei',1);
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
                                if(player.storage.renge==false){
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
                                } else if(trigger.player.countMark('Diuse_Hei')){
                                    if(trigger.player.countCards('h')){
                                        player.chooseControl('弃一张','摸一张').set('prompt','请选择摸1张牌或令'+get.translation(trigger.player)+'弃1张牌').set('ai',function(){
                                            return '摸一张';
                                        });
                                    } else {
                                        player.chooseControl('摸一张').set('prompt','请选择摸1张牌或令'+get.translation(trigger.player)+'弃1张牌').set('ai',function(){
                                            return '摸一张';
                                        });
                                    }
                                    if(!trigger.player.isEmpty(2)){
                                        player.storage.Diuse_Hei++;
                                    }
                                    trigger.player.removeMark('Diuse_Hei',1);
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
                            filter:function(event,player){
                                return player.countMark('Diuse_SP')>=100;
                            },
                            content:function(){
                                if(player.hasSkill('Diuse_Mingan_End')) player.removeSkill('Diuse_Mingan_End');
                                if(player.storage.renge==undefined||player.storage.renge){
                                    game.playAudio('..','extension\\术樱','Diuse_Danzhong1');
                                    player.storage.renge=false;
                                    player.storage.liBool=true;
                                    player.removeMark('Diuse_SP',100);
                                    player.gainMaxHp();
                                    for(var i=0;i<game.players.length;i++){
                                        if(game.players[i]==player) continue;
                                        game.players[i].damage();
                                    }
                                } else {
                                    game.playAudio('..','extension\\术樱','Diuse_Danzhong2');
                                    player.storage.renge=true;
                                    player.storage.biaoBool=true;
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
                                        return player.storage.biaoBool;
                                    },
                                    content:function(){
                                        player.storage.biaoBool=false;
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
                                        return player.storage.liBool;
                                    },
                                    content:function(){
                                        player.storage.liBool=false;
                                        for(var i=0;i<game.players.length;i++){
                                            game.players[i].recover();
                                        }
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
                                        player.storage.liBool=false;
                                        player.storage.biaoBool=false;
                                        if(player.hasSkill('Diuse_Caidan_End')&&player.countMark('Diuse_SP')<100) player.removeSkill('Diuse_Caidan_End');  //移除彩蛋;
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
                        "Diuse_Xuesha_info":"你的回合内，有角色受到伤害后你可以摸一张牌并可以额外使用一张杀。",
                        Diuse_Diewu:"蝶舞",
                        "Diuse_Diewu_info":"出牌阶段限一次，你弃置一张红色牌并指定一名角色摸一张牌后可以使用一张杀（不计入出杀次数）。",
                        "Diuse_Xuesha2":"血杀",
                        Diuse_Anhong:"暗洪",
                        "Diuse_Anhong_info":"觉醒技。当你受到伤害前你可以摸一张牌，如果你受到伤害后的体力低于2则恢复一点体力；失去该技能并获得技能血杀。",
                        Diuse_Guozai:"过载",
                        "Diuse_Guozai_info":"SP技。出牌阶段消耗50SP开启过载状态且立刻将手牌摸至体力上限+护盾值的数量(最多为10)，期间你每次造成伤害的值+1且你与保护单位恢复1点体力，然后扣10SP。若你的SP为0或使用超过50SP则关闭过载状态。",
                        Diuse_Chonggou:"重构",
                        "Diuse_Chonggou_info":"每回合限一次，当你造成伤害时，你可以选择：1：弃置X张牌并摸X张牌（X为当前护盾值）2：使其获得其防具区的牌直至其准备阶段；然后取消对其即将造成的伤害。",
                        Diuse_Yinmie:"湮灭",
                        "Diuse_Yinmie_info":"每回合限一次，其他角色受到伤害前，若其防具区没有牌则你可以选择：1：使其摸两张牌然后该伤害+1；2：你弃置两张牌并使其进入保护名单。",
                        Diuse_Fuhe:"负荷",
                        "Diuse_Fuhe_info":"锁定技，游戏开始后，你获得当前体力值的物理护盾，你和保护单位受到物理伤害时优先扣除护盾；出牌阶段，若你的体力与上回合结束时无变化则将将护盾值充能至体力上限；回合结束时，你移除清空保护名单；你的手牌上限增加等量护盾值。",
                        Diuse_Wange:"挽歌",
                        "Diuse_Wange_info":"回合开始时限一次。你额外获得任意一个有益阶段执行；你翻面时你摸两张牌并恢复一点体力或获得技能鸦羽。",
                        Diuse_Sangzhong:"丧钟",
                        "Diuse_Sangzhong_info":"你于回合外受到伤害后，你可以摸一张牌。如果你没有手牌则改为摸两张；若该伤害大于2点则改为你可以摸一张牌或复原武将。如果你没有手牌则摸三张。",
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
                        "Diuse_Shanbeng_info":"当你使用杀指定唯一目标后，你可以弃置至多三张标记牌然后获得相应效果。",
                        Diuse_Xirang:"息壤",
                        "Diuse_Xirang_info":"锁定技，你始终跳过摸牌阶段；若你的摸牌阶段被跳过则你选择从牌堆顶摸两张或从牌堆底摸两张，然后从相反方向摸一张牌；当你使用【杀】【闪】【桃】【酒】时，若你没有对应标记则摸一张牌并获得相应标记；弃牌阶段开始时，若你的当前手牌小于等于当前体力值且有标记则可以摸X张牌再弃置X/2张牌和移除标记（X为标记【杀】【闪】【桃】【酒】的数量；X向下取整且最少为1）",
                        Diuse_Xunxin:"迅心",
                        "Diuse_Xunxin_info":"锁定技。当你受到一点伤害后你摸一张牌并选择一张手牌弃置；你的牌因弃置而进入弃牌堆的【杀】【闪】【桃】【酒】会放置‘岚’中。",
                        Diuse_Xianfa:"仙法",
                        "Diuse_Xianfa_info":"回合结束后，你可以指定至多X名其他角色，然后其进入‘相引’状态，你的出牌阶段开始前会移除全场的‘相引’(X为你装备栏的空位且至多为3) 相引：你体力值或上限发生变化后场上拥有‘相引’发生相同变化随后移除技能。",
                        Diuse_Yinyang:"阴阳",
                        "Diuse_Yinyang_info":"每回合限一次。当你使用牌指定唯一其他角色目标后你可以执行以下效果：若你武器区为空则弃置其一张牌；若你防具区为空则其获得元素易伤直至其回合开始前；若均为空或均不为空则你摸一张牌。",
                        Diuse_Tiandi:"天地",
                        Diuse_Tiandi_A:"天地",
                        Diuse_Tiandi_B:"天地",
                        "Diuse_Tiandi_info":"锁定技，若你的武器区为空则出杀次数上限+1，若两个均为空则手牌上限+2，进入濒死后限一次，你将体力回复至1点并修改仙法：出牌阶段开始时不会再移除全场‘相引’；准备阶段，若你的防具区为空或武器区与防具区均不为空则你可以摸一张牌；结束阶段。你可以将本回合的天地效果给一名其他角色。",
                        Diuse_Yifa:"相引",//原仪法
                        //"Diuse_Yifa_info":"每轮限一次。你选择一名角色随机临时获得崩坏包的一个角色的技能，如果目标不是自己则摸两张牌。主公技，限定技，觉醒技除外。",
                        //"Diuse_Yinyang1":"阴",
                        //"Diuse_Yinyang2":"阳",
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
                        Diuse_Wu_info:"出牌阶段限一次，当你使用可造成伤害的牌指定目标后你可以选择其一个目标然后你摸X张牌。(X为目标当前体力且最多为5)",
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
                        Diuse_Qujian:"区间",
                        Diuse_Shikong:"时空区间",
                        Diuse_Qujian_info:"锁定技，你打出或使用【闪】后，若场上没有'时空'标记则选择一名其他角色令其获得1个'时空'标记。有标记的角色暂时失去其武将牌上的技能和无法使用或打出手牌，且受到伤害时改为获得等量'时空'标记，然后你回复35sp和1个'亚空'标记。其出牌阶段开始时移除标记并受到你造成的X点伤害（X为（标记数量-1）/2且向下取整）",
                        Diuse_Yakong:"亚空",
                        Diuse_Yakong_Buff:"亚空",
                        Diuse_Yakong_info:"锁定技。你造成伤害后且不处于激活状态下则获得一个'空'标记。准备阶段若标记不小于3则你可以激活技能并将手牌补至前体力(最多补至5)，使用牌时根据类型执行以下效果：1，非攻击类型：你摸一张牌，2：攻击类型：该牌造成的伤害+1。然后你移除1个标记。",
                        Diuse_Xujie:"虚界",
                        Diuse_Xujie_info:"SP技。出牌阶段，你可以消耗125SP。你对除你之外的角色造成X点伤害（X为场上角色体力之和÷角色数量 且向下取整至少为1）然后你获得10个'亚空'标记。",
                        Diuse_Mingan:"明光/暗影",
                        Diuse_Mingan_info:"出牌阶段限一次，你可以将一张手牌放置牌堆底并摸一张牌(若你没有手牌则改为摸两张)然后执行以下效果：表人格：回复1点体力；里人格：视为打出一张杀",
                        Diuse_Baihei:"白昼/黑夜",
                        Diuse_Bai:"白昼",
                        Diuse_Hei:"黑夜",
                        Diuse_Baihei_info:"锁定技，你对其他角色造成伤害后若其没有标记则其获得一个标记，若有标记则执行以下效果：若当前形态与标记不相对则你摸一张牌；表标记: 其选择你摸一张牌或其弃置一张手牌, 若其防具区没有牌则你移动场上的一张牌  里标记: 你选择你摸一张牌或其弃置一张手牌, 若其防具区有牌则你出杀次数上限+1。表人格手牌上限+2 里人格体力上限+1",
                        Diuse_Danzhong:"诞生/终末",
                        Diuse_Danzhong_info:"SP技，出牌阶段，你可以消耗100SP，重置【明光/暗影】技能次数并转换表/里人格并造成不同的效果：转换里人格时：对全场其他角色造成1点伤害，若有角色在此回合内阵亡，则场上角色回复1点体力。转换表人格时：全场角色摸1张牌，此回合结束时 若有其他角色手牌数大于当前体力值，则你对其造成1点伤害"
                    },
                },
            },"术樱");
        }

        if(lib.config.extension_术樱_tianshuoff&&lib.config.mode=='boss'){
            game.Tianshu=function(英文名,翻译名,obj,扩展包名){
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

                lib.element.player.playerHpMax=function(){ //判断敌对最大体力的角色但不是唯一
                    var listHp=[],listName=[];
                    for(var i=0;i<game.players.length;i++){
                        if(game.players[i].isOut()||game.players[i]==this) continue;
                        if(!game.players[i].isFriendOf(this)){
                            listName.push(game.players[i]);
                            listHp.push(game.players[i].hp);
                        }
                    }
                    if(listName.length==1) return listName[0];
                    for(var i=listHp.length-1;i>0;i--){
                        if(listHp[0]<listHp[i]){
                            var num=listHp[0];
                            listHp[0]=listHp[i];
                            listHp[i]=num;
                            var num1=listName[0];
                            listName[0]=listName[i];
                            listName[i]=num1;
                        }
                    }
                    return listName[0];
                };

                lib.element.player.playerCardMax=function(){ //判断敌对最多手牌的角色但不是唯一
                    var listName=[],listCard=[];
                    for(var i=0;i<game.players.length;i++){
                        if(game.players[i].isOut()||game.players[i]==this) continue;
                        if(!game.players[i].isFriendOf(this)){
                            listName.push(game.players[i]);
                            listCard.push(game.players[i].countCards('h'));
                        }
                    }
                    if(listName.length==1) return listName[0];
                    for(var i=listCard.length-1;i>0;i--){
                        if(listCard[0]<listCard[i]){
                            var num=listCard[0];
                            listCard[0]=listCard[i];
                            listCard[i]=num;
                            var num1=listName[0];
                            listName[0]=listName[i];
                            listName[i]=num1;
                        }
                    }
                    return listName[0];
                };

                lib.element.player.damagePlayerHp=function(hp,mission){ //对体力值 大于 或 等于 你的角色造成hp点伤害 mission难度
                    var player=_status.event.player;
                    if(hp==undefined){hp=1;} //防止忘填写 或 默认1
                    for(var i=0;i<game.players.length;i++){
                        if(game.players[i].isOut()||game.players[i]==this) continue;
                        if(!game.players[i].isFriendOf(this)){
                            if(mission==3){
                                if(game.players[i].hp>=player.hp){
                                    game.players[i].damage(hp);
                                    break;
                                }
                            } else {
                                if(game.players[i].hp>player.hp){
                                    game.players[i].damage(hp);
                                    break;
                                }
                            }
                        }
                    }
                };

                lib.element.player.playerRandom=function(){ //随机一名敌对角色
                    var listName=[];
                    for(var i=0;i<game.players.length;i++){
                        if(game.players[i].isOut()||game.players[i]==this) continue;
                        if(!game.players[i].isFriendOf(this)){
                            listName.push(game.players[i]);
                        }
                    }
                    return listName.randomGet();
                }

                lib.element.player.gameBossDie=function(num,num2,num3){ //判断天书相应关卡boss是否阵亡和转移Boss控制权
                    for(var i=0;i<game.players.length;i++){
                        if(game.players[i]==this) continue;
                        var nextBoss=game.players[i].bossName(num,num2);
                        if(nextBoss) {
                            if(num3) {
                                _status.gameMe=true;
                                game.players[i]._trueMe=game.me;
                            }
                            return true;
                        }
                    }
                    return false;
                };

                lib.element.player.bossName=function(num,a){ //全部boss 可以用于调用和匹配boss
                    if(a==undefined) a=-99;
                    var liveList=['Xvni_Xiaotao','Xvni_Xiaosha','Xvni_Xiaojiu','Xvni_Xiaoshan','Xvni_Xiaole'];
                    /*var oneList=['Shengxiao_Zishu','Zhuogui_Boss_Heibaiwuchang'];*/
                    var oneList=['Shengxiao_Zishu','Shengxiao_Chouniu','Shengxiao_Yinhu','Shengxiao_Maotu','Shengxiao_Chenlong','Shengxiao_Sishe','Shengxiao_Wuma','Shengxiao_Weiyang','Shengxiao_Shenhou','Shengxiao_Youji','Shengxiao_Xvgou','Shengxiao_Haizhu',
                'Nianshou_Dawei','Nianshou_Dashu','Nianshou_Dawu','Nianshou_Daqun','Xishou_Dawei','Xishou_Dashu','Xishou_Dawu','Xishou_Daqun'];
                    var twoOrdinaryList=['Zhuogui_Boss_Baowei','Zhuogui_Boss_Heibaiwuchang','Zhuigui_Boss_Huangfeng','Zhuogui_Boss_Yvsai','Zhuogui_Boss_Niutoumamian','Zhuogui_Boss_Niaozui'];
                    var twoDifficultyList=['Zhuogui_Boss_Baowei_Difficulty','Zhuogui_Boss_Heibaiwuchang_Difficulty','Zhuigui_Boss_Huangfeng_Difficulty','Zhuogui_Boss_Yvsai_Difficulty','Zhuogui_Boss_Niutoumamian_Difficulty','Zhuogui_Boss_Niaozui_Difficulty'];
                    var twoFuckingList=['Zhuogui_Boss_Baowei_Fucking','Zhuogui_Boss_Heibaiwuchang_Fucking','Zhuigui_Boss_Huangfeng_Fucking','Zhuogui_Boss_Yvsai_Fucking','Zhuogui_Boss_Niutoumamian_Fucking','Zhuogui_Boss_Niaozui_Fucking'];
                    var threeOrdinaryList=['Qingqing_Boss_Dongzhuo','Qingqing_Boss_Yuanshu','Qingqing_Boss_Lvbu','Qingqing_Boss_Simayi','Qingqing_Boss_Caocao','Qingqing_Boss_Zhangjiao'];
                    var threeDifficultyList=['Qingqing_Boss_Dongzhuo_Difficulty','Qingqing_Boss_Yuanshu_Difficulty','Qingqing_Boss_Lvbu_Difficulty','Qingqing_Boss_Simayi_Difficulty','Qingqing_Boss_Caocao_Difficulty','Qingqing_Boss_Zhangjiao_Difficulty'];
                    var threeFuckingList=['Qingqing_Boss_Dongzhuo_Fucking','Qingqing_Boss_Yuanshu_Fucking','Qingqing_Boss_Lvbu_Fucking','Qingqing_Boss_Simayi_Fucking','Qingqing_Boss_Caocao_Fucking','Qingqing_Boss_Zhangjiao_Fucking'];
                    var fourOrdinaryList=['Tianshu_Boss_Xuannv','Tianshu_Boss_Hanba','Zhuigui_Boss_Yanluowang','Tianshu_Boss_Shaohao','Longzhou_Boss_Taoshen',
                    'Longzhou_Boss_Caoe','Tianshu_Boss_Shuishengonggong','Tianshu_Boss_Huoshenzhurong','Tianshu_Boss_Kuafu','Tianshu_Boss_Baiqi'];
                    var fourDifficultyList=['Tianshu_Boss_Xuannv_Difficulty','Tianshu_Boss_Hanba_Difficulty','Zhuigui_Boss_Yanluowang_Difficulty','Tianshu_Boss_Shaohao_Difficulty',
                    'Longzhou_Boss_Taoshen_Difficulty','Longzhou_Boss_Caoe_Difficulty','Tianshu_Boss_Shuishengonggong_Difficulty','Tianshu_Boss_Huoshenzhurong_Difficulty','Tianshu_Boss_Kuafu_Difficulty','Tianshu_Boss_Baiqi_Difficulty'];
                    var fourFuckingList=['Tianshu_Boss_Xuannv_Fucking','Tianshu_Boss_Hanba_Fucking','Zhuigui_Boss_Yanluowang_Fucking','Tianshu_Boss_Shaohao_Fucking','Longzhou_Boss_Taoshen_Fucking',
                    'Longzhou_Boss_Caoe_Fucking','Tianshu_Boss_Shuishengonggong_Fucking','Tianshu_Boss_Huoshenzhurong_Fucking','Tianshu_Boss_Kuafu_Fucking','Tianshu_Boss_Baiqi_Fucking'];
                    var Longzhoulist=['Longzhou_Boss_Taoshen','Longzhou_Boss_Taoshen_Difficulty','Longzhou_Boss_Taoshen_Fucking','Longzhou_Boss_Caoe','Longzhou_Boss_Caoe_Difficulty','Longzhou_Boss_Caoe_Fucking'];
                    var Newlist;
                    
                    if(lib.config.extension_术樱_tianshuaddoff&&lib.config.extension_术樱_tianshu_add_list!=undefined&&lib.config.extension_术樱_tianshu_add_list!=''){
                        Newlist=lib.config.extension_术樱_tianshu_add_list.split(",");
                    }

                    if(_status.Diuse_NewBoss){
                        num=[-2,-3,-4].randomGet();
                    }


                    switch(num){
                        case 0:{
                            for(var i=0;i<liveList.length;i++){
                                if(this.name==liveList[i]) return true;
                            }
                            return false;
                        }
                        case 1:{
                            for(var i=0;i<oneList.length;i++){
                                if(this.name==oneList[i]) return true;
                            }
                            return false;
                        }
                        case 2:{
                            if(a==1){
                                for(var i=0;i<twoOrdinaryList.length;i++){
                                    if(this.name==twoOrdinaryList[i]) return true;
                                }
                                return false;
                            } else if(a==2){
                                for(var i=0;i<twoDifficultyList.length;i++){
                                    if(this.name==twoDifficultyList[i]) return true;
                                }
                                return false;
                            } else {
                                for(var i=0;i<twoFuckingList.length;i++){
                                    if(this.name==twoFuckingList[i]) return true;
                                }
                                return false;
                            }
                        }
                        case 3:{
                            if(a==1){
                                for(var i=0;i<threeOrdinaryList.length;i++){
                                    if(this.name==threeOrdinaryList[i]) return true;
                                }
                                return false;
                            } else if(a==2){
                                for(var i=0;i<threeDifficultyList.length;i++){
                                    if(this.name==threeDifficultyList[i]) return true;
                                }
                                return false;
                            } else {
                                for(var i=0;i<threeFuckingList.length;i++){
                                    if(this.name==threeFuckingList[i]) return true;
                                }
                                return false;
                            }
                        }
                        case 4:{
                            if(a==1){
                                for(var i=0;i<fourOrdinaryList.length;i++){
                                    if(this.name==fourOrdinaryList[i]) return true;
                                }
                                return false;
                            } else if(a==2){
                                for(var i=0;i<fourDifficultyList.length;i++){
                                    if(this.name==fourDifficultyList[i]) return true;
                                }
                                return false;
                            } else {
                                for(var i=0;i<fourFuckingList.length;i++){
                                    if(this.name==fourFuckingList[i]) return true;
                                }
                                return false;
                            }
                        }
                        case 5:{
                            if(Newlist==''||Newlist==undefined) return false;
                            for(var i=0;i<Newlist.length;i++){
                                if(this.name==Newlist[i]) return true;
                            }
                            return false;
                        }
                        case 255:{
                            for(var i=0;i<Longzhoulist.length;i++){
                                if(this.name==Longzhoulist[i]) return true;
                            }
                            return false;
                        }
                        case -1:{
                            var newBoss=oneList.randomGet();
                            for(var i=0;i<game.players.length;i++){
                                if(newBoss==game.players[i].name){
                                    newBoss=oneList.randomGet();
                                    i=0;
                                }
                            }
                            return newBoss;
                        }
                        case -2:{
                            if(a==1){
                                var newBoss=twoOrdinaryList.randomGet();
                                for(var i=0;i<game.players.length;i++){
                                    if(newBoss==game.players[i].name){
                                        newBoss=twoOrdinaryList.randomGet();
                                        i=0;    
                                    }
                                }
                                return newBoss;
                            } else if(a==2){
                                var newBoss=twoDifficultyList.randomGet();
                                for(var i=0;i<game.players.length;i++){
                                    if(newBoss==game.players[i].name){
                                        newBoss=twoDifficultyList.randomGet();
                                        i=0;
                                    }
                                }
                                return newBoss;
                            } else {
                                var newBoss=twoFuckingList.randomGet();
                                for(var i=0;i<game.players.length;i++){
                                    if(newBoss==game.players[i].name){
                                        newBoss=twoFuckingList.randomGet();
                                        i=0;
                                    }
                                }
                                return newBoss;
                            }
                        }
                        case -3:{
                            if(a==1){
                                var newBoss=threeOrdinaryList.randomGet();
                                for(var i=0;i<game.players.length;i++){
                                    if(newBoss==game.players[i].name){
                                        newBoss=threeOrdinaryList.randomGet();
                                        i=0;
                                    }
                                }
                                return newBoss;
                            } else if(a==2){
                                var newBoss=threeDifficultyList.randomGet();
                                for(var i=0;i<game.players.length;i++){
                                    if(newBoss==game.players[i].name){
                                        newBoss=threeDifficultyList.randomGet();
                                        i=0;
                                    }
                                }
                                return newBoss;
                            } else {
                                var newBoss=threeFuckingList.randomGet();
                                for(var i=0;i<game.players.length;i++){
                                    if(newBoss==game.players[i].name){
                                        newBoss=threeFuckingList.randomGet();
                                        i=0;
                                    }
                                }
                                return newBoss;
                            }
                        }
                        case -4:{
                            if(a==1){
                                var newBoss=fourOrdinaryList.randomGet();
                                for(var i=0;i<game.players.length;i++){
                                    if(newBoss==game.players[i].name){
                                        newBoss=fourOrdinaryList.randomGet();
                                        i=0;
                                    }
                                }
                                return newBoss;
                            } else if(a==2){
                                var newBoss=fourDifficultyList.randomGet();
                                for(var i=0;i<game.players.length;i++){
                                    if(newBoss==game.players[i].name){
                                        newBoss=fourDifficultyList.randomGet();
                                        i=0;
                                    }
                                }
                                return newBoss;
                            } else {
                                var newBoss=fourFuckingList.randomGet();
                                for(var i=0;i<game.players.length;i++){
                                    if(newBoss==game.players[i].name){
                                        newBoss=fourFuckingList.randomGet();
                                        i=0;
                                    }
                                }
                                return newBoss;
                            }
                        }
                        case -5:{
                            if(Newlist==''||Newlist==undefined||Newlist.length==1){
                                alert('请检查Boss列表或只有一位Boss，即将重启');
                                setTimeout(function(){
                                    setTimeout(game.reload,1500);
                                }, 1500);
                            }
                            var newBoss=Newlist.randomGet();
                            for(var i=0;i<game.players.length;i++){
                                if(newBoss==game.players[i].name){
                                    newBoss=Newlist.randomGet();
                                    i=0;
                                }
                            }
                            return newBoss;
                            // if(lib.config.extension_术樱_randomoff){
                            //     if(Newlist==''||Newlist==undefined||Newlist.length==1){
                            //         _status.Diuse_NewBoss=true;
                            //         game.bossName(0,0,a);
                            //     }
                            //     var newBoss=Newlist.randomGet();
                            //     for(var i=0;i<game.players.length;i++){
                            //         if(newBoss==game.players[i].name){
                            //             newBoss=Newlist.randomGet();
                            //             i=0;
                            //         }
                            //     }
                                
                            // } else {

                            // }
                        }
                        default:{return false}
                    }
                };

            };

            game.Tianshu("Tianshu","天书乱斗",{
                character:{
                    character:{
                        Boss_Diuse_Tianshu:["male","",0,["Boss_Tianshu_Go","Boss_Diuse_Tianshu_intro1","Boss_Diuse_Tianshu_intro2","Boss_Diuse_Tianshu_intro3","Boss_Diuse_Tianshu_intro4","Boss_Diuse_Tianshu_intro5"],["boss"],"qun"],
                        

                        //beta:['male','qun',7,['Xingfa','Miaoping'],['qun']],

                        // Boss_Ordinary_Hankui:['female','shen',10,['boss_shenyi','Tianshu_Boss_Ordinary_Chiyan','Tianshu_Boss_Ordinary_Fali','Tianshu_Ordinary_Hankui_Die'],['qun','hiddenboss','bossallowed']],
                        // Boss_Difficulty_Hankui:['female','shen',13,['boss_shenyi','Tianshu_Boss_Difficulty_Chiyan','Tianshu_Boss_Difficulty_Fali','Tianshu_Difficulty_Hankui_Die'],['qun','hiddenboss','bossallowed']],
                        // Boss_Fucking_Hankui:['female','shen',15,['boss_shenyi','Tianshu_Boss_Chiyan','Tianshu_Boss_Fali','Tianshu_Boss_Shangshi','Tianshu_Fucking_Hankui_Die'],['qun','hiddenboss','bossallowed']],
                        // Boss_Ordinary_Baiqi:['male','shen',13,['boss_shenyi','boss_zhue','Tianshu_Boss_Tusha','Tianshu_Ordinary_Baiqi_Die'],['qun','hiddenboss','bossallowed']],
                        // Boss_Difficulty_Baiqi:['male','shen',16,['boss_shenyi','boss_zhue','Tianshu_Boss_Shangshi','Tianshu_Boss_Rentu_1','Tianshu_Boss_Tusha','Tianshu_Difficulty_Baiqi_Die'],['qun','hiddenboss','bossallowed']],
                        // Boss_Fucking_Baiqi:['male','shen',18,['boss_shenyi','boss_zhue','Tianshu_Boss_Shangshi','Tianshu_Boss_Tusha','Tianshu_Boss_Rentu','Tianshu_Fucking_Baiqi_Die'],['qun','hiddenboss','bossallowed']],
                        // Boss_Ordinary_WangshenBaiqi:['male','shen',3,['boss_shenyi','Tianshu_Boss_Tusha','Tianshu_Boss_Wangshen','Tianshu_Boss_Ordinary_Bumie','Tianshu_Ordinary_WangshenBaiqi_Die'],['qun','hiddenboss','bossallowed']],
                        // Boss_Difficulty_WangshenBaiqi:['male','shen',4,['boss_shenyi','Tianshu_Boss_Shangshi','Tianshu_Boss_Difficulty_Shashen','Tianshu_Boss_Difficulty_Bumie','Tianshu_Difficulty_WangshenBaiqi_Die'],['qun','hiddenboss','bossallowed']],
                        // Boss_Fucking_WangshenBaiqi:['male','shen',5,['boss_shenyi','Tianshu_Boss_Shangshi','Tianshu_Boss_Tusha','Tianshu_Boss_Wangshen','Tianshu_Boss_Fucking_Bumie','Tianshu_Fucking_WangshenBaiqi_Die','Tianshu_Boss_Fucking_Shashen'],['qun','hiddenboss','bossallowed']],
                        // Boss_Ordinary_Guiyanwang:['male','shen',8,['boss_shenyi','Tianshu_Boss_Difu','Tianshu_Boss_Tiemian'],['qun','hiddenboss','bossallowed']],
                        // Boss_Difficulty_Guiyanwang:['male','shen',16,['boss_shenyi','Tianshu_Boss_Difu','Tianshu_Boss_Tiemian'],['qun','hiddenboss','bossallowed']],
                        // Boss_Fucking_Guiyanwang:['male','shen',25,['boss_shenyi','Tianshu_Boss_Difu','Tianshu_Boss_Tiemian'],['qun','hiddenboss','bossallowed']],
            
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
            
                        Xvni_Xiaosha:["female","qun",4,['Diuse_Xvni_Xiaosha_Guisha','Diuse_Xvni_Xiaosha_Zhuli','Diuse_Xvni_Xvxiang','checkPoint'],['qun','hiddenboss','bossallowed']],
                        Xvni_Xiaoshan:["female","qun",4,['Diuse_Xvni_Xiaoshan_Shanwu','Diuse_Xvni_Xiaoshan_Xianli','Diuse_Xvni_Xvxiang','checkPoint'],['qun','hiddenboss','bossallowed']],
                        Xvni_Xiaojiu:["female","qun",4,['Diuse_Xvni_Xiaojiu_Meiniang','Diuse_Xvni_Xiaojiu_Yaoli','Diuse_Xvni_Xvxiang','checkPoint'],['qun','hiddenboss','bossallowed']],
                        Xvni_Xiaotao:["female","qun",4,['Diuse_Xvni_Xiaotao_TaoYan','Diuse_Xvni_Xiaotao_Yanli','Diuse_Xvni_Xvxiang','checkPoint'],['qun','hiddenboss','bossallowed']],
                        Xvni_Xiaole:["female","qun",4,['Diuse_Xvni_Xiaole_Leyv','Diuse_Xvni_Xiaole_Yuanli','Diuse_Xvni_Xvxiang','checkPoint'],['qun','hiddenboss','bossallowed']],
            
                        //Boss_Diuse_Tianshu1:["male","",0,["Boss_Tianshu_Go","Boss_Diuse_Tianshu_intro1","Boss_Diuse_Tianshu_intro2","Boss_Diuse_Tianshu_intro3","Boss_Diuse_Tianshu_intro4","Boss_Diuse_Tianshu_intro5"],["boss"],"qun"],
                    },
                    translate:{
                        Boss_Diuse_Tianshu:"天书乱斗",
            
                        beta:"测试将",

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
                    reserveDead:true,
                    getSkillDialog:function(skills,prompt){ //GUI
                        var dialog=ui.create.dialog('hidden','forcebutton');
                        if(prompt) dialog.addText(prompt);
                        for(var i=0;i<skills.length;i++){
                            dialog.add('<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【'+get.translation(skills[i])+'】</div><div>'+lib.translate[skills[i]+'_info']+'</div></div>');
                        }
                        dialog.addText(' <br> ');
                        return dialog;
                    },
                    skillsList:function(){ //普通技能
                        var skills=[];
                        var banned=[
                            'huoxin','jueqing','qinqing','beige','huashen','drlt_zhiti','olzhiti'
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
                    zhuSkillsList:function(){ //主动技能
                        var skills=[];
                        var banned=[
                            'huoxin','jueqing','qinqing','beige','huashen','drlt_zhiti','olzhiti'
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
                    beiSkillsList:function(){ //被动技能
                        var skills=[];
                        var banned=[
                            'huoxin','jueqing','qinqing','beige','huashen','drlt_zhiti','olzhiti'
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
                    hpAndH:function(Hp,Pai){ //全体角色给体力和牌
                        var dnum=0;
                        var dead=game.dead.slice(0);
                        for(var i=0;i<dead.length;i++){
                            if(!dead[i].side&&dead[i].maxHp>0/*&&dead[i].parentNode==game.players[i].parentNode*/){
                                if(dead[i].bossName(0)) continue;
                                dead[i].revive(dead[i].maxHp);
                                dnum++;
                            }
                        }
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i].side) continue;
                            game.players[i].hujia=0;
                            //game.players[i].classList.remove('turnedover');
                            //game.players[i].removeLink();
                            game.players[i].recover(Hp);
                            game.players[i].draw(Pai);
                        }
                    },
                    cardsNumberUpDate:function(){ //刷新牌堆
                        var cards=get.cards(ui.cardPile.childElementCount+1);
                        for(var i=0;i<cards.length;i++){
                            ui.cardPile.insertBefore(cards[i],ui.cardPile.childNodes[get.rand(ui.cardPile.childElementCount)]);
                        }
                        game.updateRoundNumber();
                    },
                    taskNum:function(numTask,taskList){ //弃用
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
                    numRandom:function(){ //随机1到100
                        var num = Math.floor(Math.random() * (100 - 1)) + 1;
                        return num;
                    },
                    randomNum:function(Max,Min){ //随机 上限 到 下限
                        var num = Math.floor(Math.random() * (Max - Min)) + 1;
                        return num;
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
                    tianshuNewBoss:function(nextName,checkPoint,livePlayer){ //重置回合等  天书调用
                        while(_status.event.name!='phaseLoop'){
                            _status.event=_status.event.parent;
                        }
                        if(nextName.bossName(0,0)) nextName=game.boss;
                        if(nextName.bossName(checkPoint,livePlayer)) nextName=game.boss;
                        game.resetSkills();
                        _status.paused=false;
                        _status.event.player=nextName;
                        _status.event.step=0;
                        _status.roundStart=nextName;
                        game.phaseNumber=0;
                        game.roundNumber=0;
                        return 0;
                    },
                    changeSeatNew:function(){ //BETA
                        if(game.me==game.boss){
                            game.boss.changeSeat(0);
                            game.boss.nextSeat.changeSeat(2);
                            game.boss.nextSeat.nextSeat.changeSeat(3);
                            game.boss.nextSeat.nextSeat.nextSeat.changeSeat(4);
                            game.boss.previousSeat.changeSeat(7);
                            game.boss.previousSeat.previousSeat.changeSeat(6);
                        }
                    },
                    showPop:function(){ //九子真言 全局函数 现没有用
                        SkillList=['Boss_Diuse_Nine_Lin','Boss_Diuse_Nine_Bing','Boss_Diuse_Nine_Dou','Boss_Diuse_Nine_Zhe','Boss_Diuse_Nine_Jie','Boss_Diuse_Nine_Zhen','Boss_Diuse_Nine_Lie','Boss_Diuse_Nine_Qian','Boss_Diuse_Nine_Xing'];
                        for(var i=0;i<game.players.length;i++){
                            for(var j=0;j<SkillList.length;j++){
                                game.players[i].removeSkill(SkillList[j]);
                            }
                        }
                        var type=get.rand(1,9);
                        var type=5;
                        game.me.$fullscreenpop('九字真言·'+['临','兵','斗','者','皆','阵','列','前','行'][type-1],get.groupnature('raw'));
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
                        },
                        loopFirst:function(){
                            return game.boss.nextSeat;
                        },
                        checkResult:function(player){
                            return false;
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
                        Boss_Nine_Skills:{
                            mode:['boss'],
                            trigger:{global:'roundStart'},
                            forced:true,
                            filter:function(event,player){
                                return(player==game.boss)
                            },
                            content:function(){
                                game.showPop();
                            },
                        },
                        livePlayer:{
                            mode:['boss'],
                            marktext:"度",
                            mark:true,
                            intro:{
                                content:function(event,player){
                                    if(player.countMark('livePlayer')==undefined||player.countMark('livePlayer')==0){
                                        return '难度暂未选择';
                                    } else if(player.countMark('livePlayer')==1){
                                        return '简单难度';
                                    } else if(player.countMark('livePlayer')==2){
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
                                    default:{
                                        livelist=livelist.randomGet();
                                        break;
                                    }
                                }
                                var forBool=false;
                                var newSeat=6;
                                "step 0"
                                if(game.me==game.boss){
                                    //game.boss.changeSeat(2);
                                    game.boss.nextSeat.nextSeat.changeSeat(3);
                                    if(game.boss.previousSeat.bossName(0)){ 
                                        game.boss.previousSeat.previousSeat.changeSeat(4);
                                    } else {
                                        game.boss.previousSeat.changeSeat(4);
                                    }
                                    newSeat=7;
                                }
                                var fellow=game.addFellow(newSeat,livelist,'zoominanim');
                                fellow.side=player.side;
                                //fellow.classList.add('turnedover');
                                event.source=fellow;
                                if(fellow.hasSkillTag('noPhaseDelay')||event.delay===false){fellow.noPhaseDelay=true;}
                                "step 1"
                                event.trigger('fellow');
                                event.result=event.source;
                                game.players[0].chooseControl('普通','困难','阴间');
                                "step 2"
                                livelist=['Xvni_Xiaotao','Xvni_Xiaosha','Xvni_Xiaojiu','Xvni_Xiaoshan','Xvni_Xiaole'];
                                if(result.control=='普通'){
                                    player.addMark('livePlayer',1);
                                    for(var i=0;i<game.players.length;i++){
                                        for(var j=0;j<livelist.length;j++){
                                            if(game.players[i].name==livelist[j]){
                                                game.players[i].addMark('livePlayer',1);
                                                forBool=true;
                                                break;
                                            } 
                                        }
                                        if(forBool) break;
                                    }
                                    _status.noswap=true;
                                    game.addVideo('reinit2',player,player.name);
                                } else if(result.control=='困难'){
                                    player.addMark('livePlayer',2);
                                    for(var i=0;i<game.players.length;i++){
                                        for(var j=0;j<livelist.length;j++){
                                            if(game.players[i].name==livelist[j]){
                                                game.players[i].addMark('livePlayer',2);
                                                forBool=true;
                                                break;
                                            } 
                                        }
                                        if(forBool) break;
                                    }
                                    _status.noswap=true;
                                    game.addVideo('reinit2',player,player.name);
                                } else {
                                    player.addMark('livePlayer',3);
                                    for(var i=0;i<game.players.length;i++){
                                        for(var j=0;j<livelist.length;j++){
                                            if(game.players[i].name==livelist[j]){
                                                game.players[i].addMark('livePlayer',3);
                                                forBool=true;
                                                break;
                                            }
                                        }
                                        if(forBool) break;
                                    }
                                    _status.noswap=true;
                                    game.addVideo('reinit2',player,player.name);
                                }
                            },
                        },
                        nextCheckPoint:{
                            marktext:"D",
                            mark:true,
                            intro:{content:function(event,player){
                                return '即将开始下一关...'
                            },},
                            locked:true,
                        },
                        checkPoint:{
                            mode:['boss'],
                            marktext:"关",
                            mark:true,
                            intro:{content:function(event,player){
                                return "第"+player.countMark('checkPoint')+'关';
                            },},
                            locked:true,
                            trigger:{global:["dieAfter","gameDrawAfter"]},
                            forced:true,
                            popup:false,
                            fixed:true,
                            unique:true,
                            filter:function(event,player){
                                if(!player.bossName(0,0)) return false;
                                if(event.player.bossName(0)) return false;
                                if(player.countMark('checkPoint')==undefined||player.countMark('checkPoint')==0){
                                    return true;
                                } else if(player.countMark('checkPoint')&&player.countMark('livePlayer')){
                                    return true;
                                }
                                return false;
                            },
                            content:function(){
                                var list=[];
                                event.Diuse_Player;
                                if(event.Diuse_Player==undefined) event.Diuse_Player = 0;
                                var newSeat=5;
                                if(game.me==game.boss) newSeat=6;
                                var num3=lib.config.extension_术樱_tianshu_new;
                                'step 0'
                                var num=player.countMark('checkPoint');
                                var num2=player.countMark('livePlayer');
                                if(num==undefined||num==0){ //开始时召唤BOSS
                                    player.addMark('checkPoint',1);　
                                    for(var i=0;i<game.players.length;i++){
                                        if(game.players[i]==game.boss){　
                                            var name=player.bossName(-1);
                                            game.players[i].init(name);
                                        } else {
                                            game.players[i].addSkill('Tianshu_Protect');
                                        }
                                    }
                                    var name1=player.bossName(-1);
                                    game.addBossFellow(newSeat,name1);
                                } else if(num==1){ //第一关阵亡判断
                                    var nextCheckPoint1=trigger.player.bossName(num,num2); //判断阵亡BOSS是否属于BOSS列表
                                    if(nextCheckPoint1){ //如果是
                                        trigger.player.hide(); //隐藏 和 奖励
                                        if(trigger.source!=undefined&&trigger.source.hp!=trigger.source.maxHp){trigger.source.recover();}else if(trigger.source!=undefined){trigger.source.draw(2);}
                                        var gameBoss=trigger.player.gameBossDie(num,num2); //判断关卡BOSS是否阵亡
                                        if(gameBoss==false){ //如果返回False 说明阵亡
                                            player.addMark('nextCheckPoint',1);
                                            player.addMark('checkPoint',1);
                                        }  else if(game.me==trigger.player&&gameBoss&&game.me==game.boss){
                                            trigger.player.gameBossDie(num,num2,1);
                                        } 
                                    } else if(nextCheckPoint1==false){ //如果不是
                                        var gamePlayerNum=0;
                                        for(var i=0;i<game.players.length;i++){ //循环判断场上角色是否还有存活玩家
                                            if(game.players[i]==trigger.player) continue;
                                            if(!game.players[i].bossName(num,num2)&&!game.players[i].bossName(0,num2)){
                                                gamePlayerNum++;
                                            }
                                        }
                                        if(gamePlayerNum==0){ //如果场上角色都是BOSS或虚拟偶像 则游戏结束
                                            if(game.me==game.boss){
                                                game.over(true);
                                            } else {
                                                game.over(false);
                                            }
                                        } 
                                    }
                                } else if(num==2){ //进入第二关 和 阵亡判断
                                    if(player.countMark('nextCheckPoint')){ //进入
                                        trigger.player.die(); //因为过关要停止事件 洗牌等 会将BOSS阵亡事件停止
                                        player.removeMark('nextCheckPoint',player.countMark('nextCheckPoint'));
                                        var name1=player.bossName(-2,num2);
                                        game.addBossFellow(newSeat,name1); //召唤4号位第二关Boss num2是难度
                                        var name2=player.bossName(-2,num2);
                                        game.changeBoss(name2); //6号位Boss
                                        game.tianshuNewBoss(_status.currentPhase.next,num,num2); //重置回合 和判断 将回合控制权给谁
                                        for(var i=0;i<game.players.length;i++){
                                            if(game.players[i].name==name1||game.players[i].name==name2){
                                                if(num2==1){game.players[i].draw(1);} else if(num2==2){game.players[i].draw(2);} else {game.players[i].draw(3);}
                                            }
                                        }
                                        if(_status.gameMe){
                                            game.boss._trueMe=game.me;
                                            _status.gameMe=false;
                                        }
                                    }
                                    var nextCheckPoint2=trigger.player.bossName(num,num2); //阵亡判断 同第一关
                                    if(nextCheckPoint2){
                                        trigger.player.hide();
                                        if(trigger.source!=undefined&&trigger.source.hp!=trigger.source.maxHp){trigger.source.recover();}else if(trigger.source!=undefined){trigger.source.draw(2);}
                                        var gameBoss=trigger.player.gameBossDie(num,num2);
                                        if(gameBoss==false){
                                            player.addMark('nextCheckPoint',1);
                                            player.addMark('checkPoint',1);
                                        } else if(game.me==trigger.player&&gameBoss&&game.me==game.boss){
                                            trigger.player.gameBossDie(num,num2,1);
                                        } 
                                    } else if(nextCheckPoint2==false){
                                        var gamePlayerNum=0;
                                        for(var i=0;i<game.players.length;i++){
                                            if(game.players[i]==trigger.player) continue;
                                            if(!game.players[i].bossName(num,num2)&&!game.players[i].bossName(0,num2)){
                                                gamePlayerNum++;
                                            }
                                        }
                                        if(gamePlayerNum==0){
                                            if(game.me==game.boss){
                                                game.over(true);
                                            } else {
                                                game.over(false);
                                            }
                                        } 
                                    }
                                } else if(num==3){
                                    if(player.countMark('nextCheckPoint')){
                                        trigger.player.die();
                                        player.removeMark('nextCheckPoint',player.countMark('nextCheckPoint'));
                                        var name1=player.bossName(-3,num2);
                                        game.addBossFellow(newSeat,name1);
                                        var name2=player.bossName(-3,num2);
                                        game.changeBoss(name2);
                                        game.tianshuNewBoss(_status.currentPhase.next,num,num2);
                                        for(var i=0;i<game.players.length;i++){
                                            if(game.players[i].name==name1||game.players[i].name==name2){
                                                if(num2==1){game.players[i].draw(2);} else if(num2==2){game.players[i].draw(3);} else {game.players[i].draw(4);}
                                            }
                                        }
                                        if(_status.gameMe){
                                            game.boss._trueMe=game.me;
                                            _status.gameMe=false;
                                        }
                                    }
                                    var nextCheckPoint3=trigger.player.bossName(num,num2);
                                    if(nextCheckPoint3){
                                        trigger.player.hide();
                                        if(trigger.source!=undefined&&trigger.source.hp!=trigger.source.maxHp){trigger.source.recover();}else if(trigger.source!=undefined){trigger.source.draw(2);}
                                        var gameBoss=trigger.player.gameBossDie(num,num2);
                                        if(gameBoss==false){
                                            player.addMark('nextCheckPoint',1);
                                            player.addMark('checkPoint',1);
                                        } else if(game.me==trigger.player&&gameBoss&&game.me==game.boss){
                                            trigger.player.gameBossDie(num,num2,1);
                                        } 
                                    } else if(nextCheckPoint3==false){
                                        var gamePlayerNum=0;
                                        for(var i=0;i<game.players.length;i++){
                                            if(game.players[i]==trigger.player) continue;
                                            if(!game.players[i].bossName(num,num2)&&!game.players[i].bossName(0,num2)){
                                                gamePlayerNum++;
                                            }
                                        }
                                        if(gamePlayerNum==0){
                                            if(game.me==game.boss){
                                                game.over(true);
                                            } else {
                                                game.over(false);
                                            }
                                        } 
                                    }
                                } else if(num==4){
                                    if(player.countMark('nextCheckPoint')){
                                        trigger.player.die();
                                        player.removeMark('nextCheckPoint',player.countMark('nextCheckPoint'));
                                        var name1=player.bossName(-4,num2);
                                        game.addBossFellow(newSeat,name1);
                                        var name2=player.bossName(-4,num2);
                                        game.changeBoss(name2);
                                        game.tianshuNewBoss(_status.currentPhase.next,num,num2);
                                        for(var i=0;i<game.players.length;i++){
                                            if(game.players[i].name==name1||game.players[i].name==name2){
                                                if(num2==1){game.players[i].draw(3);} else if(num2==2){game.players[i].draw(4);} else {game.players[i].draw(5);}
                                            }
                                        }
                                        if(_status.gameMe){
                                            game.boss._trueMe=game.me;
                                            _status.gameMe=false;
                                        }
                                    }
                                    var nextCheckPoint4=trigger.player.bossName(num,num2);
                                    if(nextCheckPoint4){
                                        trigger.player.hide();
                                        if(trigger.source!=undefined&&trigger.source.hp!=trigger.source.maxHp){trigger.source.recover();}else if(trigger.source!=undefined){trigger.source.draw(2);}
                                        var gameBoss=trigger.player.gameBossDie(num,num2);
                                        if(gameBoss==false){
                                            player.addMark('nextCheckPoint',1);
                                            player.addMark('checkPoint',1);
                                        } else if(game.me==trigger.player&&gameBoss&&game.me==game.boss){
                                            trigger.player.gameBossDie(num,num2,1);
                                        } 
                                    } else if(nextCheckPoint4==false){
                                        var gamePlayerNum=0;
                                        for(var i=0;i<game.players.length;i++){
                                            if(game.players[i]==trigger.player) continue;
                                            if(!game.players[i].bossName(num,num2)&&!game.players[i].bossName(0,num2)){
                                                gamePlayerNum++;
                                            }
                                        }
                                        if(gamePlayerNum==0){
                                            if(game.me==game.boss){
                                                game.over(true);
                                            } else {
                                                game.over(false);
                                            }
                                        } 
                                    }
                                } else if(lib.config.extension_术樱_tianshuaddoff&&player.countMark('checkPoint')<=num3){
                                    if(player.countMark('nextCheckPoint')){
                                        trigger.player.die();
                                        player.removeMark('nextCheckPoint',player.countMark('nextCheckPoint'));
                                        var name1=player.bossName(-5,num2);
                                        game.addBossFellow(newSeat,name1);
                                        var name2=player.bossName(-5,num2);
                                        game.changeBoss(name2);
                                        game.tianshuNewBoss(_status.currentPhase.next,num,num2);
                                        for(var i=0;i<game.players.length;i++){
                                            if(game.players[i].name==name1||game.players[i].name==name2&&!game.players[i].isFriendOf(player)){
                                                if(num2==1){
                                                    game.players[i].draw((5+parseInt((markNum-3)/10)));
                                                    if(game.players[i].maxHp<18) game.players[i].gainMaxHp(18-game.players[i].maxHp); game.players[i].recover(18-game.players[i].maxHp);
                                                    if(player.countMark('checkPoint')>5){
                                                        var markNum=player.countMark('checkPoint');
                                                        if(parseInt((markNum-5)/5)) game.players[i].gainMaxHp(parseInt((markNum-5)/5)); game.players[i].recover(parseInt((markNum-5)/5));
                                                    }
                                                } else if(num2==2){
                                                    game.players[i].draw((5+parseInt((markNum-4)/10)));
                                                    if(game.players[i].maxHp<19) game.players[i].gainMaxHp(18-game.players[i].maxHp); game.players[i].recover(19-game.players[i].maxHp);
                                                    if(player.countMark('checkPoint')>5){
                                                        var markNum=player.countMark('checkPoint');
                                                        if(parseInt((markNum-5)/5)) game.players[i].gainMaxHp(parseInt((markNum-5)/5)); game.players[i].recover(parseInt((markNum-5)/5));
                                                    }
                                                } else {
                                                    game.players[i].draw((5+parseInt((markNum-5)/10)));
                                                    if(game.players[i].maxHp<20) game.players[i].gainMaxHp(18-game.players[i].maxHp); game.players[i].recover(20-game.players[i].maxHp);
                                                    if(player.countMark('checkPoint')>5){
                                                        var markNum=player.countMark('checkPoint');
                                                        if(parseInt((markNum-5)/5)) game.players[i].gainMaxHp(parseInt((markNum-5)/5)); game.players[i].recover(parseInt((markNum-5)/5));
                                                    }
                                                }
                                            }
                                        }
                                        if(_status.gameMe){
                                            game.boss._trueMe=game.me;
                                            _status.gameMe=false;
                                        }
                                    }
                                    var nextCheckPoint5=trigger.player.bossName(5,num2);
                                    if(nextCheckPoint5){
                                        trigger.player.hide();
                                        if(trigger.source!=undefined&&trigger.source.hp!=trigger.source.maxHp){trigger.source.recover();}else if(trigger.source!=undefined){trigger.source.draw(2);}
                                        var gameBoss=trigger.player.gameBossDie(5,num2);
                                        if(gameBoss==false){
                                                player.addMark('checkPoint',1);
                                            if(player.countMark('checkPoint')<=num3&&lib.config.extension_术樱_tianshuaddoff) {
                                                player.addMark('nextCheckPoint',1);
                                            } else {
                                                event.goto(0);
                                            }
                                        } else if(game.me==trigger.player&&gameBoss&&game.me==game.boss){
                                            trigger.player.gameBossDie(num,num2,1);
                                        } 
                                    } else if(nextCheckPoint5==false){
                                        var gamePlayerNum=0;
                                        for(var i=0;i<game.players.length;i++){
                                            if(game.players[i]==trigger.player) continue;
                                            if(!game.players[i].bossName(5,num2)&&!game.players[i].bossName(0,num2)){
                                                gamePlayerNum++;
                                            }
                                        }
                                        if(gamePlayerNum==0){
                                            if(game.me==game.boss){
                                                game.over(true);
                                            } else {
                                                game.over(false);
                                            }
                                        } 
                                    }
                                } else {
                                    if(game.me==game.boss){
                                        game.over(false);
                                    } else {
                                        game.over(true);
                                    }
                                }
                                'step 1'
                                if(player.countMark('nextCheckPoint')==undefined||player.countMark('nextCheckPoint')==0){
                                    event.finish();
                                } else {event.goto(2);}
                                'step 2'
                                game.delay();
                                game.cardsNumberUpDate();
                                if(player.countMark('checkPoint')<=5) game.hpAndH(1,2);
                                'step 3'
                                if(game.players[event.Diuse_Player]==game.boss||game.players[event.Diuse_Player].bossName(0)) event.goto(6);
                                if(player.countMark('checkPoint')>5) if(parseInt(player.countMark('checkPoint')%5)!=0) event.goto(0);
                                'step 4'
                                var off;
                                if(!_status.skillsList){
                                    if(lib.config.extension_术樱_skillsoff){
                                        game.beiSkillsList();
                                        off=4;
                                    } else {
                                        game.skillsList();
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
                                    game.zhuSkillsList();
                                    var Diuse_Not = _status.skillsList.randomGet();
                                    list.push(Diuse_Not);    
                                }

                                //list.push('刷新'); goto()
                                event.list=list;
                                var name=get.translation(game.players[event.Diuse_Player]);
                                var buttonGiveAiSkills=lib.config.extension_术樱_giveaiskill;
                                var dialog=game.getSkillDialog(event.list,name+'选择获得一个技能');
                                if(get.config('single_control')==false&&buttonGiveAiSkills){
                                    game.me.chooseControl(event.list).set('ai',function(){
                                        return 0;
                                    }).dialog=dialog;
                                } else {
                                    game.players[event.Diuse_Player].chooseControl(event.list).set('ai',function(){
                                        return 0;
                                    }).dialog=dialog;
                                }
                                'step 5'
                                if(result.control=='制衡'){ 
                                    game.log(game.players[event.Diuse_Player].name,'获得了【制衡】技能');
                                    game.players[event.Diuse_Player].addSkill('zhiheng');
                                } else if(result.control=='武圣'){
                                    game.log(game.players[event.Diuse_Player].name,'获得了【武圣】技能');
                                    game.players[event.Diuse_Player].addSkill('new_rewusheng');
                                } else if(result.control=='仁德'){
                                    game.log(game.players[event.Diuse_Player].name,'获得了【仁德】技能');
                                    game.players[event.Diuse_Player].addSkill('rerende');
                                } else if(result.control=='英姿'){
                                    game.log(game.players[event.Diuse_Player].name,'获得了【英姿】技能');
                                    game.players[event.Diuse_Player].addSkill('reyingzi');
                                } else {
                                    event.skill=result.control
                                    game.log(game.players[event.Diuse_Player].name,'获得了【',event.skill,'】技能');
                                    game.players[event.Diuse_Player].addSkill(event.skill);
                                    if(event.skill==event.list[event.list.length-1]){
                                        if(game.players[event.Diuse_Player].storage.TianshuSkill==undefined){
                                            game.players[event.Diuse_Player].storage.TianshuSkill=event.skill;
                                        } else {
                                            game.players[event.Diuse_Player].removeSkill(game.players[event.Diuse_Player].storage.TianshuSkill);
                                            game.log(game.players[event.Diuse_Player].name,'失去了【',game.players[event.Diuse_Player].storage.TianshuSkill,'】技能');
                                        }
                                    }
                                    event.list=[];
                                }
                                _status.skillsList='';
                                'step 6'
                                if(event.Diuse_Player+1<game.players.length){
                                    event.Diuse_Player++;
                                    event.goto(3);
                                } 
                                'step 7'
                                event.goto(0);
                            },
                            group:['checkPoint_Die','checkPoint_Kuangbao','checkPoint_Use'],
                            subSkill:{
                                Die:{
                                    locked:true,
                                    trigger:{player:"dieBegin"},
                                    forced:true,
                                    popup:false,
                                    fixed:true,
                                    unique:true,
                                    sub:true,
                                    filter:function(event,player){
                                        if(event.parent.name=='Boss_Tianshu_Go') return false;
                                        return true;
                                    },
                                    content:function(){
                                        if(game.me==game.boss){
                                            game.over(true);
                                        } else {
                                            game.over(false);
                                        }
                                    }
                                },
                                Kuangbao:{
                                    trigger:{global:"roundStart"},
                                    forced:true,
                                    sub:true,
                                    audio:false,
                                    filter:function(event,player){
                                        return game.roundNumber==5&&lib.config.extension_术樱_kuangbaooff;
                                    },
                                    content:function(){
                                        for(var i=0;i<game.players.length;i++){
                                            if(game.players[i].isFriendOf(player)){
                                                var num=game.players[i].countCards('hej');
                                                game.players[i].chooseToDiscard(true,'hej',num);
                                            } else { continue; }
                                        }
                                    }
                                },
                                Use:{
                                    trigger:{global:"phaseUseBegin"},
                                    forced:true,
                                    audio:false,
                                    sub:true,
                                    popup:false,
                                    filter:function(event,player){
                                        game.changeSeatNew(); //修正座位

                                        if(event.player.isFriendOf(player)&&game.roundNumber>=7&&lib.config.extension_术樱_kuangbaooff) return true;
                                        return false;
                                    },
                                    content:function(){
                                        trigger.player.loseHp();
                                    },
                                },
                            },
                        },
                        Boss_Tianshu_Go:{
                            mode:['boss'],
                            trigger:{global:'gameStart'},
                            forced:true,
                            popup:false,
                            fixed:true,
                            unique:true,
                            content:function(){
                                'step 0' 
                                for(var i=0;i<game.players.length;i++){ //删必崩 我也不知道为什么
                                    if(game.players[i].bossName(0)){
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
                                // var list=['Boss_Nine_Skills'];
                                // for(var i=0;i<list.length;i++){
                                //     game.addGlobalSkill(list[i]);
                                // }
                            }
                        },
                        Tianshu_Protect:{
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
                        Tianshu_Boss_Ordinary_Chiyan:{
                            mode:['boss'],
                            group:['Tianshu_Boss_Ordinary_Chiyan_pha','Tianshu_Boss_Ordinary_Chiyan_Draw'],
                            subSkill:{
                                pha:{
                                    trigger:{
                                        player:"phaseDrawBefore",
                                    },
                                    forced:true,
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
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
                                    sub:true,
                                    filter:function(event,player){
                                        return player.countMark('Tianshu_Boss_Shashen')>=1;
                                    },
                                    content:function(){
                                        player.removeMark('Tianshu_Boss_Shashen',player.countMark('Tianshu_Boss_Shashen'));
                                    },
                                },
                            },
                        },
                        AAA:{},
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
                                    sub:true,
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
                                    sub:true,
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
                                if(!_status.skillsList){game.skillsList();}
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
                                    if(get.attitude(player,target)>0){ return false; }
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
                            trigger:{player:["damageBegin","loseHpBegin"]},
                            forced:true,
                            content:function(){trigger.cancel();},
                            ai:{
                                effect:{
                                    target:function(card,player,target,current){
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
                            filter:function(event,player){return event.card.name=='sha';},
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
                                        var att=get.attitude(player,target);
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
                                player.playerHpMax().damage(1,'thunder');
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
                                player.playerHpMax().damage(num,'thunder');
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
                                var num=game.numRandom();
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
                                    event.name=player.playerCardMax();
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
                                    player.playerHpMax().loseHp();
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
                                var numMark=trigger.player.countMark()
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
                            usable:1,
                            shaRelated:true,
                            trigger:{
                                player:"useCardToPlayered",
                            },
                            filter:function(event,player){
                                if(event.targets.length!=1||!!event.card.name=='sha') return false;
                                return true;
                            },
                            content:function(){
                                var target=trigger.target;
                                "step 0"
                                if(target.countCards('h')>player.countCards('h')){
                                    event.goto(1);
                                } else {
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
                                player.damagePlayerHp(1);
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
                                player.damagePlayerHp(2);
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
                                player.damagePlayerHp(2,3);
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
                                if(event.targets.length==1&&event.card.name=='sha') return true;
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
                                if(event.targets.length==1&&event.card.name=='sha') return true;
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
                                    if(get.attitude(player,target)>0){return false;} else{return true;}
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
                                    if(get.attitude(player,target)>0){return false;} else{return true;}
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
                                    if(get.attitude(player,target)>0){return false;} else{return true;}
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
                                var rand=game.randomNum(num,0);
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
                                var rand=game.randomNum(num,0);
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
                                if(event.source==undefined&&event.source==''&&_status.currentPhase!=player) return false;
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
                                                var randnum=game.randomNum(num,0);
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
                                        return game.roundNumber<3&&event.player.isEnemyOf(player);
                                    },
                                    content:function(){
                                        trigger.num--;
                                    }
                                },
                                Thunder:{
                                    trigger:{player:'damageBegin4'},
                                    filter:function(event){
                                        return event.nature=='thunder'&&game.roundNumber<7;
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
                                        return game.roundNumber<3&&event.player.isEnemyOf(player);
                                    },
                                    content:function(){
                                        trigger.num--;
                                    }
                                },
                                Thunder:{
                                    trigger:{player:'damageBegin4'},
                                    filter:function(event){
                                        return event.nature=='thunder'&&game.roundNumber<7;
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
                                var num=game.randomNum(8,0);
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
                                        var name=event.player.bossName(255,0);
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
                                        var name=event.player.bossName(255,0);
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
                                player.playerHpMax().damage(1,'thunder');
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
                                            player.playerRandom().damage();
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
                                game.log(game.players[event.list[0]])
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
                                game.log(game.players[event.list[0]])
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
                        nextCheckPoint:"下一关",
                        checkPoint:"关卡",
                        checkPoint_Kuangbao:"狂暴",
                        checkPoint_Use:"狂暴",
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
                        Boss_Shengxiao_Youji_info:"锁定技，游戏开始时，你成为一号位角色；摸牌阶段，你多摸X张牌（X为游戏轮数）。",
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
                        Qingqing_Boss_Wangzun_info:"锁定技，其他敌方角色的结束阶段，若其本回合：1.没有对你造成伤害，则其弃置1张牌；2.对你造成伤害数超过1点，则你对其造成1点伤害。",
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
                        Tianshu_Boss_Baiyi_Fucking_info:'锁定技，每名敌方角色摸牌阶段，若当前轮数小于3，其少摸一张牌；第五轮开始时，每名敌方角色受到1点雷电伤害；当己方角色受到雷电伤害时，若当前轮数小于7，则此伤害-1。',
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
                        Diuse_Xvni_Xvxiang_info:"锁定技，当你受到伤害或体力流失时，防止该伤害；若你阵亡或三名友军阵亡则游戏失败。",
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
                        Boss_Diuse_Nine_Zhen_info:'每轮限一次。出牌阶段，你可以临时获得一个技能直至回合结束。（不包含部分技能）',
                        Boss_Diuse_Nine_Lie:'列',
                        Boss_Diuse_Nine_Lie_info:'每轮限一次。出牌阶段，若已受伤则可以弃置两张牌然后恢复一点体力并摸一张牌。',
                        Boss_Diuse_Nine_Qian:'前',
                        Boss_Diuse_Nine_Qian_info:'出牌阶段开始时，你可以立刻随机装备一张装备区为空栏的装备，若已满则摸一张牌。',
                        Boss_Diuse_Nine_Xing:'行',
                        Boss_Diuse_Nine_Xing_info:'锁定技。与其他角色计算距离+1；弃牌阶段开始时若你当前手牌小于当前体力值则你摸至相同牌数且最多摸五张。',
            
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

        if(lib.config.extension_术樱_yuanshenoff){
            game.Yuanshen=function(英文名,翻译名,obj,扩展包名){
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

            game.Yuanshen("Yuanshen","原神",{
                connect:true,
                character:{
                    character:{
                        Diuse_Bachongshenzi:["female","qun",3,["Diuse_Shizuishi","Diuse_Shashengying","Diuse_Tianhuxianzhen"],[]],
                        //,'kagari_zongsi'
                    },
                    translate:{
                        Diuse_Bachongshenzi:"八重神子",
                    },
                },
                perfectPair:{},
                characterTitle:{},
                characterReplace:{}, //切换版本
                game:{ //普通自定义函数
                    randomNum:function(num1,num2){
                        var num = Math.floor(Math.random() * (num1 - num2)) + 1;
                        return num;
                    },
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
                                    num=game.randomNum(game.players.length-1,0);
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
                                    var randomNum=game.randomNum(100,0);
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
                    },
                    translate:{
                        Diuse_Shizuishi:"食罪式",
                        Diuse_Shizuishi_info:"锁定技，当你使用非转化牌指定目标后，将使用者随机改为场上的其他角色（此技能无法将使用者改为拥有该技能的角色）",
                        Diuse_Shashengying:"杀生樱",
                        Diuse_Shashengying_Buff:"杀生樱",
                        Diuse_Shashengying_Buff1:"杀生樱",
                        Diuse_Shashengying_info:"每回合限两次。当你被使用牌指定后，若该牌花色与你手牌中花色有相同，则你可以选择：1:弃置全部该花色使该牌对你无效，并在该牌结算后你获得之，若你因此弃置全部手牌则你将手牌补充至当前体力 2:弃置一张该花色 使其对你无效之 3:弃置一张该花色并指定一名其他角色 令其也成为该牌的目标",
                        Diuse_Tianhuxianzhen:"天狐显真",
                        Diuse_Tianhuxianzhen_info:"出牌阶段限两次，你选择一种花色并展示牌堆底的一张牌，如果花色相同则你获得之若在此之前你没有手牌则你从牌堆顶摸一张牌并重复执行该技能，如果不对则将该牌放置牌堆顶然后本回合手牌上限+1",
                    },
                },
            },"术樱");
        }
        if(lib.config.extension_术樱_diyoff){
            game.Diy=function(英文名,翻译名,obj,扩展包名){
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

                lib.element.player.isMaxAttackRange=function(equal){ //攻击距离最大
                    for(var i=0;i<game.players.length;i++){
                        if(game.players[i].isOut()||game.players[i]==this) continue;
                        if(equal){
                            if(game.players[i].getAttackRange()>=this.getAttackRange()) return false;
                        } else {
                            if(game.players[i].getAttackRange()>this.getAttackRange()) return false;
                        }
                    }
                    return true;
                }

                lib.element.player.isMinAttackRange=function(equal){ //攻击距离最小
                    for(var i=0;i<game.players.length;i++){
                        if(game.players[i].isOut()||game.players[i]==this) continue;
                        if(equal){
                            if(game.players[i].getAttackRange()<=this.getAttackRange()) return false;
                        } else {
                            if(game.players[i].getAttackRange()<this.getAttackRange()) return false;
                        }
                    }
                    return true;
                }
            };

            game.Diy("Diuse_Diy","DIY",{
                connect:true,
                character:{
                    character:{
                        Diuse_Diy_Zhonghui:["male","jin",4,["Diuse_Diy_Xingfa","Diuse_Diy_Miaopin"],[]],
                        Diuse_Diy_Caocao:["male","wei",4,["jianxiong","Diuse_Diy_Huibian","hujia"],[]],
                        Diuse_Diy_Zhugeshang:["male","shu",4,["Diuse_DIY_Juesi","Diuse_DIY_Xunzhong"],[]],
                        Diuse_Diy_Simazhao:["male","wei",3,["Diuse_DIY_Zhaoquan",'Diuse_DIY_Zhengtong'],[]],
                        Diuse_Diy_Lvbu:["male","qun",5,["Diuse_DIY_Baifu",'Diuse_DIY_Zixiao','wushuang'],[]],
                        Diuse_Diy_Simashi:["male","wei",4,["Diuse_DIY_Suzheng",'Diuse_DIY_Zhangbing'],[]],
                        Diuse_Diy_Panghui:["male","wei",4,["Diuse_DIY_Shichou",'Diuse_DIY_Yonglie'],[]],
                        Diuse_Diy_Caomao:["male","wei",3,["Diuse_DIY_Kuiye",'Diuse_DIY_Sucai','Diuse_DIY_Kuidi'],['zhu']],
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
                    },
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
                                    if(get.attitude(player,target)>0){ return true; }
                                    return false;
                                });
                                'step 3'
                                if(result.bool){
                                    event.targets=result.targets[0];
                                    event.targets.chooseControl('是','否').set('prompt','请选择是否'+event.prom).set('ai',function(){
                                        list=['是','否'].randomGet();
                                        if(get.attitude(player,target)>0) return '是';
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
                                                filterCard:function(card){
                                                    return card.hasGaintag('Diuse_Diy_Miaopin')&&get.type(card)==get.type(links[0][2])&&get.name(card)!=links[0][2];
                                                },
                                                selectCard:1,
                                                position:'h',
                                                viewAs:{
                                                    name:links[0][2],
                                                },
                                                sub:true,
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
                                    trigger:{player:["phaseZhunbeiBegin","phaseJieshuAfter"]},
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
                                    return current!=player&&current.group=='wei';
                                })&&game.hasPlayer(function(current){
                                    return current!=player&&current.group=='wei';
                                });
                            },
                            check:function(event,player,target){
                                return true;
                            },
                            content:function(){
                                'step 0'
                                player.chooseTarget(1,'选择一个魏势力角色',function(event,player,target){
                                    return target!=player&&target.group=='wei';
                                });
                                'step 1'
                                if(result.bool){
                                    event.tar=result.targets[0];
                                }
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
                                }
                            },
                        },
                        Diuse_DIY_Baifu:{
                            audio:"ext:术樱:2",
                            trigger:{player:"phaseZhunbeiBegin"},
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
                                    return get.attitude(player,target)<=0;
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
                                        return get.attitude(player,target)<=0;
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
                            }
                        },
                        Diuse_DIY_Zhangbing:{
                            trigger:{player:"phaseDrawBegin"},
                            forced:true,
                            filter:function(event,player){
                                return player.isMinAttackRange();
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
                                        return player.isMaxAttackRange();
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
                            }
                        },
                        Diuse_DIY_Yonglie:{
                            trigger:{player:"useCardToPlayered"},
                            init:function(player){
                                player.storage.Diuse_DIY_Yonglie=[];
                            },
                            filter:function(event,player){
                                if(!event.targets) return false;
                                if(!event.isFirstTarget) return false;
                                return event.card&&get.color(event.card)=='black'&&player!=event.target;
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
                                        return get.attitude(player,trigger.target)<=0;
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
                                        return player==_status.currentPhase&&player.storage.Diuse_DIY_Yonglie!=undefined;
                                    },
                                    content:function(){
                                        player.storage.Diuse_DIY_Yonglie.remove(event.card);
                                    },
                                },
                                Damage:{
                                    trigger:{global:'damageBegin'},
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
                                        if(get.attitude(player,target)>0){
                                            return true;
                                        } else {return false;}
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
                                var num=player.getDamagedHp();
                                if(num){
                                    player.draw(num);
                                    player.storage.Diuse_DIY_Kuidi_Buff.draw(num);
                                } 
                                player.removeSkill('Diuse_DIY_Kuidi_Buff');
                                delete player.storage.Diuse_DIY_Kuidi_Buff;
                            }
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
                    },
                },
            },"术樱");
        }

    	// game.导入card=function(英文名,翻译名,obj){var oobj=get.copy(obj);oobj.list=obj.card.list;oobj.card=obj.card.card;oobj.skill=obj.skill.skill;oobj.translate=Object.assign({},obj.card.translate,obj.skill.translate);game.import('card',function(){return oobj});lib.config.all.cards.push(英文名);if(!lib.config.cards.contains(英文名))lib.config.cards.push(英文名);lib.translate[英文名+'_card_config']=翻译名;};
		// game.新增势力=function(名字,映射,渐变){var n,t;if(!名字)return;if(typeof 名字=="string"){n=名字;t=名字}else if(Array.isArray(名字)&&名字.length==2&&typeof 名字[0]=="string"){n=名字[0];t=名字[1]}else return;if(!映射||!Array.isArray(映射)||映射.length!=3)映射=[199,21,133];var y="("+映射[0]+","+映射[1]+","+映射[2];var y1=y+",1)",y2=y+")";var s=document.createElement('style');var l;l=".player .identity[data-color='diy"+n+"'],";l+="div[data-nature='diy"+n+"'],";l+="span[data-nature='diy"+n+"'] {text-shadow: black 0 0 1px,rgba"+y1+" 0 0 2px,rgba"+y1+" 0 0 5px,rgba"+y1+" 0 0 10px,rgba"+y1+" 0 0 10px}";l+="div[data-nature='diy"+n+"m'],";l+="span[data-nature='diy"+n+"m'] {text-shadow: black 0 0 1px,rgba"+y1+" 0 0 2px,rgba"+y1+" 0 0 5px,rgba"+y1+" 0 0 5px,rgba"+y1+" 0 0 5px,black 0 0 1px;}";l+="div[data-nature='diy"+n+"mm'],";l+="span[data-nature='diy"+n+"mm'] {text-shadow: black 0 0 1px,rgba"+y1+" 0 0 2px,rgba"+y1+" 0 0 2px,rgba"+y1+" 0 0 2px,rgba"+y1+" 0 0 2px,black 0 0 1px;}";s.innerHTML=l;document.head.appendChild(s);if(渐变&&Array.isArray(渐变)&&Array.isArray(渐变[0])&&渐变[0].length==3){var str="",st2=[];for(var i=0;i<渐变.length;i++){str+=",rgb("+渐变[i][0]+","+渐变[i][1]+","+渐变[i][2]+")";if(i<2)st2[i]="rgb("+渐变[i][0]+","+渐变[i][1]+","+渐变[i][2]+")";}var tenUi = document.createElement('style');tenUi.innerHTML = ".player>.camp-zone[data-camp='"+n+"']>.camp-back {background: linear-gradient(to bottom"+str+");}";tenUi.innerHTML += ".player>.camp-zone[data-camp='"+n+"']>.camp-name {text-shadow: 0 0 5px "+st2[0]+", 0 0 10px "+st2[1]+";}";document.head.appendChild(tenUi);}lib.group.add(n);lib.translate[n]= t;lib.groupnature[n]= "diy"+n;};
    }
},help:{},config:{},package:{
    intro:"所有素材均来自互联网，侵权必删。",
    author:"",
    diskURL:"",
    forumURL:"",
    version:"",
},files:{"character":[""],"card":[],"skill":[]}}})