import { Actualities } from "@/types/pages/detail-actualites";

export const actualites: Actualities[] = [
  {
    id: "assemblee-generale-2026",
    title:
      "Holiday Geek Cup tiendra son Assemblée Générale le vendredi 13 février 2026 à Lens",
    content: [
      {
        type: "paragraph",
        paragraphs: [
          "L’Assemblée Générale de Holiday Geek Cup se déroulera le vendredi 13 février à la Micro-Folie, située 13D route de Béthune, 62300 Lens.",
          "L’événement débutera à 15h pour les partenaires et invités, puis sera ouvert à l’ensemble des participants à partir de 18h.",
          "Cette Assemblée Générale permettra de présenter le bilan de l’année écoulée, les orientations stratégiques à venir et les prochains projets de l’organisation, dans un cadre dédié à la culture et à l’innovation numérique.",
        ],
      },
    ],
    image: {
      src: "/assets/img/actus/assemblee-generale-2026.webp",
      alt: "Assemblée Générale 2026",
      position: "right",
    },
    cta: {
      type: "weezevent",
      isExternal: false,
      label: "S'inscrire à l'Assemblée Générale",
      weezeventCode:
        '<a title="Logiciel billetterie en ligne" href="https://weezevent.com/?c=sys_widget"   class="weezevent-widget-integration"   data-src="https://widget.weezevent.com/ticket/E1638551/?code=21051&locale=fr-FR&width_auto=1&color_primary=00AEEF"   data-width="650"   data-height="600"   data-id="1638551"   data-resize="1"   data-width_auto="1"   data-noscroll="0"   data-use-container="yes"   data-type="neo"   target="_blank">Billetterie Weezevent</a><script type="text/javascript" src="https://widget.weezevent.com/weez.js"></script>',
    },
  },
  {
    id: "nouveau-siege-social",
    title: "Holiday geek cup annonce le changement de son siège social",
    content: [
      {
        type: "paragraph",
        paragraphs: [
          "L’association Holiday Geek Cup informe de l’évolution de son siège social, désormais installé dans de nouveaux locaux à Lens.",
        ],
      },
      {
        type: "list",
        items: [
          "Ancienne adresse : 84 rue Paul Bert, 62300 Lens",
          "Nouvelle adresse : 45 rue François Gauthier, 62300 Lens",
        ],
      },
      {
        type: "paragraph",
        paragraphs: [
          "Ce changement d’implantation, tout en restant dans le même secteur géographique, vise à accompagner le développement des projets de l’association dans des conditions plus adaptées.",
          "Les partenaires et contacts sont invités à mettre à jour leurs informations. De nouvelles annonces suivront prochainement.",
        ],
      },
    ],
    image: {
      src: "/assets/img/actus/nouveaux-locaux.webp",
      alt: "Nouveaux locaux de Holiday Geek Cup",
      position: "left",
    },
  },
];

export default actualites;
