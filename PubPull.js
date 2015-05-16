
$(document).ready(function(){


    $.getJSON('http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=1000&term= ((Merritt%20Maduke%5BAuthor%5D)%20AND%20("2003"%5BDate%20-%20Create%5D%20%3A%20"3000"%5BDate%20-%20Create%5D))%20AND%20Stanford%5BAffiliation%5D', function(data){
    var ids = data.esearchresult.idlist;
    var publications = [];
    iterateJSON(ids,publications);
    });
    function listIteration(arr){
        var $ul = $("ul");
        for (var i = arr.length; i>0 ; i--){
          $ul.append("<li>" + arr.pop() + "</li> </br>");  
        }
    }


    function iterateJSON(idlist, publications) {
        var id = idlist.pop();
        $.getJSON('http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id='+id+'&retmode=json', function(summary){
            var citation = "";
        
            for(author in summary.result[id].authors){
                citation+=summary.result[id].authors[author].name+', ';
            }
            citation+="<a href = \"http://www.ncbi.nlm.nih.gov/pubmed/?term=" + id + "\" > \"" +summary.result[id].title+ "\"</a> <i>"+summary.result[id].fulljournalname+'</i> '+summary.result[id].volume+'.'+summary.result[id].issue+' ('+summary.result[id].pubdate+'): '+summary.result[id].pages+'.';
            publications.push(citation);
            if(idlist.length!=0){
                iterateJSON(idlist, publications);
            }else{
                listIteration(publications);
            }
        });
    } 


});
