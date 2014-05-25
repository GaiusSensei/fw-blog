window.onload = function() {
    // Hook Triggers
    $("#btnCardBrowser").click(function(e){
        changeState("cardbrowser");
    });
    $("#btnDeckBuilder").click(function(e){
        changeState("deckbuilder");
    });
    $("#btnLifeCounter").click(function(e){
        changeState("lifecounter");
    });
    $("#btnRoll").click(function(e){
        $("#selRollResult").prepend($("<li>", {
            text:rollD20()
        }));
    });
    $("#btnRollClear").click(function(e){
        $("#selRollResult").empty();
    });
    $("#btnAdd100LC").click(function(e){
        var lc = simpleStorage.get("lifecounter");
        lc.current += 100;
        simpleStorage.set("lifecounter", lc);
        updateLifeCounter();
    });
    $("#btnSub100LC").click(function(e){
        var lc = simpleStorage.get("lifecounter");
        lc.current -= 100;
        simpleStorage.set("lifecounter", lc);
        updateLifeCounter();
    });
    $("#btnSubHalfLC").click(function(e){
        var lc = simpleStorage.get("lifecounter");
        lc.current = 0;
        if ($("#optApplyToYou").prop("checked")) {
            lc.current = -(lc.you / 2);
        } else {
            lc.current = -(lc.opp / 2);            
        }
        simpleStorage.set("lifecounter", lc);
        updateLifeCounter();
    });
    $("#btnApplyLC").click(function(e){
        var lc = simpleStorage.get("lifecounter");
        if ($("#optApplyToYou").prop("checked")) {
            lc.you += lc.current;
            lc.youHistory.push(lc.you);
        } else {   
            lc.opp += lc.current;   
            lc.oppHistory.push(lc.opp);  
        }
        lc.current = -200;
        simpleStorage.set("lifecounter", lc);
        updateLifeCounter();
    });
    $("#btnResetLC").click(function(e){
        var lc = simpleStorage.get("lifecounter");
        lc.current = -200;
        simpleStorage.set("lifecounter", lc);
        updateLifeCounter();        
    });
    $("#btnBackFromLC").click(function(e){
        changeState("splash");
    });
    $("#btnClearLC").click(function(e){
        simpleStorage.set("lifecounter", {
            current:-200,
            you:4000,
            opp:4000,
            youHistory:[4000],
            oppHistory:[4000]
        });
        updateLifeCounter();
        
    });
    // Clear!
    $("#selRollResult").empty();
    $("#btnClearLC").click();
    // Show Splash
    changeState("splash");
};

var rollD20 = function rollD20F(){
    var min = 1, max = 20;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var changeState = function changeStateF(state){
    $(".row").hide();
    $("#" + state).fadeIn();
};

var updateLifeCounter = function updateLifeCounter(){
    var lc = simpleStorage.get("lifecounter");
    $("#lstYourHp").empty();
    $("#lstOppHp").empty();
    $("#txtYourHP").text(simpleStorage.get("lifecounter").you);
    $("#txtOppHP").text(simpleStorage.get("lifecounter").opp);
    if (lc.current >= 0) {
        $("#txtCurrentLC").val("+ " + Math.abs(lc.current));
    } else {
        $("#txtCurrentLC").val("- " + Math.abs(lc.current));
    }
    $.each(lc.youHistory, function(key,value){
        $("#lstYourHp").prepend($("<li>", {
            text:value
        }));
    });
    $.each(lc.oppHistory, function(key,value){
        $("#lstOppHp").prepend($("<li>", {
            text:value
        }));
    });
};