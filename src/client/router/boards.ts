import KanbanView from '../views/KanbanView.vue'

import KanbanBoard from '../components/KanbanBoard.vue';
import BoardList from '../components/BoardList.vue';
import CardEditor from '../components/CardEditor.vue';
import BoardConfig from '../components/BoardConfig.vue';

export default {
    path: '/boards', 
    component: KanbanView,
    children: [{
        path: '',
        name: 'BoardList',
        component: BoardList,
        meta: {
            needLogin: true
        }
    }, {
        path: ':boardId',
        name: 'Board',
        props: true,
        component: KanbanBoard,
        meta: {
            needLogin: true
        },
        children: [{
            path: 'configuration',
            name: 'BoardConfig',
            props: true,
            component: BoardConfig,
            meta: {
                needLogin: true
            }
        }, {
            path: 'new',
            name: 'NewCard',
            props: true,
            component: CardEditor,
            meta: {
                needLogin: true
            }
        }, {
            path: ':cardId',
            name: 'CardEdit',
            props: true,
            component: CardEditor,
            meta: {
                needLogin: true
            }
        }]
    }]
}