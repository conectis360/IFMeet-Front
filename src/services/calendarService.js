import axios from 'axios';
import { useToast } from 'vue-toastification';

const API_BASE_URL = 'http://localhost:8080/api';
const toast = useToast();

export const CalendarService = {
    async fetchEvents() {
        try {
            const response = await axios.get(`${API_BASE_URL}/events`);
            return response.data.map(event => ({
                ...event,
                start: event.startTime, // Ajuste para o formato do FullCalendar
                end: event.endTime,
                color: event.eventColor
            }));
        } catch (error) {
            toast.error('Falha ao carregar eventos');
            throw error;
        }
    },

    async saveEvent(event) {
        const method = event.id ? 'put' : 'post';
        const url = event.id
            ? `${API_BASE_URL}/events/${event.id}`
            : `${API_BASE_URL}/events`;

        try {
            const response = await axios[method](url, {
                title: event.title,
                description: event.description,
                startTime: event.start,
                endTime: event.end,
                eventColor: event.color
            });
            toast.success(event.id ? 'Evento atualizado!' : 'Evento criado!');
            return response.data;
        } catch (error) {
            toast.error('Erro ao salvar evento');
            throw error;
        }
    },

    async deleteEvent(eventId) {
        try {
            await axios.delete(`${API_BASE_URL}/events/${eventId}`);
            toast.success('Evento removido!');
        } catch (error) {
            toast.error('Erro ao remover evento');
            throw error;
        }
    }
};