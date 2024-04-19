$(document).ready(() => {
    const topics = [
      { name: 'Technology', url: 'https://flipboard.com/topic/technology.rss' },
      { name: 'Sports', url: 'https://flipboard.com/topic/sports.rss' },
      { name: 'Science', url: 'https://flipboard.com/topic/science.rss' }
    ];
  
    const accordion = document.getElementById('accordion');
  
    // Fetch and display news for each topic
    topics.forEach(topic => {
      fetchNews(topic);
    });
  
    function fetchNews(topic) {
      const rssToJSONApi = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(topic.url)}`;
      
      fetch(rssToJSONApi)
        .then(response => response.json())
        .then(data => {
          displayNews(data.items, topic);
        })
        .catch(error => console.error('Error fetching news:', error));
    }
  
    function displayNews(newsItems, topic) {
      const accordionItem = document.createElement('div');
      accordionItem.classList.add('card');
      
      const topicHeading = document.createElement('button');
      topicHeading.classList.add('btn', 'btn-link', 'collapsed'); // Added 'collapsed' class
      topicHeading.setAttribute('data-toggle', 'collapse');
      topicHeading.setAttribute('data-target', `#${topic.name.replace(' ', '')}`);
      topicHeading.innerText = topic.name;
  
      accordionItem.appendChild(topicHeading);
  
      const accordionContent = document.createElement('div');
      accordionContent.classList.add('collapse'); // Added 'collapse' class
      accordionContent.id = topic.name.replace(' ', '');
      
      const carousel = document.createElement('div');
      carousel.classList.add('carousel', 'slide');
  
      const carouselInner = document.createElement('div');
      carouselInner.classList.add('carousel-inner');
  
      newsItems.forEach((item, index) => {
        const card = createCard(item);
        if (index === 0) card.classList.add('active');
        carouselInner.appendChild(card);
      });
  
      carousel.appendChild(carouselInner);
  
      const prevButton = document.createElement('a');
      prevButton.classList.add('carousel-control-prev');
      prevButton.setAttribute('href', `#${topic.name.replace(' ', '')}`);
      prevButton.setAttribute('role', 'button');
      prevButton.setAttribute('data-slide', 'prev');
      prevButton.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span>';
  
      const nextButton = document.createElement('a');
      nextButton.classList.add('carousel-control-next');
      nextButton.setAttribute('href', `#${topic.name.replace(' ', '')}`);
      nextButton.setAttribute('role', 'button');
      nextButton.setAttribute('data-slide', 'next');
      nextButton.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span>';
  
      carousel.appendChild(prevButton);
      carousel.appendChild(nextButton);
  
      accordionContent.appendChild(carousel);
      accordionItem.appendChild(accordionContent);
      accordion.appendChild(accordionItem);
    }
  
    function createCard(item) {
      const card = document.createElement('div');
      card.classList.add('card');
  
      const cardImage = document.createElement('img');
      cardImage.src = item.enclosure.link || 'https://via.placeholder.com/150';
      cardImage.alt = 'News Image';
      cardImage.classList.add('card-img-top');
  
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
  
      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.innerText = item.title;
  
      const cardDescription = document.createElement('p');
      cardDescription.classList.add('card-text');
      cardDescription.innerText = item.description;
  
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardDescription);
  
      card.appendChild(cardImage);
      card.appendChild(cardBody);
  
      return card;
    }
  });
  