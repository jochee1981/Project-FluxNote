import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import './SearchBar.css';

function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <InputGroup className="search-bar">
      <Form.Control
        type="text"
        placeholder="제목 또는 내용으로 검색..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      {searchQuery && (
        <Button
          variant="outline-secondary"
          onClick={() => onSearchChange('')}
          aria-label="검색 초기화"
          className="search-clear"
        >
          ×
        </Button>
      )}
    </InputGroup>
  );
}

export default SearchBar;

