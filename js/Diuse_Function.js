window.func = function(lib,game,ui,get,ai,_status)
{
    //ALL
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
        },
        //group:'kagari_zongsi',
    };

    lib.element.player.Diuse_isMaxAttackRange=function(equal){ //攻击距离最大
        for(var i=0;i<game.players.length;i++){
            if(game.players[i].isOut()||game.players[i]==this) continue;
            if(equal){
                if(game.players[i].getAttackRange()>=this.getAttackRange()) return false;
            } else {
                if(game.players[i].getAttackRange()>this.getAttackRange()) return false;
            }
        }
        return true;
    };

    lib.element.player.Diuse_isMinAttackRange=function(equal){ //攻击距离最小
        for(var i=0;i<game.players.length;i++){
            if(game.players[i].isOut()||game.players[i]==this) continue;
            if(equal){
                if(game.players[i].getAttackRange()<=this.getAttackRange()) return false;
            } else {
                if(game.players[i].getAttackRange()<this.getAttackRange()) return false;
            }
        }
        return true;
    };

    lib.element.player.Diuse_isMaxBasicCards=function(equal){ //基本牌最多
        for(var i=0;i<game.players.length;i++){
            if(game.players[i].isOut()||game.players[i]==this) continue;
            if(equal){
                if(game.players[i].countCards('h',function(card){
                    return get.type(card)=='basic';
                })>=this.countCards('h',function(card){
                    return get.type(card)=='basic';
                })) return false;
            } else {
                if(game.players[i].countCards('h',function(card){
                    return get.type(card)=='basic';
                })>this.countCards('h',function(card){
                    return get.type(card)=='basic';
                })) return false;
            }
        }
        return true;
    };

    lib.element.player.Diuse_isMinBasicCards=function(equal){ //基本牌最少
        for(var i=0;i<game.players.length;i++){
            if(game.players[i].isOut()||game.players[i]==this) continue;
            if(equal){
                if(game.players[i].countCards('h',function(card){
                    return get.type(card)=='basic';
                })<=this.countCards('h',function(card){
                    return get.type(card)=='basic';
                })) return false;
            } else {
                if(game.players[i].countCards('h',function(card){
                    return get.type(card)=='basic';
                })<this.countCards('h',function(card){
                    return get.type(card)=='basic';
                })) return false;
            }
        }
        return true;
    };

    lib.element.player.Diuse_isCardColor=function(){ //手牌颜色是否一致
        var cards=this.getCards('h');
        if(cards.length<=0) return false;
        var color=get.color(cards[0]);
        if(!cards) return false;
        for(var i=1;i<cards.length;i++){
            if(get.color(cards[i])!=color) return false;
        }
        return true;
    };

    lib.element.player.Diuse_Shanbeng=function(same,card_name){ //山崩技能
        switch(card_name){
            case 'sha':{if(same==1){this.getStat().card.sha--;} else if(same==2){this.addTempSkill('Shanbeng_same_2_sha','shaAfter')} else {this.addTempSkill('Shanbeng_same_3_sha','shaAfter')};break;}
            case 'shan':{if(same==1){this.addTempSkill('Shanbeng_same_1_shan','shaAfter')}else if(same==2){this.addTempSkill('Shanbeng_same_2_shan','shaAfter')}else{this.addTempSkill('Shanbeng_same_3_shan','shaAfter')};break;}
            case 'tao':{if(same==1){this.addTempSkill('Shanbeng_same_1_tao','shaAfter')}else if(same==2){this.addTempSkill('Shanbeng_same_2_tao','shaAfter')}else{this.addTempSkill('Shanbeng_same_3_tao','shaAfter')};break;}
            case 'jiu':{if(same==1){this.addTempSkill('Shanbeng_same_1_jiu','shaAfter')}else if(same==2){this.addTempSkill('Shanbeng_same_2_jiu','shaAfter')}else{this.addTempSkill('Shanbeng_same_3_jiu','shaAfter')};break;}
        }
    };

    lib.element.player.Diuse_playerHpMax=function(){ //判断敌对最大体力的角色但不是唯一
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

    lib.element.player.Diuse_playerCardMax=function(){ //判断敌对最多手牌的角色但不是唯一
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

    lib.element.player.Diuse_damagePlayerHp=function(hp,mission){ //对体力值 大于 或 等于 你的角色造成hp点伤害 mission难度
        if(hp==undefined){hp=1;} //防止忘填写 或 默认1
        for(var i=0;i<game.players.length;i++){
            if(game.players[i].isOut()||game.players[i]==this) continue;
            if(!game.players[i].isFriendOf(this)){
                if(mission==3){
                    if(game.players[i].hp>=this.hp){
                        game.players[i].damage(hp);
                        break;
                    }
                } else {
                    if(game.players[i].hp>this.hp){
                        game.players[i].damage(hp);
                        break;
                    }
                }
            }
        }
    };

    lib.element.player.Diuse_playerRandom=function(){ //随机一名敌对角色
        var listName=[];
        for(var i=0;i<game.players.length;i++){
            if(game.players[i].isOut()||game.players[i]==this) continue;
            if(!game.players[i].isFriendOf(this)){
                listName.push(game.players[i]);
            }
        }
        return listName.randomGet();
    }

    lib.element.player.Diuse_gameBossAllDie=function(num3){ //判断天书相应关卡boss是否阵亡和转移Boss控制权
        for(var i=0;i<game.players.length;i++){
            if(game.players[i]==this) continue;
            if(game.boss.isFriendOf(game.players[i])){
                if(num3) {
                    _status.gameMe=true;
                    game.players[i]._trueMe=game.me;
                }
                return false;
            }
        }
        return true;
    };

    lib.element.player.Diuse_removeAllSkills=function(){ //移除全部技能
        for(var i=0;i<game.players.length;i++){
            game.players[i].addSkill('Diuse_removeSkills');
        }
    };

    lib.element.player.Diuse_addAllSkills=function(){ //恢复全部技能
        for(var i=0;i<game.players.length;i++){
            game.players[i].removeSkill('Diuse_removeSkills');
        }
    };

    lib.element.player.Diuse_bossTianshuName=function(num,a){ //全部boss 可以用于调用和匹配boss
        if(a==undefined) a=-99;
        var liveList=['Xvni_Xiaotao','Xvni_Xiaosha','Xvni_Xiaojiu','Xvni_Xiaoshan','Xvni_Xiaole'];
        /*var oneList=['Shengxiao_Youji','Zhuogui_Boss_Niaozui'];*/
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
                var list=[];
                if(lib.config.extension_术樱_randomoff){
                    if(a==1){
                        if(Newlist==''||Newlist==undefined){
                            list.push.apply(list,twoOrdinaryList);
                            list.push.apply(list,threeOrdinaryList);
                            list.push.apply(list,fourOrdinaryList);
                        } else {
                            list.push.apply(list,twoOrdinaryList);
                            list.push.apply(list,threeOrdinaryList);
                            list.push.apply(list,fourOrdinaryList);
                            list.push.apply(list,Newlist);
                        }
                        if(list.contains(this.name)) return true;
                    } else if(a==2){
                        if(Newlist==''||Newlist==undefined){
                            list.push.apply(list,twoDifficultyList);
                            list.push.apply(list,threeDifficultyList);
                            list.push.apply(list,fourDifficultyList);
                        } else {
                            list.push.apply(list,twoDifficultyList);
                            list.push.apply(list,threeDifficultyList);
                            list.push.apply(list,fourDifficultyList);
                            list.push.apply(list,Newlist);
                        }
                        if(list.contains(this.name)) return true;
                    } else {
                        if(Newlist==''||Newlist==undefined){
                            list.push.apply(list,twoFuckingList);
                            list.push.apply(list,threeFuckingList);
                            list.push.apply(list,fourFuckingList);
                        } else {
                            list.push.apply(list,twoFuckingList);
                            list.push.apply(list,threeFuckingList);
                            list.push.apply(list,fourFuckingList);
                            list.push.apply(list,Newlist);
                        }
                        if(list.contains(this.name)) return true;
                    }
                    return false;
                } else {
                    if(Newlist==''||Newlist==undefined) return false;
                    for(var i=0;i<Newlist.length;i++){
                        if(this.name==Newlist[i]) return true;
                    }
                    return false;
                }
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
                var list=[];
                if(lib.config.extension_术樱_randomoff){
                    if(a==1){
                        if(Newlist==''||Newlist==undefined){
                            list.push.apply(list,twoOrdinaryList);
                            list.push.apply(list,threeOrdinaryList);
                            list.push.apply(list,fourOrdinaryList);
                        } else {
                            list.push.apply(list,twoOrdinaryList);
                            list.push.apply(list,threeOrdinaryList);
                            list.push.apply(list,fourOrdinaryList);
                            list.push.apply(list,Newlist);
                        }
                        var newBoss=list.randomGet();
                        for(var i=0;i<game.players.length;i++){
                            if(newBoss==game.players[i].name){
                                newBoss=Newlist.randomGet();
                                i=0;
                            }
                        }
                    } else if(a==2){
                        if(Newlist==''||Newlist==undefined){
                            list.push.apply(list,twoDifficultyList);
                            list.push.apply(list,threeDifficultyList);
                            list.push.apply(list,fourDifficultyList);
                        } else {
                            list.push.apply(list,twoDifficultyList);
                            list.push.apply(list,threeDifficultyList);
                            list.push.apply(list,fourDifficultyList);
                            list.push.apply(list,Newlist);
                        }
                        var newBoss=list.randomGet();
                        for(var i=0;i<game.players.length;i++){
                            if(newBoss==game.players[i].name){
                                newBoss=Newlist.randomGet();
                                i=0;
                            }
                        }
                    } else {
                        if(Newlist==''||Newlist==undefined){
                            list.push.apply(list,twoFuckingList);
                            list.push.apply(list,threeFuckingList);
                            list.push.apply(list,fourFuckingList);
                        } else {
                            list.push.apply(list,twoFuckingList);
                            list.push.apply(list,threeFuckingList);
                            list.push.apply(list,fourFuckingList);
                            list.push.apply(list,Newlist);
                        }
                        var newBoss=list.randomGet();
                        for(var i=0;i<game.players.length;i++){
                            if(newBoss==game.players[i].name){
                                newBoss=Newlist.randomGet();
                                i=0;
                            }
                        }
                    }
                    return newBoss;
                } else {
                    if(Newlist==''||Newlist==undefined||Newlist.length==1){
                        if(lib.config.extension_术樱_tianshu_addBoss&&_status.Diuse_Xvni_Bool==false){
                            alert('检测到关闭虚拟偶像和关闭混合Boss，请检查Boss列表或Boss数量不足三个，即将重启');
                            setTimeout(function(){
                                setTimeout(game.reload,1500);
                            }, 1500);
                        } else {
                            alert('检测到关闭混合Boss，请检查Boss列表或只有一位Boss，即将重启');
                            setTimeout(function(){
                                setTimeout(game.reload,1500);
                            }, 1500);
                        }
                    }
                    var newBoss=Newlist.randomGet();
                    for(var i=0;i<game.players.length;i++){
                        if(newBoss==game.players[i].name){
                            newBoss=Newlist.randomGet();
                            i=0;
                        }
                    }
                }
                return newBoss;
            }
            default:{return false}
        }
    };

    lib.element.player.Diuse_hidePlayer=function(){ //隐藏Boss
        for(var i=0;i<game.dead.length;i++){
            this.hide();
            game.addVideo('hidePlayer',this);
            if(game.dead[i].isFriendOf(game.boss)) {
                game.dead[i].hide();
                game.addVideo('hidePlayer',game.dead[i]);
            }
        }
    };

    lib.element.player.Diuse_showCharacter=function(){ //选择英雄作战
        var next=game.createEvent('Diuse_showShop');
        next.player=this;
        next.setContent(function(){
            'step 0'
            event._result.char=[];
            var characterList=['Diuse_Liubei','Diuse_Caocao','Diuse_Sunquan'];
            var name=[],image;
            for(var i=0;i<characterList.length;i++){
                image=game.Diuse_search(characterList[i],'char',true);
                name.add(image);
            }
            var chooseButton=function(){
                var event=_status.event;
                if(!event._result) event._result={};
                var dialog=ui.create.dialog([name,'character']);
                dialog.addText('请选择你的角色');
                event.dialog=dialog;
                var table=document.createElement('div');
                table.classList.add('add-setting');
                table.style.margin='0';
                table.style.width='100%';
                table.style.position='relative';
                for(var i=0;i<name.length;i++){
                    var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
                    td.link=name[i];
                    table.appendChild(td);
                    td.innerHTML='<span>'+get.translation(name[i])+'</span>';
                    td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
                        if(_status.dragged) return;
                        if(_status.justdragged) return;
                        _status.tempNoButton=true;
                        setTimeout(function(){
                            _status.tempNoButton=false;
                        },500);
                        var link=this.link;
                        if(!this.classList.contains('bluebg')){
                            if(event._result.char.length>=1) return;
                            for(var j=0;j<name.length;j++){
                                if(name[j]==link) event._result.char.add(name[j]); continue;
                            }
                            event.control_ok=ui.create.control('ok',function(link){
                                event.dialog.close();
                                event.control_ok.close();
                                game.resume();
                                _status.imchoosing=false;
                            });
                            this.classList.add('bluebg');
                        }
                        else{
                            event.control_ok.close();
                            this.classList.remove('bluebg');
                            for(var j=0;j<name.length;j++){
                                if(name[j]==link) event._result.char.remove(name[j]); continue;
                            }
                        }
                    });
                }
                dialog.content.appendChild(table);
                dialog.add('　　');
                dialog.open();

                for(var i=0;i<event.dialog.buttons.length;i++){
                    event.dialog.buttons[i].classList.add('selectable');
                }
                game.pause();
                game.countChoose();
            };
            chooseButton();
            'step 1'
            if(event._result.char!=''&&event._result.char!=undefined){
                _status.Diuse_PVEPlayer.reinit(_status.Diuse_PVEPlayer.name,event._result.char[0]);
                _status.Diuse_cardLibrary=game.Diuse_cardLibrary(event._result.char[0]);
                _status.Diuse_newEvent=0;
                game.Diuse_generateSequence();
            }
        });
    };

    lib.element.player.Diuse_showShop=function(){ //商店
        var next=game.createEvent('Diuse_showShop');
        next.player=this;
        next.setContent(function(){
            var name=[];
            var image=game.Diuse_search('蒲元');
            name.add(image);
            'step 0'
            var card=[];
            var money=[];
            for(var j=0;j<5;j++){
                var list=game.Diuse_storeCard('puyuan');
                image=game.Diuse_search(list,'card');
                var price=game.Diuse_shopPrice(list,'weapon');
                card.push(image);
                money.push(price);
            }
            var chooseButton=function(){
                var event=_status.event;
                if(!event._result) event._result={};
                event._result.cards=[];
                var dialog=ui.create.dialog([name,'character']);
                dialog.addText('新造铁刀，就此售卖，不知可看中一二(选项在下面)'+'<br>你当前还有'+game.Diuse_moneyTranslate()+'钱');
                dialog.add([card,'vcard']);
                event.dialog=dialog;
                var table=document.createElement('div');
                table.classList.add('add-setting');
                table.style.margin='0';
                table.style.width='100%';
                table.style.position='relative';
                for(var i=0;i<money.length;i++){
                    var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
                    td.link=money[i];
                    table.appendChild(td);
                    td.innerHTML='<span>'+get.translation(money[i])+'</span>';
                    td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
                        if(_status.dragged) return;
                        if(_status.justdragged) return;
                        _status.tempNoButton=true;
                        setTimeout(function(){
                            _status.tempNoButton=false;
                        },500);
                        var link=this.link;
                        if(!this.classList.contains('bluebg')){
                            if(event._result.cards.length>=1) return;
                            for(var j=0;j<money.length;j++){
                                if(money[j]==link) event._result.cards.add(card[j]); continue;
                            }
                            event.control_ok=ui.create.control('ok',function(link){
                                event.dialog.close();
                                event.control_ok.close();
                                event.control_cancel.close();
                                game.resume();
                                _status.imchoosing=false;
                            });
                            this.classList.add('bluebg');
                        }
                        else{
                            event.control_ok.close();
                            this.classList.remove('bluebg');
                            for(var j=0;j<money.length;j++){
                                if(money[j]==link) event._result.cards.remove(card[j]); continue;
                            }
                        }
                    });
                }
                dialog.content.appendChild(table);
                event.control_cancel=ui.create.control('cancel',function(link){
                    event.dialog.close();
                    if(event.control_ok) event.control_ok.close();
                    event.control_cancel.close();
                    game.resume();
                    _status.imchoosing=false;
                });
                dialog.add('　　');
                dialog.open();

                for(var i=0;i<event.dialog.buttons.length;i++){
                    event.dialog.buttons[i].classList.add('selectable');
                }
                game.pause();
                game.countChoose();
            };
            chooseButton();
            'step 1'
            var chooseButton=function(){
                var dialog=ui.create.dialog([name,'character']);
                if(bool) dialog.addText('已遣派人手将'+get.translation(event._result.cards)+'送予将军!');
                else dialog.addText('公何故欺我?(你的银两不够哦');;
                
                event.dialog=dialog;
                event.control=ui.create.control('ok',function(link){
                    event.dialog.close();
                    event.control.close();
                    game.resume();
                    _status.imchoosing=false;
                });

                dialog.add('　　');
                dialog.open();
                game.pause();
                game.countChoose();
            };

            if(event._result.cards!=''&&event._result.cards!=undefined){
                var price=game.Diuse_shopPrice(get.translation(event._result.cards),'weapon');
                var num=game.Diuse_moneyTranslate('zh',price);
                var bool=event._result.cards&&_status.Diuse_money>=num;

                chooseButton();
                if(bool) _status.Diuse_money-=num;
                game.Diuse_addNewCard(event._result.cards,'equip');
            }
        });
    };

    lib.element.player.Diuse_eventEnd=function(){ //事件结束
        var next=game.createEvent('Diuse_eventEnd');
        next.player=this;
        next.setContent(function(){
            var name=[];
            var image=game.Diuse_search(get.translation(_status.Diuse_PVEPlayer));
            name.add(image);
            var chooseButton=function(){
                var dialog=ui.create.dialog([name,'character']);
                var table=document.createElement('plot');
                var Diuse_eventText='事件暂时告一段落...';
                table.innerHTML=Diuse_eventText;
                var Text=document.createElement('plot_text');
                var index=0;
                var word=table.innerHTML;
                event.dialog=dialog;
                event.control=ui.create.control('ok',function(link){
                    event.dialog.close();
                    event.control.close();
                    game.resume();
                    _status.imchoosing=false;
                });

                dialog.content.appendChild(Text);

                dialog.add('　　');
                dialog.open();
                game.pause();
                game.countChoose();
                function type(){
                    Text.innerText = word.substring(0,index++);
                }
                setInterval(type, 250);
            };
            chooseButton();
        });
    };

    lib.element.player.Diuse_showEvent=function(){ //事件
        var next=game.createEvent('Diuse_showEvent');
        next.player=this;
        next.setContent(function(){
            'step 0'
            event._result.char=[];
            event.eventDetail=_status.Diuse_Fengyun_checkPoint[_status.Diuse_newEvent];
            var chooseButton=function(){
                var event=_status.event;
                if(!event._result) event._result={};
                if(event.eventType=='treasure'){
                    text='请选择一个宝物';
                    var dialog=ui.create.dialog([name,'vcard']);
                } else if(event.eventType=='monster'){
                    text='请选择一个角色进行战斗';
                    var dialog=ui.create.dialog([name,'character']);
                } else {
                    text='请选择一个事件';
                    var dialog=ui.create.dialog([name,'vcard']);
                } 
                dialog.addText(text);
                event.dialog=dialog;
                var table=document.createElement('div');
                table.classList.add('add-setting');
                table.style.margin='0';
                table.style.width='100%';
                table.style.position='relative';
                for(var i=0;i<name.length;i++){
                    var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
                    td.link=name[i];
                    table.appendChild(td);
                    td.innerHTML='<span>'+get.translation(name[i])+'</span>';
                    dialog.addText(get.translation(name[i])+'：'+game.Diuse_getTranslate(name[i],'treasure'));
                    td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
                        if(_status.dragged) return;
                        if(_status.justdragged) return;
                        _status.tempNoButton=true;
                        setTimeout(function(){
                            _status.tempNoButton=false;
                        },500);
                        var link=this.link;
                        if(!this.classList.contains('bluebg')){
                            if(event._result.char.length>=1) return;
                            for(var j=0;j<name.length;j++){
                                if(name[j]==link) event._result.char.add(name[j]); continue;
                            } 
                            event.control_ok=ui.create.control('ok',function(link){
                                event.dialog.close();
                                event.control_ok.close();
                                event.control_cancel.close();
                                game.resume();
                                _status.imchoosing=false;
                            });
                            this.classList.add('bluebg');
                        }
                        else{
                            event.control_ok.close();
                            this.classList.remove('bluebg');
                            for(var j=0;j<name.length;j++){
                                if(name[j]==link) event._result.char.remove(name[j]); continue;
                            }
                        }
                    });
                }
                event.control_cancel=ui.create.control('cancel',function(link){
                    event.dialog.close();
                    if(event.control_ok) event.control_ok.close();
                    event.control_cancel.close();
                    game.resume();
                    _status.imchoosing=false;
                });

                dialog.content.appendChild(table);
                dialog.add('　　');
                dialog.open();

                for(var i=0;i<event.dialog.buttons.length;i++){
                    event.dialog.buttons[i].classList.add('selectable');
                }
                game.pause();
                game.countChoose();
            };
            chooseButton();
            'step 1'
            var eventType=event.eventDetail[0];
            alert(eventType)
            if(event._result.char!=''&&event._result.char!=undefined){
                
                alert(eventType)
            }
        });
    };

    lib.element.player.Diuse_reset=function(){
        'step 0'
        var num=this.countCards('hej');
        this.chooseToDiscard(num,'hej',true);
        'step 1'
        game.resetSkills();
        _status.paused=false;
        _status.event.step=0;
        game.phaseNumber=0;
        game.roundNumber=1;
        'step 2'
        delete _status.Diuse_newCard;
        _status.Diuse_newCard=[..._status.Diuse_cardLibrary];
        this.draw(6);
        'step 3'
        var cards=get.cards(ui.cardPile.childElementCount);
        for(var i=0;i<cards.length;i++){
            ui.cardPile.insertBefore(cards[i],ui.cardPile.childNodes[get.rand(ui.cardPile.childElementCount)]);
        }
        game.updateRoundNumber();
    };

    lib.element.player.Diuse_nextEvent=function(){
        var next=game.createEvent('Diuse_nextEvent');
        next.player=this;
        next.setContent(function(){
            'step 0'
            event._result=[];
            event.eventDetail=_status.Diuse_Fengyun_checkPoint[_status.Diuse_newEvent];
            var chooseButton=function(){
                var event=_status.event;
                if(!event._result) event._result={};
                var dialog=ui.create.dialog();
                dialog.addText('下个事件为战斗');
                event.dialog=dialog;
                var table=document.createElement('div');
                table.classList.add('add-setting');
                table.style.margin='0';
                table.style.width='100%';
                table.style.position='relative';
                alert(event.eventDetail)
                for(var i=0;i<event.eventDetail[1];i++){
                    var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
                    var name=event.eventDetail[2];
                    td.link=name[i];
                    table.appendChild(td);
                    td.innerHTML='<span>'+get.translation(name[i])+'</span>';
                    td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
                        if(_status.dragged) return;
                        if(_status.justdragged) return;
                        _status.tempNoButton=true;
                        setTimeout(function(){
                            _status.tempNoButton=false;
                        },500);
                        var link=this.link;
                        if(!this.classList.contains('bluebg')){
                            if(event._result.length>=1) return;
                            for(var j=0;j<name.length;j++){
                                if(name[j]==link) event._result.add(name[j]); continue;
                            } 
                            event.control_ok=ui.create.control('ok',function(link){
                                event.dialog.close();
                                event.control_ok.close();
                                game.resume();
                                _status.imchoosing=false;
                            });
                            this.classList.add('bluebg');
                        }
                        else{
                            event.control_ok.close();
                            this.classList.remove('bluebg');
                            for(var j=0;j<name.length;j++){
                                if(name[j]==link) event._result.remove(name[j]); continue;
                            }
                        }
                    });
                }
                dialog.content.appendChild(table);
                dialog.add('　　');
                dialog.open();

                for(var i=0;i<event.dialog.buttons.length;i++){
                    event.dialog.buttons[i].classList.add('selectable');
                }
                game.pause();
                game.countChoose();
            };
            chooseButton();
            'step 1'
            if(event._result!=''&&event._result!=undefined){
                _status.Diuse_newEvent++;
                var eventType=event.eventDetail;
                if(eventType[0]=='talent'){
                    _status.Diuse_PVEPlayer.addSkill('')
                }
                //_status.Diuse_PVEPlayer.Diuse_showEvent();
            }
        });
    };

    lib.element.player.Diuse_addExp=function(num){ //加经验
        var next=game.createEvent('Diuse_eventEnd');
        next.player=this;
        next.num=num;
        next.setContent(function(){
            _status.Diuse_exp+=this.num;
            while(_status.Diuse_exp>=game.Diuse_levelExp(_status.Diuse_level))
            {
                _status.Diuse_exp-=game.Diuse_levelExp(_status.Diuse_level);
                _status.Diuse_level++;
            }
            game.Diuse_eventText();
        });
    };
}