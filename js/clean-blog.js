var filterParam = "&begin_date=19921228&end_date=19921228";
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=30b14b65e7ef479bb96ffeef5ca54a42&page=2"
const articleEl = document.getElementById('article');

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function fixedDate(date) {
    return date = date.replace(/[./-]/g, '')
}

function confirmEnter(textAreaID, buttonID) {
    document.getElementById(textAreaID)
    .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            document.getElementById(buttonID).click();
        }
    });
}

function isDateCorrect(date) {
    date = fixedDate(date);
    if(!/[^0-9]/g.test(date) && date.length===8) {
        return true;
    } else {
        return false;
    }
};

function removeChildElementsByID(elementID) {
    var myNode = document.getElementById(elementID);
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }    
}

function filterArticles(dateFrom, dateTo) {
    if(dateFrom>dateTo) {
        alert("'From date' can't be later than 'To date'")
    } else if (isDateCorrect(dateFrom) && isDateCorrect(dateTo)){

        //Remove old DOM elements
        removeChildElementsByID("article");

        //Fetch Data
        this.filterParam = "&begin_date="+fixedDate(dateFrom)+"&end_date="+fixedDate(dateTo);
        fetchData(this.url+this.filterParam);

    } else {
        alert("Please provide a correct date format! Correct date formats are: YYYY/MM/DD, YYYY|MM|DD, YYYY.MM.DD, also correct dates doesnt include any letters!");
    }
};

function createPostElement(article){
    
    //Creating Elements
    let div = createNode('div'), 
        a = createNode('a'),
        h2 = createNode('h2'),
        hr = createNode('hr')

    //Adding Style Classes
    div.className="post-preview"
    h2.className="post-title"

    //Create Click Attribution
    let href = document.createAttribute("href");
    let target = document.createAttribute("target");
    href.value = article.web_url;
    target.value ="_blank";
    a.setAttributeNode(href);
    a.setAttributeNode(target);

    //Appending Elements
    append(h2, document.createTextNode(`${article.headline.main}`));
    append(a, h2);
    append(div, a);
    append(articleEl, div);
    append(articleEl, hr);
}

function fetchData(url){
    fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
        let article = data.response.docs;
        return article.map(function(article) {
            createPostElement(article)
        })
    })
}

confirmEnter("dateFrom", "articlesButton")
confirmEnter("dateTo", "articlesButton")

fetchData(url);