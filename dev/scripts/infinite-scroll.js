class InfiniteScroll extends HTMLElement {
    constructor() {
        super();

        this.grid = this.querySelector("#product-grid");
        this.productCount = this.grid.children.length;
        this.pagination = this.querySelector("#pagination");
        this.page = window.location.search.includes("page=") ? parseInt(window.location.search.split("page=")[1]) : 1;
        
        this.setUpGridListener();

        if (this.page == 1){
            this.setUpObserver()
        } else {
            history.scrollRestoration = "manual";
            this.loadPrevPages();
        }
    }

    loadPrevPages() {
        let urls = [];

        for (let index = (this.page - 1); index > 0; index--) {
            var page = `${window.location.pathname}?${window.location.search.split("&page")[0].substring(0, 1) != "?" ? window.location.search.split("&page")[0] : window.location.search.split("&page")[0].substring(1)}&page=${index}`;
            urls.push(page);
        }
        
        Promise.all(urls.map(u => fetch(u))).then(responses =>
            Promise.all(responses.map(res => res.text()))
        ).then(texts => {
            texts.forEach((text) => {
                let parser = new DOMParser();
                let html = parser.parseFromString(text, 'text/html');
                let newGrid = html.querySelectorAll('#product-grid')[0];
                this.grid.insertAdjacentHTML('afterbegin', newGrid.innerHTML);
            })
           
        }).finally(() => {
            this.scrollToProduct();
            this.setUpObserver();
        })
    }

    scrollToProduct() {
        let prod = localStorage.getItem("iscroll_product");
        if (prod) {
            let elem = this.querySelector(`[data-product-id="${prod}"]`);
            if (elem) {
                elem.scrollIntoView({ behaviour: 'smooth', block: "center" });
            }
        } 
    }

    setUpObserver() {

        const observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {    
                if(entry.isIntersecting && this.page > 0){
                    this.pagination.querySelector('.loading-overlay__spinner').classList.remove('hidden');
                    this.loadMore();         
                }     
            });
        }.bind(this), { 
            rootMargin: '450px 0px 450px 0px'
        });
        if(this.pagination){
            observer.observe(this.pagination);
        }
    }

    setUpGridListener() {
        this.grid.addEventListener('click', (event) => {
            let id = event.target.closest("product-card").dataset.productId;
            localStorage.setItem("iscroll_product", id);
        });
    }

    loadMore() {
        this.page++;
        var page = `${window.location.pathname}?${window.location.search.split("&page")[0].substring(0, 1) != "?" ? window.location.search.split("&page")[0] : window.location.search.split("&page")[0].substring(1)}&page=${this.page}`;
        fetch(page)
        .then(response => response.text())
        .then((responseText) => {
            let parser = new DOMParser();
            let html = parser.parseFromString(responseText, 'text/html');
            let newGrid = html.querySelectorAll('#product-grid')[0];
            if (newGrid && !newGrid.classList.value.includes("collection--empty")) {
                this.grid.insertAdjacentHTML('beforeend', newGrid.innerHTML);
                this.productCount = this.grid.children.length;
                history.pushState({ page }, '', page);
                this.pagination.querySelector('.loading-overlay__spinner').classList.add('hidden');
            } else {
                this.page = 0;
                this.pagination.innerText = "";
            }
        })
    }
}

customElements.define('infinite-scroll', InfiniteScroll);