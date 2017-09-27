import Competition from '../containers/4.2/CompetitionDetail'
import CompetitionIframe from '../containers/4.2/CompetitionIframe'

export default {
    childRoutes: [
        {
            path: 'kompetisi',
            childRoutes: [
                {
                    path: 'peraturan/:encid(/:title)',
                    name: 'competition_regulation',
                    active_tab: 1,
                    component: Competition
                },
                {
                    path: 'detail/:encid(/:title)',
                    name: 'competition_regulation',
                    active_tab: 1,
                    component: Competition
                },
                {
                    path: 'hadiah/:encid(/:title)',
                    active_tab: 2,
                    component: Competition
                },
                {
                    path: 'diskusi/:encid(/:title)',
                    active_tab: 3,
                    component: Competition
                },
                {
                    path: 'pengumuman/:encid(/:title)',
                    active_tab: 4,
                    component: Competition
                },
                {
                    path: 'kontak/:encid(/:title)',
                    active_tab: 5,
                    component: Competition
                },
                {
                    path: 'share/:encid(/:title)',
                    active_tab: 6,
                    component: Competition
                },
                {
                    path: 'sumber/:encid(/:title)',
                    iframe_type: 'sumber',
                    component: CompetitionIframe
                },
                {
                    path: 'ikuti/:encid(/:title)',
                    iframe_type: 'ikuti',
                    component: CompetitionIframe
                }
            ]
        },
        {
            path: 'competition',
            childRoutes: [
                {
                    path: ':encid/regulations(/:title)',
                    name: 'competition_regulation',
                    active_tab: 1,
                    component: Competition
                },
                {
                    path: ':encid/detail(/:title)',
                    name: 'competition_regulation',
                    active_tab: 1,
                    component: Competition
                },
                {
                    path: ':encid/prizes(/:title)',
                    active_tab: 2,
                    component: Competition
                },
                {
                    path: ':encid/annoucements(/:title)',
                    active_tab: 3,
                    component: Competition
                },
                {
                    path: ':encid/discussions(/:title)',
                    active_tab: 4,
                    component: Competition
                },
                {
                    path: ':encid/contacts(/:title)',
                    active_tab: 5,
                    component: Competition
                },
                {
                    path: ':encid/share(/:title)',
                    active_tab: 6,
                    component: Competition
                },
                {
                    path: ':encid/source(/:title)',
                    iframe_type: 'sumber',
                    component: CompetitionIframe
                },
                {
                    path: ':encid/join(/:title)',
                    iframe_type: 'ikuti',
                    component: CompetitionIframe
                }
            ]
        }
    ]
}