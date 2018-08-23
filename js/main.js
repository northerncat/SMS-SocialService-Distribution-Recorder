$(document).ready(function() {
    assignTableClasses('.table td');

    // Declare the assign table classes function.
    function assignTableClasses(hook){
        t = $(hook);
        t.each(function(){
            $(this).addClass('edit');
            $(this).bind('contextmenu', async function(e) {
                // parse the remaining count from the table cell content
                let remainingCount = parseInt(e.target.textContent);
                // either the cell is the org name or is already zero
                if (isNaN(remainingCount)) return;
                // reduce the remaining count for the org by 1
                remainingCount = Math.max(remainingCount + 1, 0);
                e.target.textContent = remainingCount;

                let row = $(e.target.parentNode);
                row.removeClass('text-muted');
                row.removeClass('inactive');
                if (remainingCount === 1) {
                    await sleep(150);
                    row.parent('tbody').prepend(row);
                }
            });
            $(this).attr('oncontextmenu', 'return false;');
        });
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// This function reduces the remaining count of the organization
// by one every time the user clicks on the number, and turns the
// org inactive once it reaches 0.
$(document).on("click", ".edit", async function(e) {
    e.stopPropagation();
    // parse the remaining count from the table cell content
    let remainingCount = parseInt(e.target.textContent);
    // either the cell is the org name or is already zero
    if (isNaN(remainingCount) || remainingCount <= 0) return;

    // reduce the remaining count for the org by 1
    remainingCount = Math.max(remainingCount - 1, 0);
    e.target.textContent = remainingCount;

    // if the org is out of headcounts, take the row to the bottom and
    // color the background
    if (remainingCount === 0) {
        let row = $(e.target.parentNode);
        row.addClass('text-muted');
        row.addClass('inactive');
        await sleep(150);
        row.parent('tbody').append(row);
    }
});

// TODO: disallow webpage refresh so that the progress won't be lost - in general
// not a good idea, so fix this in the future!
$(document).on("keydown", function (e) {
    if (e.key == "F5" || e.key == "F11" || 
        (e.ctrlKey == true && (e.key == 'r' || e.key == 'R')) || 
        e.keyCode == 116 || e.keyCode == 82) {

               // e.preventDefault();
    }
});