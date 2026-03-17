import React, { useState } from 'react';
import { Button, Card, Form, ListGroup } from 'react-bootstrap';
import { botKnowledge } from '../utils/botKnowledge';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { sender: 'bot', text: "Hey there! I'm your Serenity Guide. Ask me anything about our Spas, Pools, or Subscriptions!" }
    ]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages([...messages, userMessage]);

        // Logic to restrict answers
        let botResponse = "I'm sorry, I only know about Serenity's services and subscriptions. Try asking about our Spa or Pool packages!";
        
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('spa') || lowerInput.includes('massage')) botResponse = botKnowledge.services.spa;
        else if (lowerInput.includes('pool')) botResponse = botKnowledge.services.pool;
        else if (lowerInput.includes('subscribe') || lowerInput.includes('tier')) botResponse = botKnowledge.subscriptions.tiers;
        else if (lowerInput.includes('pay')) botResponse = botKnowledge.general.payments;

        setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
        }, 500);
        
        setInput('');
    };

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
            {!isOpen ? (
                <Button onClick={() => setIsOpen(true)} className="rounded-circle shadow" style={{ width: '60px', height: '60px' }}>
                    <i className="fas fa-comment-dots fa-lg"></i>
                </Button>
            ) : (
                <Card className="shadow" style={{ width: '300px', maxHeight: '450px' }}>
                    <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                        <strong>Serenity AI</strong>
                        <Button variant="link" size="sm" className="text-white p-0" onClick={() => setIsOpen(false)}>
                            <i className="fas fa-times"></i>
                        </Button>
                    </Card.Header>
                    <Card.Body style={{ overflowY: 'auto', height: '300px' }}>
                        <ListGroup variant="flush">
                            {messages.map((msg, index) => (
                                <ListGroup.Item key={index} className={`border-0 p-2 ${msg.sender === 'user' ? 'text-end' : ''}`}>
                                    <div className={`d-inline-block p-2 rounded ${msg.sender === 'user' ? 'bg-light border' : 'bg-primary text-white'}`} style={{ maxWidth: '80%' }}>
                                        {msg.text}
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card.Body>
                    <Card.Footer className="p-2">
                        <Form onSubmit={handleSend} className="d-flex">
                            <Form.Control 
                                type="text" 
                                placeholder="Ask me..." 
                                value={input} 
                                onChange={(e) => setInput(e.target.value)}
                                className="me-2"
                            />
                            <Button type="submit" size="sm">Go</Button>
                        </Form>
                    </Card.Footer>
                </Card>
            )}
        </div>
    );
};

export default Chatbot;