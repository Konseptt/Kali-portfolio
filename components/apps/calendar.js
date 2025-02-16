import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
        setEvents(savedEvents);
    }, []);

    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    const handleDateClick = (info) => {
        const title = prompt('Enter event title:');
        if (title) {
            const newEvent = {
                title,
                start: info.dateStr,
                id: Date.now()
            };
            setEvents([...events, newEvent]);
        }
    };

    const handleEventClick = (info) => {
        const newTitle = prompt('Edit event title:', info.event.title);
        if (newTitle) {
            const updatedEvents = events.map(event => {
                if (event.id === info.event.id) {
                    return { ...event, title: newTitle };
                }
                return event;
            });
            setEvents(updatedEvents);
        }
    };

    const handleEventRemove = (info) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this event?');
        if (confirmDelete) {
            const updatedEvents = events.filter(event => event.id !== info.event.id);
            setEvents(updatedEvents);
        }
    };

    return (
        <div className="calendar-app">
            <h1>Calendar</h1>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                eventRemove={handleEventRemove}
            />
        </div>
    );
};

export const displayCalendar = () => {
    return <Calendar />;
};

export default Calendar;
