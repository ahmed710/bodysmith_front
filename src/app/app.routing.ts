import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import {AddReclamationModule} from "./modules/admin/dashboards/add-reclamation/add-reclamation.module";

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    // Redirect empty path to '/dashboards/project'
    { path: '', pathMatch: 'full', redirectTo: 'dashboards/project' },

    // Redirect signed-in user to the '/dashboards/project'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {
        path: 'signed-in-redirect',
        pathMatch: 'full',
        redirectTo: 'dashboards/project',
    },

    // Auth routes for guests
    {
        path: '',
        canMatch: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () =>
                    import(
                        'app/modules/auth/confirmation-required/confirmation-required.module'
                    ).then((m) => m.AuthConfirmationRequiredModule),
            },
            {
                path: 'forgot-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/forgot-password/forgot-password.module'
                    ).then((m) => m.AuthForgotPasswordModule),
            },
            {
                path: 'reset-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/reset-password/reset-password.module'
                    ).then((m) => m.AuthResetPasswordModule),
            },
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.module').then(
                        (m) => m.AuthSignInModule
                    ),
            },
            {
                path: 'sign-up',
                loadChildren: () =>
                    import('app/modules/auth/sign-up/sign-up.module').then(
                        (m) => m.AuthSignUpModule
                    ),
            },
            {
                path: 'sign-upuser',
                loadChildren: () =>
                    import('app/modules/auth/sign-up-user/sign-up.module').then(
                        (m) => m.AuthSignUpUserModule
                    ),
            },
            {
                path: 'sign-upcoach',
                loadChildren: () =>
                    import(
                        'app/modules/auth/sign-up-coach/sign-up.module'
                    ).then((m) => m.AuthSignUpCoachModule),
            },
            {
                path: 'sign-upnutri',
                loadChildren: () =>
                    import(
                        'app/modules/auth/sign-up-nutri/sign-up.module'
                    ).then((m) => m.AuthSignUpNutriModule),
            },
            {
                path: 'select',
                loadChildren: () =>
                    import(
                        'app/modules/auth/choice-account/choice-account.module'
                    ).then((m) => m.ChoiceAccountModule),
            },
        ],
    },

    // Auth routes for authenticated users
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.module').then(
                        (m) => m.AuthSignOutModule
                    ),
            },
            {
                path: 'unlock-session',
                loadChildren: () =>
                    import(
                        'app/modules/auth/unlock-session/unlock-session.module'
                    ).then((m) => m.AuthUnlockSessionModule),
            },
        ],
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('app/modules/landing/home/home.module').then(
                        (m) => m.LandingHomeModule
                    ),
            },
        ],
    },

    // Admin routes
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            // Dashboards
            {
                path: 'dashboards',
                children: [
                    {
                        path: 'project',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/dashboards/project/project.module'
                            ).then((m) => m.ProjectModule),
                    },
                    {
                        path: 'users',
                        children: [
                            {
                                path: '',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/dashboards/users/users.module'
                                    ).then((m) => m.UsersModule),
                            },
                            {
                                path: ':id',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/dashboards/userDetails/user-details-routing.module'
                                    ).then((m) => m.CoachDetailsModule),
                            },
                        ],
                    },
                    // {
                    //     path: 'users',
                    //     loadChildren: () =>
                    //         import(
                    //             'app/modules/admin/dashboards/users/users.module'
                    //         ).then((m) => m.UsersModule),
                    // },
                    {
                        path: 'coaches',
                        children: [
                            {
                                path: '',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/dashboards/coaches/coaches.module'
                                    ).then((m) => m.CoachModule),
                            },
                            {
                                path: ':id',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/dashboards/coachDetails/coach-details-routing.module'
                                    ).then((m) => m.CoachDetailsModule),
                            },
                        ],
                    },
                    // {
                    //     path: 'coaches',
                    //     loadChildren: () =>
                    //         import(
                    //             'app/modules/admin/dashboards/coaches/coaches.module'
                    //         ).then((m) => m.CoachModule),
                    // },
                    // {
                    //     path: 'nutritionnistes',
                    //     loadChildren: () =>
                    //         import(
                    //             'app/modules/admin/dashboards/nutritionnistes/nutri.module'
                    //         ).then((m) => m.NutriModule),
                    // },
                    {
                        path: 'nutritionnistes',
                        children: [
                            {
                                path: '',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/dashboards/nutritionnistes/nutri.module'
                                    ).then((m) => m.NutriModule),
                            },
                            {
                                path: ':id',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/dashboards/nutriDetails/nutri-details-routing.module'
                                    ).then((m) => m.CoachDetailsModule),
                            },
                        ],
                    },
                    {
                        path: 'analytics',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/dashboards/changePassword/change-password.module'
                            ).then((m) => m.ChangePasswordModule),
                    },
                    {
                        path: 'finance',
                        children: [
                            {
                                path: '',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/dashboards/admin/coaches.module'
                                    ).then((m) => m.CoachModule),
                            },
                            {
                                path: ':id',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/dashboards/adminDetails/coach-details-routing.module'
                                    ).then((m) => m.CoachDetailsModule),
                            },
                        ],
                    },
                    {
                        path: 'crypto',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/dashboards/crypto/crypto.module'
                            ).then((m) => m.CryptoModule),
                    },
                    {
                        path: 'add-product/:id?',
                        loadComponent: () =>
                            import(
                                'app/modules/admin/dashboards/add-product/add-product.component'
                                ).then((m) => m.AddProductComponent),
                    },
                    {
                        path: 'add-product',
                        loadComponent: () =>
                            import(
                                'app/modules/admin/dashboards/add-product/add-product.component'
                                ).then((m) => m.AddProductComponent),
                    },
                    {
                        path: 'add-category',
                        loadComponent: () =>
                            import(
                                'app/modules/admin/dashboards/add-category/add-category.component'
                                ).then((m) => m.AddCategoryComponent),
                    },
                    {
                        path: 'list-product',
                        loadComponent: () =>
                            import(
                                'app/modules/admin/dashboards/list-product/list-product.component'
                                ).then((m) => m.ListProductComponent),
                    },
                ],
            },
            {path: 'dashboards', children: [
                {path: 'project', loadChildren: () => import('app/modules/admin/dashboards/project/project.module').then(m => m.ProjectModule)},
                // {path: 'analytics', loadChildren: () => import('app/modules/admin/dashboards/analytics/analytics.module').then(m => m.AnalyticsModule)},
                {path: 'reclamation',
                    children: [{path:'',loadChildren: () => import('app/modules/admin/dashboards/reclamation/reclamation.module').then(m => m.ReclamationModule)},
                            {path:':id',loadChildren: () => import('app/modules/admin/dashboards/reclamation-details/reclamation-details.module').then(m => m.ReclamationDetailsModule)}],},
                    {path: 'add-reclamation', loadChildren: () => import('app/modules/admin/dashboards/add-reclamation/add-reclamation.module').then(m => m.AddReclamationModule)},

                    {path: 'crypto', loadChildren: () => import('app/modules/admin/dashboards/crypto/crypto.module').then(m => m.CryptoModule)},
                    {path: 'categories', loadChildren: () => import('app/modules/admin/dashboards/commentaire/commentaire.module').then(m => m.CommentaireModule)},
                    {path: 'dashboard', loadChildren: () => import('app/modules/admin/dashboards/dashboard/dashboard.module').then(m => m.DashboardModule)},
                    {path: 'zouhour-coaches', loadChildren: () => import('app/modules/admin/dashboards/zouhour-coaches/zouhour-coaches.module').then(m => m.CoachesModule)},
                    {
                        path: 'reservations',
                        loadChildren: () => import('app/modules/admin/dashboards/reservations/reservations.module').then(m => m.ReservationsModule)
                    },
                    {path: 'sessions', loadChildren: () => import('app/modules/admin/dashboards/sessions/sessions.module').then(m => m.SessionsModule)},
                    {
                        path: 'reservation',
                        children: [{
                            path: '',
                            loadChildren: () => import('app/modules/admin/dashboards/reservations/reservations.module').then(m => m.ReservationsModule)
                        }, {
                            path: 'reserver',
                            loadChildren: () => import('app/modules/admin/dashboards/reservations/reservations.module').then(m => m.ReservationsModule)
                        }]},
                ]},
            {
                path: 'dashboards',
                children: [
                    {
                        path: 'project',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/dashboards/project/project.module'
                            ).then((m) => m.ProjectModule),
                    },
                    // {
                    //     path: 'analytics',
                    //     loadChildren: () =>
                    //         import(
                    //             'app/modules/admin/dashboards/analytics/analytics.module'
                    //         ).then((m) => m.AnalyticsModule),
                    // },
                    {
                        path: 'finance',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/dashboards/finance/finance.module'
                            ).then((m) => m.FinanceModule),
                    },
                    {
                        path: 'crypto',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/dashboards/crypto/crypto.module'
                            ).then((m) => m.CryptoModule),
                    },
                    {
                        path: 'admin-restaurant',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/dashboards/admin-restaurant/admin-restaurant.module'
                            ).then((m) => m.AdminRestaurantModule),
                    },
                    {
                        path: 'admin-plat',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/dashboards/admin-plat/admin-plat.module'
                            ).then((m) => m.AdminPlatModule),
                    },
                    {
                        path: 'admin-categorie-restaurant',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/dashboards/admin-categorie-restaurant/admin-categorie-restaurant.module'
                            ).then((m) => m.AdminCategorieRestaurantModule),
                    },
                ],
            },

            // Apps
            {
                path: 'apps',
                children: [
                    {
                        path: 'academy',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/apps/academy/academy.module'
                            ).then((m) => m.AcademyModule),
                    },
                    {
                        path: 'chat',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/apps/chat/chat.module'
                            ).then((m) => m.ChatModule),
                    },
                    {
                        path: 'contacts',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/apps/contacts/contacts.module'
                            ).then((m) => m.ContactsModule),
                    },
                    {
                        path: 'ecommerce',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/apps/ecommerce/ecommerce.module'
                            ).then((m) => m.ECommerceModule),
                    },
                    {
                        path: 'file-manager',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/apps/file-manager/file-manager.module'
                            ).then((m) => m.FileManagerModule),
                    },
                    {
                        path: 'help-center',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/apps/help-center/help-center.module'
                            ).then((m) => m.HelpCenterModule),
                    },
                    {
                        path: 'mailbox',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/apps/mailbox/mailbox.module'
                            ).then((m) => m.MailboxModule),
                    },
                    {
                        path: 'notes',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/apps/notes/notes.module'
                            ).then((m) => m.NotesModule),
                    },
                    {
                        path: 'scrumboard',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/apps/scrumboard/scrumboard.module'
                            ).then((m) => m.ScrumboardModule),
                    },
                    {
                        path: 'tasks',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/apps/tasks/tasks.module'
                            ).then((m) => m.TasksModule),
                    },
                ],
            },

            // Pages
            {
                path: 'pages',
                children: [
                    // Activities
                    {
                        path: 'activities',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/pages/activities/activities.module'
                            ).then((m) => m.ActivitiesModule),
                    },

                    // Authentication
                    {
                        path: 'authentication',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/pages/authentication/authentication.module'
                            ).then((m) => m.AuthenticationModule),
                    },

                    // Coming Soon
                    {
                        path: 'coming-soon',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/pages/coming-soon/coming-soon.module'
                            ).then((m) => m.ComingSoonModule),
                    },

                    // Error
                    {
                        path: 'error',
                        children: [
                            {
                                path: '404',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/pages/error/error-404/error-404.module'
                                    ).then((m) => m.Error404Module),
                            },
                            {
                                path: '500',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/pages/error/error-500/error-500.module'
                                    ).then((m) => m.Error500Module),
                            },
                        ],
                    },

                    // Invoice
                    {
                        path: 'invoice',
                        children: [
                            {
                                path: 'printable',
                                children: [
                                    {
                                        path: 'compact',
                                        loadChildren: () =>
                                            import(
                                                'app/modules/admin/pages/invoice/printable/compact/compact.module'
                                            ).then((m) => m.CompactModule),
                                    },
                                    {
                                        path: 'modern',
                                        loadChildren: () =>
                                            import(
                                                'app/modules/admin/pages/invoice/printable/modern/modern.module'
                                            ).then((m) => m.ModernModule),
                                    },
                                ],
                            },
                        ],
                    },

                    // Maintenance
                    {
                        path: 'maintenance',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/pages/maintenance/maintenance.module'
                            ).then((m) => m.MaintenanceModule),
                    },

                    // Pricing
                    {
                        path: 'pricing',
                        children: [
                            {
                                path: 'modern',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/pages/pricing/modern/modern.module'
                                    ).then((m) => m.PricingModernModule),
                            },
                            {
                                path: 'simple',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/pages/pricing/simple/simple.module'
                                    ).then((m) => m.PricingSimpleModule),
                            },
                            {
                                path: 'single',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/pages/pricing/single/single.module'
                                    ).then((m) => m.PricingSingleModule),
                            },
                            {
                                path: 'table',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/pages/pricing/table/table.module'
                                    ).then((m) => m.PricingTableModule),
                            },
                        ],
                    },

                    // Profile
                    {
                        path: 'profile',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/pages/profile/profile.module'
                            ).then((m) => m.ProfileModule),
                    },

                    // Settings
                    {
                        path: 'settings',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/pages/settings/settings.module'
                            ).then((m) => m.SettingsModule),
                    },
                ],
            },

            // User Interface
            {
                path: 'ui',
                children: [
                    // Material Components
                    {
                        path: 'material-components',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/ui/material-components/material-components.module'
                            ).then((m) => m.MaterialComponentsModule),
                    },

                    // Fuse Components
                    {
                        path: 'fuse-components',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/ui/fuse-components/fuse-components.module'
                            ).then((m) => m.FuseComponentsModule),
                    },

                    // Other Components
                    {
                        path: 'other-components',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/ui/other-components/other-components.module'
                            ).then((m) => m.OtherComponentsModule),
                    },

                    // TailwindCSS
                    {
                        path: 'tailwindcss',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/ui/tailwindcss/tailwindcss.module'
                            ).then((m) => m.TailwindCSSModule),
                    },

                    // Advanced Search
                    {
                        path: 'advanced-search',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/ui/advanced-search/advanced-search.module'
                            ).then((m) => m.AdvancedSearchModule),
                    },

                    // Animations
                    {
                        path: 'animations',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/ui/animations/animations.module'
                            ).then((m) => m.AnimationsModule),
                    },

                    // Cards
                    {
                        path: 'cards',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/ui/cards/cards.module'
                            ).then((m) => m.CardsModule),
                    },

                    // Colors
                    {
                        path: 'colors',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/ui/colors/colors.module'
                            ).then((m) => m.ColorsModule),
                    },

                    // Confirmation Dialog
                    {
                        path: 'confirmation-dialog',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/ui/confirmation-dialog/confirmation-dialog.module'
                            ).then((m) => m.ConfirmationDialogModule),
                    },

                    // Datatable
                    {
                        path: 'datatable',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/ui/datatable/datatable.module'
                            ).then((m) => m.DatatableModule),
                    },

                    // Forms
                    {
                        path: 'forms',
                        children: [
                            {
                                path: 'fields',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/ui/forms/fields/fields.module'
                                    ).then((m) => m.FormsFieldsModule),
                            },
                            {
                                path: 'layouts',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/ui/forms/layouts/layouts.module'
                                    ).then((m) => m.FormsLayoutsModule),
                            },
                            {
                                path: 'wizards',
                                loadChildren: () =>
                                    import(
                                        'app/modules/admin/ui/forms/wizards/wizards.module'
                                    ).then((m) => m.FormsWizardsModule),
                            },
                        ],
                    },

                    // Icons
                    {
                        path: 'icons',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/ui/icons/icons.module'
                            ).then((m) => m.IconsModule),
                    },

                    // Page Layouts
                    {
                        path: 'page-layouts',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/ui/page-layouts/page-layouts.module'
                            ).then((m) => m.PageLayoutsModule),
                    },

                    // Typography
                    {
                        path: 'typography',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/ui/typography/typography.module'
                            ).then((m) => m.TypographyModule),
                    },
                ],
            },

            // Documentation
            {
                path: 'docs',
                children: [
                    // Changelog
                    {
                        path: 'changelog',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/docs/changelog/changelog.module'
                            ).then((m) => m.ChangelogModule),
                    },

                    // Guides
                    {
                        path: 'guides',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/docs/guides/guides.module'
                            ).then((m) => m.GuidesModule),
                    },
                ],
            },

            // 404 & Catch all
            {
                path: '404-not-found',
                pathMatch: 'full',
                loadChildren: () =>
                    import(
                        'app/modules/admin/pages/error/error-404/error-404.module'
                    ).then((m) => m.Error404Module),
            },
            { path: '**', redirectTo: '404-not-found' },
        ],
    },
];
