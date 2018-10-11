import KanbanBoard from './components/KanbanBoard.vue';

export default {

    /**
     * install plugin
     * @param vue Vue
     */
    install(vue) {
        vue.component('kanban-board', KanbanBoard);
    }
};
