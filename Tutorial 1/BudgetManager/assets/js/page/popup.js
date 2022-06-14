$(function () {

    chrome.storage.sync.get(['total','limit'],function(budget){
        console.log(budget);
        $('#total').html(budget.total);
        $('#limit').html(budget.limit);
    });

    $('#spendAmount').click(function () {
        chrome.storage.sync.get('total', function (budget) {
            console.log("storage get");

            var newTotal = 0;
            console.log(budget);
            if (budget.total) {
                console.log("budget.total");
                newTotal += parseInt(budget.total);
            }
            console.log(newTotal);
            var amount = $('#amount').val();
            if(amount){
                console.log("amount");
                newTotal +=parseInt(amount);
            }

            chrome.storage.sync.set({'total':newTotal});

            $('#total').html(newTotal);
            $('#amount').val('');
        });
    });
});