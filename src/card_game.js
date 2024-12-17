$(function () {




    // setTimeout(() => {
    //     $('#card-item-1').off('click')
    // }, 2000);

    // const originalArray0 = [1, 2, 3, 4, 5, 6, 7, 8];
    // const shuffledArray0 = originalArray0.sort(() => 0.5 - Math.random());

    // const originalArray1 = [1, 2, 3, 4, 5, 6, 7, 8];
    // const shuffledArray1 = originalArray1.sort(() => 0.5 - Math.random());

    // const newArr0 = shuffledArray0.concat(shuffledArray1)
    const newArr0 = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    // const newArr0 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    const newArr = newArr0.sort(() => 0.5 - Math.random());

    //初始化图片
    // var imgArr = $('#card-container img').attr('src');
    // console.log(imgArr);
    newArr.forEach((item, index) => {
        let imgID = `#card-item-${index + 1} img`;
        let imgPath = `/resource/card/${item}.jpg`;
        $(imgID).attr('src', imgPath);
    });

    $('.grid-card-item').flip({
    });

    //开始翻牌

    var fanpai_number = 0;
    var seconds = 0;
    var stack_peidui_path = [];
    var stack_peidui_obj = [];
    var stack_card_id = [];
    var intervalId;

    var time_is_running = false;
    var try_times = 0;

    $('.grid-card-item').click(function (e) {
        e.preventDefault();
        //翻牌开始读秒
        if (seconds == 0 && !time_is_running) {
            time_is_running = true;
            intervalId = setInterval(() => {
                seconds++;
                $('#fanpai_jishi').text(seconds);
            }, 1000);
        }
        var cur_img_src = $(this).find('img').attr('src');
        var cur_obj = $(this);
        console.log($(this).find('img').attr('src'));
        console.log($(this));
        console.log('debug id ', $(this).attr('id'));

        var cur_item_id = $(this).attr('id');

        fanpai_number++;
        //翻牌几次
        if (fanpai_number != 0 && fanpai_number % 2 == 0) {

            //此时翻牌次数为偶数
            //可以判断是否匹配
            var last_path = stack_peidui_path[stack_peidui_path.length - 1];
            var last_obj = stack_peidui_obj[stack_peidui_obj.length - 1];
            var last_item_id = stack_card_id[stack_card_id.length - 1];

            if (last_path == cur_img_src) {
                //配对成功

                //配对成功还要分情况，如果是点到了同一张牌，这不算成功
                if (last_item_id == cur_item_id) {
                    //点到同一张牌 此次匹配作废
                    stack_card_id.pop();
                    stack_peidui_obj.pop();
                    stack_peidui_path.pop();
                    return;
                }
                console.log('succ');
                stack_peidui_path.push(cur_img_src);
                stack_peidui_obj.push($(this));

                //配对成功 卡牌 不可再点击
                last_obj.off('click');
                $(this).off('click');

                try_times++;
                $('#fanpai_cishu').text(try_times);

                //所有配对完成，读秒结束，不可再点击
                if (stack_peidui_path.length == 16) {
                    var textEnd = `${seconds} 恭喜你完成！`
                    $('#fanpai_jishi').text(textEnd);
                    clearInterval(intervalId);
                }


            } else {
                //配对不成功
                try_times++;
                $('#fanpai_cishu').text(try_times);

                console.log('fail');
                setTimeout(() => {
                    $(this).flip(false);
                    last_obj.flip(false);
                }, 800);
                stack_peidui_path.pop();
                stack_peidui_obj.pop();
                stack_card_id.pop();
            }

        } else {
            console.log('debug jijijiji');
            //此时 翻牌次数为奇数  点击 我们就把该元素 丢进栈
            stack_peidui_path.push(cur_img_src);
            stack_peidui_obj.push($(this));
            stack_card_id.push(cur_item_id);
        }





    })

})