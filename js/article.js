(() => {
   const linkDataArticles = 'https://gorest.co.in/public-api/posts';
   const linkDataComments = 'https://gorest.co.in/public-api/comments?post_id=';
   // получаем данные одной статьи по номеру страницы
   async function getDataArticle(linkPageArticles, idArticle) {
      const link = linkPageArticles + '/' + idArticle;
      const response = await fetch(link);
      const dataArticle = await response.json();

      return dataArticle.data;
   }
   // получаем данные комментариев по номеру страницы
   async function getDataComments(linkComments, idArticle) {
      const response = await fetch(linkComments + idArticle);
      const dataComments = await response.json();

      return dataComments.data;
   }

   // создаёт главный заголовок страницы
   function createMainTitle(textTitle) {
      const mainTitle = document.createElement('h1');
      mainTitle.classList.add('article__title');
      mainTitle.textContent = textTitle;

      return mainTitle;
   }
   // создаёт элемент date
   function createDate(classDate, dateText) {
      const date = document.createElement('date');
      const [class1, class2, class3] = classDate;
      date.classList.add(class1, class2, class3);
      date.textContent = dateText;

      return date;
   }
   // создаёт контейнер для текста статьи
   function createTextArticle(text) {
      const textArticle = document.createElement('p');
      textArticle.classList.add('article__text');
      textArticle.textContent = text;

      return textArticle;
   }
   // создаёт кнопку показывающую и скрывающую комментарии
   function createBtnCommnets() {
      const btn = document.createElement('button');
      btn.classList.add('article__btn-comments');
      btn.id = 'collapse';
      btn.type = 'button';
      btn.dataBsToggle = 'collapse';
      btn.dataBsTarget = '#collapse';
      btn.textContent = 'comments';

      btn.addEventListener('click', () => {
         document.querySelector('.article__comments').classList.toggle('show');
      })

      return btn;
   }

   // создаём основную часть статьи
   function createMainPartArticle(class1, class2, dataArticle) {
      const mainPartArticle = document.createElement('div');
      mainPartArticle.classList.add('article__main-part');

      const mainTitle = createMainTitle(dataArticle.title);
      const dateArticle = createDate(['article__date', class1, class2], '22.07.2018');
      const textArticle = createTextArticle(dataArticle.body);
      const btnComments = createBtnCommnets();

      mainPartArticle.append(mainTitle);
      mainPartArticle.append(dateArticle);
      mainPartArticle.append(textArticle);
      textArticle.append(btnComments);

      return mainPartArticle;
   }

   // создаёт контейнер для комментариев
   function createContrComments() {
      const contrComments = document.createElement('ul');
      contrComments.classList.add('article__comments', 'collapse');
      contrComments.id = 'collapse';

      return contrComments;
   }
   // создаёт один блок-комментарий
   function createComment(nameComment, textComment, date) {
      const classColor = 'text-black-50';
      const dateClass = 'date';

      const comment = document.createElement('div');
      const name = document.createElement('div');
      const text = document.createElement('p');
      const dateComment = createDate(['comment__date', dateClass, classColor], date);

      comment.classList.add('comment', 'border');
      name.classList.add('comment__name', classColor);
      text.classList.add('comment__text', classColor);

      name.textContent = nameComment;
      text.textContent = textComment;

      comment.append(name);
      comment.append(text);
      comment.append(dateComment);

      return comment;
   }
   // создаём список коментариев
   function createListComments(dataComments) {
      const contrComments = createContrComments();

      if (dataComments.length === 0) {
         const nonComment = document.createElement('div');
         nonComment.textContent = 'Никто пока что, не оставил коментариев'
         nonComment.classList.add('article__non-comments');
         contrComments.append(nonComment)
         return contrComments;
      }

      for (let comment of dataComments) {
         const { name, body } = comment;
         const contrComment = document.createElement('li');
         contrComment.classList.add('article__list-item');

         contrComment.append(createComment(name, body, '01.20.2010'));
         contrComments.append(contrComment);
      }
      return contrComments;
   }

   // отрисовываем страницу статьи
   async function createArticle(id) {
      // получаем данные статьи
      const dataArticle = await getDataArticle(linkDataArticles, id);
      // получаем данные комментариев
      const commentsData = await getDataComments(linkDataComments, id);

      const container = document.querySelector('.container');
      const classColor = 'text-black-50';
      const dateClass = 'date';

      const contrComments = createListComments(commentsData);
      const mainPartArticle = createMainPartArticle(dateClass, classColor, dataArticle);

      container.append(mainPartArticle);
      container.append(contrComments);
   }

   window.createArticle = createArticle;
})()