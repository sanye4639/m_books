export default {
    /*获取小说分类及列表*/
    get_bookType : function(type,param){
        if(type === 'type'){
            var datas ='';
            switch (param){
                case 1:
                    datas = '玄幻小说';
                    break;
                case 2:
                    datas = '修真小说';
                    break;
                case 3:
                    datas = '都市小说';
                    break;
                case 4:
                    datas = '穿越小说';
                    break;
                case 5:
                    datas = '网游小说';
                    break;
                case 6:
                    datas = '科幻小说';
                    break;
                case 0:
                    datas = [
                        {'id':'1','name':'玄幻'},
                        {'id':'2','name':'修真'},
                        {'id':'3','name':'都市'},
                        {'id':'4','name':'穿越'},
                        {'id':'5','name':'网游'},
                        {'id':'6','name':'科幻'},
                    ];
                    break;
            }
        }else if(type === 'rank'){
            switch (param){
                case 1:
                    datas = '日点击榜';
                    break;
                case 2:
                    datas = '周点击榜';
                    break;
                case 3:
                    datas = '月点击榜';
                    break;
                case 4:
                    datas = '总点击榜';
                    break;
              /*  case 5:
                    datas = '周推荐榜';
                    break;
                case 6:
                    datas = '月推荐榜';
                    break;
                case 7:
                    datas = '总推荐榜';
                    break;
                case 8:
                    datas = '总收藏榜';
                    break;*/
                case 0:
                    datas = [
                        {'id':'1','name':'日点击榜'},
                        {'id':'2','name':'周点击榜'},
                        {'id':'3','name':'月点击榜'},
                        {'id':'4','name':'总点击榜'},
                        // {'id':'5','name':'周推荐榜'},
                        // {'id':'6','name':'月推荐榜'},
                        // {'id':'7','name':'总推荐榜'},
                        // {'id':'8','name':'总收藏榜'},
                    ];
            }
        }else if(type === 'tj'){
            switch (param){
                case 1:
                    datas = '精品';
                    break;
                case 2:
                    datas = '推荐';
                    break;
                case 3:
                    datas = '热门';
                    break;
                case 0:
                    datas = [
                        {'id':'1','name':'精品'},
                        {'id':'2','name':'推荐'},
                        {'id':'3','name':'热门'},
                    ];
            }
        }else if(type === 'over'){
            switch (param){
                case 1:
                    datas = '连载';
                    break;
                case 2:
                    datas = '完结';
                    break;
                case 0:
                    datas = [
                        {'id':'1','name':'连载'},
                        {'id':'2','name':'完结'},
                    ];
            }
        }

        return datas;
    },
}
