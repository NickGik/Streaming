// src/models/SearchModel.ts - Модель для управления поиском

// Класс SearchModel
class SearchModel {
  // Свойство для хранения текста поиска
  searchText: string;

  // Конструктор
  constructor(searchText: string = '') {
    // Инициализация текста поиска (по умолчанию пустая строка)
    this.searchText = searchText;
  }

  // Метод для получения текста поиска
  getSearchText(): string {
    return this.searchText;
  }

  // Метод для установки текста поиска
  setSearchText(text: string): void {
    this.searchText = text;
  }
}

// Экспорт класса SearchModel по умолчанию
export default SearchModel;