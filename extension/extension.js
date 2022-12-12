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
    game.saveConfig('Diuse_local_version','1.7.45.5'); //版本号

    if(lib.config.show_splash!='off') game.saveConfig('show_splash','off'); //关闭启动页
    if(lib.config.extension_术樱_benghuai3off==undefined) game.saveConfig('extension_术樱_benghuai3off',true);
    if(lib.config.extension_术樱_tianshuoff==undefined) game.saveConfig('extension_术樱_tianshuoff',true);
    if(lib.config.extension_术樱_yuanshenoff==undefined) game.saveConfig('extension_术樱_yuanshenoff',true);
    if(lib.config.extension_术樱_tianshu_new==undefined) game.saveConfig('extension_术樱_tianshu_new',4);
    if(lib.config.extension_术樱_tianshu_add_list==undefined) game.saveConfig('extension_术樱_tianshu_list','');
    if(lib.config.extension_术樱_kuangbaooff==undefined) game.saveConfig('extension_术樱_kuangbaooff',false);
    if(lib.config.extension_术樱_baizhanoff==undefined) game.saveConfig('extension_术樱_baizhanoff',false);
    if(lib.config.extension_术樱_skillsoff==undefined) game.saveConfig('extension_术樱_skillsoff',false);

    var httpRequest = new XMLHttpRequest();
    if(lib.config.extension_术樱_Beta){
        httpRequest.open("GET",'http://diuse.hao1237.top/Diuse/beta_extension/online_version.js',true);
        httpRequest.send(null);
        httpRequest.onreadystatechange=function(){if(httpRequest.readyState==4&&httpRequest.status==200){game.saveConfig('Diuse_online_version',httpRequest.responseText)}else{game.saveConfig('Diuse_online_version','无法访问服务器')}} 
    } else {
        httpRequest.open("GET",'http://diuse.hao1237.top/Diuse/extension/online_version.js',true);
        httpRequest.send(null);
        httpRequest.onreadystatechange=function(){if(httpRequest.readyState==4&&httpRequest.status==200){game.saveConfig('Diuse_online_version',httpRequest.responseText)}else{game.saveConfig('Diuse_online_version','无法访问服务器')}}        
    }

    var layoutPath = lib.assetURL + 'extension/术樱';
	lib.init.css(layoutPath, 'extension');
    if(Diuse.enable){
        var url=lib.assetURL+'extension/术樱'
        var Diuse_Button=true;
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

        if(lib.config.extension_术樱_Beta){
            lib.extensionMenu.extension_术樱.online_version={
                "name":"最新测试版本："+lib.config.Diuse_online_version,
                "clear":true,
                "nopointer":true,
            };
        } else {
            lib.extensionMenu.extension_术樱.online_version={
                "name":"最新版本："+lib.config.Diuse_online_version,
                "clear":true,
                "nopointer":true,
            };
        }
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
        if(lib.config.extension_术樱_Beta){
            lib.extensionMenu.extension_术樱.Updata={
                "name":"测试版本检测",
                "clear":true,
                "onclick":function(){
                    if(confirm('点击确定会检测版本')&&Diuse_Button){
                        Diuse_Button=false;
                        download_beta_version();
                    } else if(Diuse_Button==false){
                        alert('有其他文件正在下载，请稍后再试吧。');
                    }
                },
            };
        } else {
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
        }
        lib.extensionMenu.extension_术樱.RepairBug={
            "name":"本地资源修复",
            "clear":true,
            "onclick":function(){
                if(confirm('点击确定会检测本地资源，并尝试修复。若开启测试版，则会关闭测试版')&&Diuse_Button){
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
        lib.extensionMenu.extension_术樱.Beta={
            "name":"开启测试版(需重启",
            "init":false,
            "intro":"开启后，更新进入测试版渠道",
        };
        lib.extensionMenu.extension_术樱.Skin={
            "name":"将皮肤下载至Skin",
            "clear":true,
            "onclick":function(){
                if(confirm('确定将皮肤下载至Skin文件夹，随时随地更换皮肤（只会将原神、崩坏包下载至Skin文件夹。注意流量使用情况')&&Diuse_Button){
                    Diuse_Button=false;
                    skinList();
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
        lib.extensionMenu.extension_术樱.downwangpan={
            "name":'网盘分流(5h9a',
            "init":'baidu',
            "item":{
                baidu:'百度网盘',
                ali:'阿里云盘',
            },
            visualMenu:function(node){
                node.className='button character controlbutton';
                node.style.backgroundSize='';
            },
            onclick:function(layout){
                game.saveConfig('extension_术樱_downall',layout);
                switch(layout){
                    case 'baidu':{
                        game.open('https://pan.baidu.com/s/1_ft45F6o4LjvFDC7FigiGw?pwd=5h9a');
                        break;
                    }
                    case 'ali':{
                        game.open('https://www.aliyundrive.com/s/Nk6Tg2nKLii');
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
                off:'关闭',
            },
            visualMenu:function(node){
                node.className='button character controlbutton';
                node.style.backgroundSize='';
            },
            onclick:function(layout){
                game.saveConfig('extension_术樱_tianshu_xvni',layout);
            }
        };
        lib.extensionMenu.extension_术樱.tianshu_dead={
            "name":"虚拟偶像复活",
            "init":false,
            "intro":"开启后，进入下一关后若虚拟偶像阵亡则复活"
        };
        lib.extensionMenu.extension_术樱.tianshu_addBoss={
            "name":"增加Boss",
            "init":false,
            "intro":"开启后，若虚拟偶像处于关闭则可以新增一位Boss"
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
                    4:'4',
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

            lib.extensionMenu.extension_术樱.baizhanoff={
                "name":"百战天书增强BOSS公式",
                "init":false,
                "intro":"启用后敌方武将随关卡递增会有场景技增强的效果"
            };

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
        lib.extensionMenu.extension_术樱.br5={
            clear: true,
            nopointer: true,
            name: '--------------------',
        },
        lib.extensionMenu.extension_术樱.Log={
            "name":"<span style='text-decoration: underline'>反馈BUG</span>",
            "clear":true,
            "onclick":function(){
                game.open('https://tieba.baidu.com/p/7934495658');
            },
        };
        lib.extensionMenu.extension_术樱.thank={
            "name":"感谢极光佬，诗笺佬和其他大佬网络上的文献。以及反馈BUG的玩家。谢谢！最后特别感谢少年A对本扩展进行的优化描述和设计的伏特加女孩",
            "clear":true,
            "nopointer":true, 
        };

        if(lib.config.mode=='boss'){
            var DiuseList = 
            [
                "Diuse_Function",
                "Diuse_Benghuai",
                "Diuse_Yuanshen",
                "Diuse_DIY",
                "Diuse_Tianshu",
            ];

            lib.init.js(url,DiuseList,function(){
                window.func(lib,game,ui,get,ai,_status);
            });
        } else {
            var DiuseList = 
            [
                "Diuse_Function",
                "Diuse_Benghuai",
                "Diuse_Yuanshen",
                "Diuse_Fengyun",
                "Diuse_DIY",
            ];

            lib.init.js(url,DiuseList,function(){
                window.func(lib,game,ui,get,ai,_status);
            });
        }

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
                var tianshu_list=Diuse_tianshu,mp3_list=Diuse_mp3,static_list=Diuse_static,css_list=Diuse_css,js_list=Diuse_js;
                var file_url='extension/术樱/';
                var num=0;
                var listnum=tianshu_list.length+mp3_list.length+static_list.length+js_list.length+css_list.length;
                document.body.appendChild(Diuse_Text); 
                var download1=function(){
                    var url_Diuse_search=file_url+tianshu_list[0];
                    game.readFile(url_Diuse_search,function(){
                        num++;
                        tianshu_list.remove(tianshu_list[0]);
                        if(tianshu_list.length>0){
                            Diuse_Text.innerHTML='正在查漏补缺（'+num+'/'+listnum+'）';
                            download1();
                        } else {
                            download2();
                        }
                    },function(){
                        game.download('http://diuse.hao1237.top/Diuse/image/tianshu/'+tianshu_list[0],'extension/术樱/'+tianshu_list[0],function(){
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
                    var url_Diuse_search=file_url+mp3_list[0];
                    game.readFile(url_Diuse_search,function(){
                        num++;
                        mp3_list.remove(mp3_list[0]);
                        if(mp3_list.length>0){
                            Diuse_Text.innerHTML='正在查漏补缺（'+num+'/'+listnum+'）';
                            download2();
                        } else {
                            download3();
                        }
                    },function(){
                        game.download('http://diuse.hao1237.top/Diuse/skin/'+mp3_list[0],'extension/术樱/'+mp3_list[0],function(){
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
                    var url_Diuse_search=file_url+css_list[0];
                    game.readFile(url_Diuse_search,function(){
                        num++;
                        css_list.remove(css_list[0]);
                        if(css_list.length>0){
                            Diuse_Text.innerHTML='正在查漏补缺（'+num+'/'+listnum+'）';
                            download3();
                        }else{
                            download4();
                        };
                    },function(){
                        game.download('http://diuse.hao1237.top/Diuse/css/'+css_list[0],'extension/术樱/'+css_list[0],function(){
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
                    var url_Diuse_search=file_url+js_list[0];
                    game.readFile(url_Diuse_search,function(){
                        num++;
                        js_list.remove(js_list[0]);
                        if(js_list.length>0){
                            Diuse_Text.innerHTML='正在查漏补缺（'+num+'/'+listnum+'）';
                            download4();
                        }else{
                            download5();
                        };
                    },function(){
                        game.download('http://diuse.hao1237.top/Diuse/js/'+js_list[0],'extension/术樱/'+js_list[0],function(){
                            num++;
                            js_list.remove(js_list[0]);
                            if(js_list.length>0){
                                Diuse_Text.innerHTML='正在查漏补缺（'+num+'/'+listnum+'）';
                                download4();
                            }else{
                                download5();
                            };
                        },function(){
                            if(confirm('下载'+js_list[0]+'失败，是否继续下载？')){
                                download4();
                            }
                        });
                    });
                }
                var download5=function(){
                    var url_Diuse_search=file_url+static_list[0];
                    game.readFile(url_Diuse_search,function(){
                        num++;
                        static_list.remove(static_list[0]);
                        if(static_list.length>0){
                            Diuse_Text.innerHTML='正在查漏补缺（'+num+'/'+listnum+'）';
                            download5();
                        }else{
                            Diuse_Text.innerHTML='查漏补缺完毕';
                            Diuse_Button=true;
                            alert('查漏补缺完毕!');
                            document.body.removeChild(Diuse_Text);
                        };
                    },function(){
                        game.download('http://diuse.hao1237.top/Diuse/image/static/'+static_list[0],'extension/术樱/'+static_list[0],function(){
                            num++;
                            static_list.remove(static_list[0]);
                            if(static_list.length>0){
                                Diuse_Text.innerHTML='正在查漏补缺（'+num+'/'+listnum+'）';
                                download5();
                            }else{
                                Diuse_Text.innerHTML='查漏补缺完毕';
                                Diuse_Button=true;
                                alert('查漏补缺完毕!');
                                document.body.removeChild(Diuse_Text);
                            };
                        },function(){
                            if(confirm('下载'+static_list[0]+'失败，是否继续下载？')){
                                download5();
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
            httpRequest.open("GET",'http://diuse.hao1237.top/Diuse/extension/online_version.js',true);
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
                                game.download('http://diuse.hao1237.top/Diuse/extension/files.js','extension/术樱/files.js',function(){},function(){});
                                game.download('http://diuse.hao1237.top/Diuse/extension/version.js','extension/术樱/version.js',function(){},function(){});
                                game.download('http://diuse.hao1237.top/Diuse/extension/extension.js','extension/术樱/extension.js',function(){
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
                                game.download('http://diuse.hao1237.top/Diuse/extension/files.js','extension/术樱/files.js',function(){},function(){});
                                game.download('http://diuse.hao1237.top/Diuse/extension/version.js','extension/术樱/version.js',function(){},function(){});
                                game.download('http://diuse.hao1237.top/Diuse/extension/extension.js','extension/术樱/extension.js',function(){
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
                            game.download('http://diuse.hao1237.top/Diuse/extension/files.js','extension/术樱/files.js',function(){},function(){});
                            game.download('http://diuse.hao1237.top/Diuse/extension/version.js','extension/术樱/version.js',function(){},function(){});
                            game.download('http://diuse.hao1237.top/Diuse/extension/extension.js','extension/术樱/extension.js',function(){
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

        download_beta_version=function(){
            var online_version;
            var httpRequest = new XMLHttpRequest();
            httpRequest.open("GET",'http://diuse.hao1237.top/Diuse/beta_extension/online_version.js',true);
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
                                game.download('http://diuse.hao1237.top/Diuse/beta_extension/files.js','extension/术樱/files.js',function(){},function(){});
                                game.download('http://diuse.hao1237.top/Diuse/beta_extension/version.js','extension/术樱/version.js',function(){},function(){});
                                game.download('http://diuse.hao1237.top/Diuse/beta_extension/extension.js','extension/术樱/extension.js',function(){
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
                            if(confirm('检测到最新测试版本为:'+online_version+'本地版本为:'+local_version)){
                                game.download('http://diuse.hao1237.top/Diuse/beta_extension/files.js','extension/术樱/files.js',function(){},function(){});
                                game.download('http://diuse.hao1237.top/Diuse/beta_extension/version.js','extension/术樱/version.js',function(){},function(){});
                                game.download('http://diuse.hao1237.top/Diuse/beta_extension/extension.js','extension/术樱/extension.js',function(){
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
                            game.download('http://diuse.hao1237.top/Diuse/beta_extension/files.js','extension/术樱/files.js',function(){},function(){});
                            game.download('http://diuse.hao1237.top/Diuse/beta_extension/version.js','extension/术樱/version.js',function(){},function(){});
                            game.download('http://diuse.hao1237.top/Diuse/beta_extension/extension.js','extension/术樱/extension.js',function(){
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
                        game.download('http://diuse.hao1237.top/Diuse/skin/'+list[0],'extension/术樱/'+list[0],function(){
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
                        game.download('http://diuse.hao1237.top/Diuse/image/static/'+list[0],'extension/术樱/'+list[0],function(){
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
                    game.download('http://diuse.hao1237.top/Diuse/image/tianshu/'+list[0],'extension/术樱/'+list[0],function(){
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
            if(lib.config.extension_术樱_Skin){
                var url_files=dynamic_name.substring(0,dynamic_name.length-4);
                skinList(url_files);
            } else {
                game.download('http://diuse.hao1237.top/Diuse/image/dynamic/'+dynamic_name,'extension/术樱/'+dynamic_name,function(){
                    Diuse_Button=true;
                    alert('所选皮肤下载完毕!');
                },function(){
                    if(confirm('下载'+dynamic_name+'失败，是否继续下载？')){
                        download_dynamic(dynamic_name);
                    }
                });
            }
        };
        download_dynamic_all=function(){
            lib.init.js(url,'files',function(){
                var list=Diuse_dynamic;
                var num=0;
                var num1=list.length;
                document.body.appendChild(Diuse_Text);
                var download1=function(){
                    game.download('http://diuse.hao1237.top/Diuse/image/dynamic/'+list[0],'extension/术樱/'+list[0],function(){
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
                    game.download('http://diuse.hao1237.top/Diuse/image/dynamic/'+list[0],'extension/术樱/'+list[0],function(){
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

        skinList=function(){
            lib.init.js(url,'files',function(){
                var num=0;
                var skin_list=Skin;
                var skin_num;
                var file_url='image/skin/';
                var file_length=0;
                document.body.appendChild(Diuse_Text);
                var down=function(){
                    switch(skin_list[0]){
                        case 'Diuse_Fuhua':{
                            skin_num=Diuse_Fuhua_Skin;
                            break;
                        }
                        case 'Diuse_Bachongying':{
                            skin_num=Diuse_Bachongying_Skin;
                            break;
                        }
                        case 'Diuse_Buluoniya':{
                            skin_num=Diuse_Buluoniya_Skin;
                            break;
                        }
                        case 'Diuse_Kalian':{
                            skin_num=Diuse_Kalian_Skin;
                            break;
                        }
                        case 'Diuse_Shangxian':{
                            skin_num=Diuse_Shangxian_Skin;
                            break;
                        }
                        case 'Diuse_Shilv':{
                            skin_num=Diuse_Shilv_Skin;
                            break;
                        }
                        case 'Diuse_Xier':{
                            skin_num=Diuse_Xier_Skin;
                            break;
                        }
                        case 'Diuse_Yayi':{
                            skin_num=Diuse_Yayi_Skin;
                            break;
                        }
                        case 'Diuse_Yuexia':{
                            skin_num=Diuse_Yuexia_Skin;
                            break;
                        }
                        case 'Diuse_Konglv':{
                            skin_num=Diuse_Konglv_Skin;
                            break;
                        }
                        case 'Diuse_Heixi':{
                            skin_num=Diuse_Heixi_Skin;
                            break;
                        }
                        case 'Diuse_Bachongshenzi':{
                            skin_num=Diuse_Bachongshenzi_Skin;
                            break;
                        }
                        case 'Diuse_Keli':{
                            skin_num=Diuse_Keli_Skin;
                            break;
                        }
                        case 'Diuse_Shuangzi':{
                            skin_num=Diuse_Shuangzi_Skin;
                            break;
                        }
                        case 'Diuse_Lanmei':{
                            skin_num=Diuse_Lanmei_Skin;
                            break;
                        }
                        case 'Diuse_Yingtao':{
                            skin_num=Diuse_Yingtao_Skin;
                            break;
                        }
                    }
                    url_Diuse_search=file_url+skin_list[0]+'/'+skin_num[0]+'.jpg';
                    file_length+=skin_list.length;
                    game.readFile(url_Diuse_search,function(){
                        num++;
                        skin_num.remove(skin_num[0]);
                        if(skin_list.length>0||skin_num.length>0){
                            if(skin_num.length<=0) skin_list.remove(skin_list[0]);
                            Diuse_Text.innerHTML='正在补充Skin（'+num+'/'+file_length+'）';
                            down();
                        }else{
                            Diuse_Text.innerHTML='补充完毕';
                            Diuse_Button=true;
                            alert('皮肤下载完毕!');
                            document.body.removeChild(Diuse_Text);
                        }
                    },function(){
                            num++;
                            skin_num.remove(skin_num[0]);
                            if(skin_list.length>0||skin_num.length>0){
                                if(skin_num.length<=0) skin_list.remove(skin_list[0]);
                                Diuse_Text.innerHTML='正在补充Skin（'+num+'/'+file_length+'）';
                                down();
                            }else{
                                Diuse_Text.innerHTML='补充完毕';
                                Diuse_Button=true;
                                alert('皮肤下载完毕!');
                                document.body.removeChild(Diuse_Text);
                            };
                        // game.download('https://diuse.coding.net/p/extension/d/noname_Skin/git/raw/master/Skin/'+skin_list[0]+'/'+skin_num[0]+'.jpg','image/skin/'+skin_list[0]+'/'+skin_num[0]+'.jpg',function(){
                        //     num++;
                        //     skin_num.remove(skin_num[0]);
                        //     if(skin_list.length>0||skin_num.length>0){
                        //         if(skin_num.length<=0) skin_list.remove(skin_list[0]);
                        //         Diuse_Text.innerHTML='正在补充Skin（'+num+'/'+file_length+'）';
                        //         down();
                        //     }else{
                        //         Diuse_Text.innerHTML='补充完毕';
                        //         Diuse_Button=true;
                        //         alert('皮肤下载完毕!');
                        //         document.body.removeChild(Diuse_Text);
                        //     };
                        // },function(){
                        //     if(confirm('下载'+skin_list[0]+'失败，是否继续下载？')){
                        //         down();
                        //     }
                        // });
                    });
                }
                down();
            },function(){
                Diuse_Button=true;
                alert('本地资源不完整！请检查文件完整性。');
            });
        };
        RepairBug=function(){
            game.saveConfig('extension_术樱_Beta',false);
            lib.init.js(url,'files',function(){
                lib.init.js(url,'version',function(){RepairBugGo();},function(){
                    game.download('http://diuse.hao1237.top/Diuse/extension/version.js','extension/术樱/version.js',function(){alert('version资源修复成功！');Diuse_Button=true;},function(){alert('version资源修复失败！');Diuse_Button=true;});
                });
            },function(){
                game.download('http://diuse.hao1237.top/Diuse/extension/files.js','extension/术樱/files.js',function(){alert('files资源修复成功！');Diuse_Button=true;},function(){alert('files资源修复失败！');Diuse_Button=true;});
                lib.init.js(url,'version',function(){},function(){
                    game.download('http://diuse.hao1237.top/Diuse/extension/version.js','extension/术樱/version.js',function(){alert('version资源修复成功！');Diuse_Button=true;},function(){alert('version资源修复失败！');Diuse_Button=true;});
                });
            });
        };
        RepairBugGo=function(){
            Diuse_Button=true;
            if(confirm('本地资源文件检测无误，若有问题点击确定重新下载全部资源。')){
                Diuse_Button=false;
                game.download('http://diuse.hao1237.top/Diuse/extension/files.js','extension/术樱/files.js',function(){},function(){});
                game.download('http://diuse.hao1237.top/Diuse/extension/version.js','extension/术樱/version.js',function(){},function(){});
                game.download('http://diuse.hao1237.top/Diuse/extension/extension.js','extension/术樱/extension.js',function(){
                    Diuse_Button=true;
                    alert('下载完成，重启生效');
                },function(){
                    Diuse_Button=true;
                    alert('下载失败');
                });
            }
        };

        Diuse_downText=function(){
            time=setTimeout(()=>{
            },1000)
        };
        Diuse_upText=function(type){
            clearTimeout(time);
            switch(type){
                case 0:
                    alert();
                case 1:
                    alert('三张重复'+
                    '\n【桃】 恢复两点体力并摸三张牌'+
                    '\n【闪】 此杀必须两张闪响应 然后你摸两张牌'+
                    '\n【杀】 此杀不可被响应 出杀次数上限+2'+
                    '\n【酒】 此杀伤害+3\n'+
                    '\n两张重复'+
                    '\n【桃】 恢复一点体力并摸两张牌'+
                    '\n【闪】 此杀需要打出两张闪响应'+
                    '\n【杀】 不可以被响应'+
                    '\n【酒】 此杀伤害+2\n'+
                    '\n一张重复'+
                    '\n【桃】 命中后恢复一点体力'+
                    '\n【闪】 命中后摸一张牌'+
                    '\n【杀】 出杀次数上限+1'+
                    '\n【酒】 此杀伤害+1');
                break;
                case 2:
                    alert('根据武器攻击距离获得相应技能\n'+
                        '一:当你于你的回合内使用一张牌后，你可以弃置一张手牌并摸一张牌。\n'+
                        '二:当你于回合内获得一张牌且不是因为此技能获得牌时，你摸一张牌。\n'+
                        '三:出牌阶段限两次。你造成伤害后你可以让场上的一名角色受到一点无伤害来源的伤害。\n'+
                        '四:你使用杀或普通锦囊后你可以多增加一个目标，如果取消则摸X张牌(X为你已损失的体力，如果为0则摸1)\n'+
                        '五:出牌阶段限一次，当你使用可造成伤害的牌指定目标后你可以选择其一个目标然后你摸X张牌。(X为目标当前体力)\n'+
                        '六:获得全部技能效果。\n');

                break;
            }
        };

    	// game.导入card=function(英文名,翻译名,obj){var oobj=get.copy(obj);oobj.list=obj.card.list;oobj.card=obj.card.card;oobj.skill=obj.skill.skill;oobj.translate=Object.assign({},obj.card.translate,obj.skill.translate);game.import('card',function(){return oobj});lib.config.all.cards.push(英文名);if(!lib.config.cards.contains(英文名))lib.config.cards.push(英文名);lib.translate[英文名+'_card_config']=翻译名;};
		// game.新增势力=function(名字,映射,渐变){var n,t;if(!名字)return;if(typeof 名字=="string"){n=名字;t=名字}else if(Array.isArray(名字)&&名字.length==2&&typeof 名字[0]=="string"){n=名字[0];t=名字[1]}else return;if(!映射||!Array.isArray(映射)||映射.length!=3)映射=[199,21,133];var y="("+映射[0]+","+映射[1]+","+映射[2];var y1=y+",1)",y2=y+")";var s=document.createElement('style');var l;l=".player .identity[data-color='diy"+n+"'],";l+="div[data-nature='diy"+n+"'],";l+="span[data-nature='diy"+n+"'] {text-shadow: black 0 0 1px,rgba"+y1+" 0 0 2px,rgba"+y1+" 0 0 5px,rgba"+y1+" 0 0 10px,rgba"+y1+" 0 0 10px}";l+="div[data-nature='diy"+n+"m'],";l+="span[data-nature='diy"+n+"m'] {text-shadow: black 0 0 1px,rgba"+y1+" 0 0 2px,rgba"+y1+" 0 0 5px,rgba"+y1+" 0 0 5px,rgba"+y1+" 0 0 5px,black 0 0 1px;}";l+="div[data-nature='diy"+n+"mm'],";l+="span[data-nature='diy"+n+"mm'] {text-shadow: black 0 0 1px,rgba"+y1+" 0 0 2px,rgba"+y1+" 0 0 2px,rgba"+y1+" 0 0 2px,rgba"+y1+" 0 0 2px,black 0 0 1px;}";s.innerHTML=l;document.head.appendChild(s);if(渐变&&Array.isArray(渐变)&&Array.isArray(渐变[0])&&渐变[0].length==3){var str="",st2=[];for(var i=0;i<渐变.length;i++){str+=",rgb("+渐变[i][0]+","+渐变[i][1]+","+渐变[i][2]+")";if(i<2)st2[i]="rgb("+渐变[i][0]+","+渐变[i][1]+","+渐变[i][2]+")";}var tenUi = document.createElement('style');tenUi.innerHTML = ".player>.camp-zone[data-camp='"+n+"']>.camp-back {background: linear-gradient(to bottom"+str+");}";tenUi.innerHTML += ".player>.camp-zone[data-camp='"+n+"']>.camp-name {text-shadow: 0 0 5px "+st2[0]+", 0 0 10px "+st2[1]+";}";document.head.appendChild(tenUi);}lib.group.add(n);lib.translate[n]= t;lib.groupnature[n]= "diy"+n;};
    }
},help:{},config:{},package:{
    card:{
        game:{
            Diuse_numRandom:function(){ //随机1到100
                var num = Math.floor(Math.random() * (100 - 1)) + 1;
                return num;
            },
            Diuse_randomNum:function(Max,Min){ //随机 上限 到 下限
                var num = Math.floor(Math.random() * (Max - Min)) + 1;
                return num;
            },
        },
        card:{
            Diuse_Liannu:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				ai:{
					order:function(){
						return get.order({name:'sha'})-0.1;
					},
					equipValue:function(card,player){
						if(player._Diuse_Liannu_temp) return 1;
						player._Diuse_Liannu_temp=true;
						var result=function(){
							if(!game.hasPlayer(function(current){
								return get.distance(player,current)<=1&&player.canUse('sha',current)&&get.effect(current,{name:'sha'},player,player)>0;
							})){
								return 1;
							}
							if(player.hasSha()&&_status.currentPhase==player){
								if(player.getEquip('Diuse_Liannu')&&player.countUsed('sha')||player.getCardUsable('sha')==0){
									return 10;
								}
							}
							var num=player.countCards('h','sha');
							if(num>1) return 6+num;
							return 3+num;
						}();
						delete player._Diuse_Liannu_temp;
						return result;
					},
					basic:{
						equipValue:5
					},
					tag:{
						valueswap:1
					}
				},
				skills:['Diuse_Liannu_skill']
			},
        },
        skill:{
            Diuse_Liannu_skill:{
				equipSkill:true,
				audio:true,
				firstDo:true,
				trigger:{player:'useCard1'},
				forced:true,
				filter:function(event,player){
					return !event.audioed&&event.card.name=='sha'&&player.countUsed('sha',true)>1&&event.getParent().type=='phase';
				},
				content:function(){
					trigger.audioed=true;
				},
				mod:{
					cardUsable:function(card,player,num){
						var cardx=player.getEquip('Diuse_Liannu');
						if(card.name=='sha'&&(!cardx||player.hasSkill('Diuse_Liannu_skill',null,false)||(!_status.Diuse_Liannu_temp&&!ui.selected.cards.contains(cardx)))){
							if(get.is.versus()||get.is.changban()){
								return num+3;
							}
							return num+3;
						}
					},
					cardEnabled2:function(card,player){
						if(!_status.event.addCount_extra||player.hasSkill('Diuse_Liannu_skill',null,false)) return;
						if(card&&card==player.getEquip('Diuse_Liannu')){
							try{
								var cardz=get.card();
							}
							catch(e){
								return;
							}
							if(!cardz||cardz.name!='sha') return;
							_status.Diuse_Liannu_temp=true;
							var bool=lib.filter.cardUsable(get.autoViewAs({name:'sha'},ui.selected.cards.concat([card])),player);
							delete _status.Diuse_Liannu_temp;
							if(!bool) return false;
						}
					},
				},
			},
        },
        translate:{
            Diuse_Liannu:'连弩',
            Diuse_Liannu_skill:'连弩',
            Diuse_Liannu_skill_info:'锁定技，每个出牌阶段你可以使用4张【杀】',
			Diuse_Liannu_info:'锁定技，每个出牌阶段你可以使用4张【杀】',
        },
        list:[],
    },
    intro:"所有素材均来自互联网，侵权必删。",
    author:"",
    diskURL:"",
    forumURL:"",
    version:"",
},files:{"character":[""],"card":[],"skill":[]}}})