import KanbanView from '../views/KanbanView.vue'

import KanbanBoard from '../components/KanbanBoard.vue';
import BoardList from '../components/BoardList.vue';
import CardEditor from '../components/CardEditor.vue';

export default {
    path: '/boards', 
    component: KanbanView, 
    children: [{
        path: '',
        name: 'BoardList',
        component: BoardList
    }, {
        path: ':boardId',
        name: 'Board',
        component: KanbanBoard,
        children: [{
            path: 'new',
            name: 'NewCard',
            props: true,
            component: CardEditor
        },{
            path: ':cardId',
            name: 'CardEdit',
            props: true,
            component: CardEditor
        }]
    }]
}