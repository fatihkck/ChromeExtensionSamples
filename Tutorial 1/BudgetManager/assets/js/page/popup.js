$(function () {

    chrome.storage.sync.get(['total', 'limit'], function (budget) {
        console.log(budget);
        $('#total').html(budget.total);
        $('#limit').html(budget.limit);
    });

    $('#spendAmount').click(function () {
        chrome.storage.sync.get(['total', 'limit'], function (budget) {
            console.log("storage get");

            var newTotal = 0;
            console.log(budget);
            if (budget.total) {
                console.log("budget.total");
                newTotal += parseInt(budget.total);
            }
            console.log(newTotal);
            var amount = $('#amount').val();
            if (amount) {
                console.log("amount");
                newTotal += parseInt(amount);
            }

            chrome.storage.sync.set({ 'total': newTotal }, function () {
                if (amount && newTotal >= budget.limit) {
                    
                    var notifOptions={
                        type:'basic',
                        iconUrl :'/assets//images/icon_128.png',
                        title:'Limit reached!',
                        message:'Uh oh! Looks like you have reached your limit!'
                    };

                    chrome.notifications.create('limitNotif',notifOptions,function(){
                        console.log("Popup notify sent");
                    });
                }
            });

            $('#total').html(newTotal);
            $('#amount').val('');
        });
    });
});