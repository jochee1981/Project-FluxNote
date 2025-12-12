import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Badge } from 'react-bootstrap';
import './NoteEditor.css';

function NoteEditor({ note, isEditing, onEdit, onSave, onCancel }) {
  const [title, setTitle] = useState(note.title || '');
  const [content, setContent] = useState(note.content || '');

  useEffect(() => {
    setTitle(note.title || '');
    setContent(note.content || '');
  }, [note]);

  const handleSave = () => {
    if (title.trim() || content.trim()) {
      onSave({
        ...note,
        title: title.trim(),
        content: content.trim()
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isEditing) {
    return (
      <Card className="note-editor shadow-sm h-100">
        <Card.Header className="bg-white border-bottom">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <Card.Title className="mb-0 flex-grow-1">
              {note.title || '(제목 없음)'}
            </Card.Title>
            <Button variant="primary" onClick={onEdit}>
              수정
            </Button>
          </div>
        </Card.Header>
        <Card.Body className="d-flex flex-column" style={{ flex: 1, overflow: 'auto' }}>
          <div className="mb-3">
            <Badge bg="info" className="me-2">생성: {formatDate(note.createdAt)}</Badge>
            {note.updatedAt !== note.createdAt && (
              <Badge bg="warning" text="dark">수정: {formatDate(note.updatedAt)}</Badge>
            )}
          </div>
          <div className="note-editor-content-view flex-grow-1">
            {note.content ? (
              <p className="mb-0" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {note.content}
              </p>
            ) : (
              <em className="text-muted">내용이 없습니다.</em>
            )}
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="note-editor shadow-sm h-100">
      <Card.Header className="bg-white border-bottom">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <Form.Control
            type="text"
            className="flex-grow-1"
            placeholder="제목을 입력하세요..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            style={{ fontSize: '1.5rem', fontWeight: '600' }}
          />
          <div className="d-flex gap-2">
            <Button variant="secondary" onClick={onCancel}>
              취소
            </Button>
            <Button variant="success" onClick={handleSave}>
              저장
            </Button>
          </div>
        </div>
      </Card.Header>
      <Card.Body className="p-0" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Form.Control
          as="textarea"
          className="note-editor-content-input border-0"
          placeholder="내용을 입력하세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ 
            flex: 1, 
            resize: 'none',
            fontSize: '1rem',
            lineHeight: '1.8',
            padding: '20px'
          }}
        />
      </Card.Body>
    </Card>
  );
}

export default NoteEditor;

