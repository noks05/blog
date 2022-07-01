(() => {
   const linkBaseData = 'https://gorest.co.in/public-api/posts';
   // получаем данные о статьях по номеру страницы
   async function getDataPageArticles(pageNumber) {
      const link = pageNumber ? linkBaseData + '?page=' + pageNumber : linkBaseData;
      const response = await fetch(link);
      const onePageArticles = await response.json();

      return onePageArticles;
   }

   // создаёт главный заголовок страницы
   function createMainTitle() {
      const mainTitle = document.createElement('h1');
      mainTitle.classList.add('article-list__title');
      mainTitle.textContent = 'My list articles';

      return mainTitle;
   }

   // создаёт контенер для ссылок на статьи
   function createContrLinks() {
      const contrLinks = document.createElement('div');
      contrLinks.classList.add('article-list__links');

      return contrLinks;
   }
   // создаём обёрнутую в <li> ссылку на статью
   function createLinkArticle(dataArticle) {
      const { title, id } = dataArticle;

      const listItem = document.createElement('li');
      const link = document.createElement('a');

      link.classList.add('article-list__link');
      listItem.classList.add('list-group-item', 'article-list__list-group-item');

      link.href = `post.html?id=${id}`;
      link.textContent = title;

      return {
         listItem,
         link
      };
   }
   // создаём список наполненный ссылками на статьи
   async function createPageArticles(pageData) {
      // получаем данные по номеру страницы
      const arrArticles = pageData.data;
      // создаёт ссылки на статьи
      const list = document.createElement('ul');
      list.classList.add('list-group', 'article-list__list-group');

      for (let article of arrArticles) {
         // создаём обёрнутую в <li> ссылку на статью
         const linkArticle = createLinkArticle(article);
         const listItem = linkArticle.listItem;
         const link = linkArticle.link;

         listItem.append(link);
         list.append(listItem);
      }
      return list;
   }

   // создаёт контейнер для постраничной навигации
   function createContrPagination() {
      const contrPagination = document.createElement('nav');
      contrPagination.classList.add('article-list__pagination');
      contrPagination.ariaLabel = "Пример навигации по страницам";

      return contrPagination;
   }
   // создаём кнопку постраничной навигации
   function createItemPagination(page) {
      const contrLink = document.createElement('li');
      contrLink.classList.add('page-item');

      const link = document.createElement('a');
      link.classList.add('page-link');
      link.href = page === 1 ? 'index.html' : '?page=' + page;
      link.textContent = page;

      link.addEventListener('click', async (e) => {

         const allBtnPagination = document.querySelectorAll('.page-item');
         allBtnPagination.forEach(item => item.classList.remove('active'));
         e.target.parentNode.classList.add('active');
      })

      return {
         contrLink,
         link,
      };
   }
   // создаём постраничную навигацию
   function createListPagination(allPages) {
      const listPagination = document.createElement('ul');
      listPagination.classList.add('pagination', 'justify-content-center');
      listPagination.style.flexWrap = 'wrap';

      for (let i = 1; i <= allPages; ++i) {

         const items = createItemPagination(i);
         const contrLink = items.contrLink;
         const link = items.link;

         contrLink.append(link);
         listPagination.append(contrLink);
      }

      return listPagination;
   }
   // добавляем класс активной кнопкенавигации по страницам
   function addPageActiveClass(activePage) {
      if (activePage) {
         const allBtnPagination = document.querySelectorAll('.page-link');
         const btnActive = Array.from(allBtnPagination).find((item) => {
            return item.textContent === activePage;
         })
         btnActive.parentNode.classList.add('active');
      } else {
         const btnActive = document.querySelector('.page-item');
         btnActive.classList.add('active');
      }
   }

   // отрисовываем список ссылок(на статьи в блоге)
   async function createPageListArticles(pageNumber) {
      // получаем данные о статьях на первой странице , 
      const dataArticles = await getDataPageArticles(pageNumber);
      // и о количестве страниц всего      
      const pages = dataArticles.meta.pagination.pages;

      const container = document.querySelector('.container');
      const mainTitle = createMainTitle();
      // создаём список статей при загрузке страницы
      const contrLinks = createContrLinks();
      const listArticles = await createPageArticles(dataArticles);
      // создаём постраничную навигацию
      const contrPagination = createContrPagination();
      const listPagination = createListPagination(pages);
      // добавляем заголовок     
      container.append(mainTitle);
      // добавляем список с сылками на статьи
      contrLinks.append(listArticles);
      container.append(contrLinks);
      // добавляем постраничную навигацию
      contrPagination.append(listPagination);
      container.append(contrPagination);
      // добавляем класс активной кнопкенавигации по страницам
      addPageActiveClass(pageNumber);
   }

   window.createPageListArticles = createPageListArticles;
})();