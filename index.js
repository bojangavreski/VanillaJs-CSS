 
 class SimpleState {
    constructor(postsRendered,postsToRender,maxPosts){
        this.maxPosts= maxPosts;
        this.postsRendered = postsRendered;
        this.postsToRender = postsToRender;
     
        
        if(maxPosts<=postsToRender) 
        document.getElementById('button').className = "hide-button";
        
        const button = document.querySelector('#load-more');
        button.addEventListener('click',()=>{
            this.renderPosts();
        })
        const postListener = document.querySelector('post');
        dialog.addEventListener('click',()=>{
            this.SinglePost();
        })
        this.LoadPosts();
    }

    renderPosts(){
        if(this.maxPosts <= this.postsToRender){
            document.getElementById('button').className = "hide-button";
        }else{
            if(this.maxPosts > this.postsToRender+4){
                this.postsRendered+=4;
                this.postsToRender+=4;
            }else if(this.maxPosts == this.postsToRender+4){
                this.postsRendered+=4;
                this.postsToRender+=4;
                document.getElementById('button').className = "hide-button"; 
            }else{
                this.postsRendered+=4;
                this.postsToRender= this.maxPosts;
                document.getElementById('button').className = "hide-button";
            }
            this.LoadPosts();
        }
    }
    
    changeTime(date){
        const object= new Date(date);
        const dateString = object.toLocaleDateString().split('/');
        const day= dateString[1];
        const month = MONTHS[dateString[0]-1];
        const year = dateString[2];
        var returnValue = day + ' '+ month + ' '+ year;
        return returnValue;
    }
    
    SinglePost(postData){
        const postID = postData.target.id;
        const dialogContainer = document.getElementById('dialog');
        const close = document.getElementsByClassName('close')[0];
        close.onclick = () => {
            dialogContainer.style.display = 'none';
            dialogContainer.removeChild(dialogContainer.lastChild);
        }
        
        dialogContainer.style.display = 'block';

        const object= new Date(DATA[postID].date);
        const dateString = object.toLocaleDateString().split('/');
        const day= dateString[1];
        const month = MONTHS[dateString[0]-1];
        const year = dateString[2];
        var formattedDate = day + ' ' + month + ' '+ year;
        const dialog = document.createElement('div');
        dialog.className = 'single-post';
        dialog.innerHTML = `
            <div class="left">
            <img src=${DATA[postID].image}/>
            </div>
            <div class="right">
            <div class="card inner-card"> 
            <div class="header">
            <div class="avatar">
                <img src=${DATA[postID].profile_image}/>
            </div>
            <div class="title inner-card-title">
            <h3 id="${postID}">
            ${DATA[postID].name}
            </h3>
            <p> ${formattedDate} </p>
            </div>
            </div>
           <div class="description">${DATA[postID].caption}</div>
            </div>
            </div>
        `
        dialogContainer.appendChild(dialog);
       }
    LoadPosts(){
        const content = document.getElementById('content');
        for(var i=this.postsRendered-1;i<this.postsToRender;i++){
        let formattedDate = this.changeTime(DATA[i].date);
        const container = document.createElement("div");
        container.className = "container";
        container.innerHTML = `
            <div id='post${i}' class="card"> 
                <div class="header">
                <div class="avatar">
                    <img src=${DATA[i].profile_image}/>
                </div>
                <div class="title">
                <h3 id="${i}" class="card-title">
                ${DATA[i].name}
                </h3>
                <p> ${formattedDate} </p>
                </div>
                </div>
                <div class="image">
                    <img src=${DATA[i].image}/>
                </div>
               <div class="description">${DATA[i].caption}</div>
            </div>
        `   
            container.getElementsByTagName('h3').item('h3').onclick = this.SinglePost;
            content.appendChild(container);
    }
    }

 }


 window.onload = () => {
     const state = new SimpleState(1,4,DATA.length);
 }