import { config, graphql, list } from '@keystone-6/core'
import { text, relationship, file, image, integer, virtual, float, json, checkbox, select } from '@keystone-6/core/fields'
import { document } from '@keystone-6/fields-document'

import { EBuildingStatus, EFeatureType, EPricePolicy } from './utils/types'

export default config({
  db: { provider: 'sqlite', url: 'file:./app.db' },
  experimental: {
    generateNextGraphqlAPI: true,
    generateNodeAPI: true
  },
  images: { upload: 'local' },
  files: { upload: 'local' },

  lists: {
    Developer: list({
      fields: {
        title: text({ validation: { isRequired: true } }),
        logo: relationship({ ref: 'Image', many: false }),
        logoSymbol: relationship({ ref: 'Image', many: false }),
        favicon: relationship({ ref: 'Image', many: false }),
        address: text(),
        mapCoordinates: text(),
        googleMapLink: text(),
        phone: text(),
        email: text(),
        description: text(),
        tagLine: json({
          ui: {
            views: require.resolve('./admin/components/InternationalizedText.tsx'),
            createView: { fieldMode: 'edit' },
            listView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'edit' }
          }
        }),
        optionalTagLine: json({
          ui: {
            views: require.resolve('./admin/components/InternationalizedText.tsx'),
            createView: { fieldMode: 'edit' },
            listView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'edit' }
          }
        })
      }
    }),

    Project: list({
      defaultIsFilterable: () => Promise.resolve(true),
      fields: {
        title: text({ validation: { isRequired: true } }),
        slug: text({ validation: { isRequired: true }, isIndexed: true, isFilterable: true }),
        logo: relationship({ ref: 'Image', many: false }),
        favicon: relationship({ ref: 'Image', many: false }),
        phone: text({ validation: { isRequired: true } }),
        email: text({ validation: { isRequired: true } }),
        tagLine: json({
          ui: {
            views: require.resolve('./admin/components/InternationalizedText.tsx'),
            createView: { fieldMode: 'edit' },
            listView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'edit' }
          }
        }),
        optionalTagLine: json({
          ui: {
            views: require.resolve('./admin/components/InternationalizedText.tsx'),
            createView: { fieldMode: 'edit' },
            listView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'edit' }
          }
        }),
        description: json({
          ui: {
            views: require.resolve('./admin/components/InternationalizedText.tsx'),
            createView: { fieldMode: 'edit' },
            listView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'edit' }
          }
        }),
        city: text({ validation: { isRequired: true } }),
        address: text(),
        // link to go to when clicking on the project
        externalLink: text(),
        pricePolicy: select({
          validation: { isRequired: true },
          options: [
            { label: 'Hide price', value: EPricePolicy.hide },
            { label: 'Fixed price', value: EPricePolicy.fixed },
            { label: 'Starting from', value: EPricePolicy.starting }
          ],
          defaultValue: EPricePolicy.hide
        }),
        vatIncluded: checkbox({ defaultValue: false }),
        forSale: checkbox(),
        // this is the artboard size from XD
        svgViewbox: text(),
        // project stats at a glance
        stats: json({
          ui: {
            views: require.resolve('./admin/components/KeyValue.tsx'),
            createView: { fieldMode: 'edit' },
            listView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'edit' }
          }
        }),
        // project benefits
        benefits: json({
          ui: {
            views: require.resolve('./admin/components/KeyValue.tsx'),
            createView: { fieldMode: 'edit' },
            listView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'edit' }
          }
        }),
        technicalDetails: json({
          ui: {
            views: require.resolve('./admin/components/KeyValue.tsx'),
            createView: { fieldMode: 'edit' },
            listView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'edit' }
          }
        }),
        brochure: text(),
        mapCoordinates: text(),
        googleMapLink: text(),
        // relationships
        // the background used on building selection page
        buildingSelectorBg: relationship({ ref: 'Image', many: false }),
        intro: relationship({ ref: 'File', many: false }),
        thumbnail: relationship({ ref: 'Image', many: false }),
        gallery: relationship({ ref: 'Image', many: true }),
        moodGallery: relationship({ ref: 'Image', many: true }),
        modelsPreview: relationship({ ref: 'Image', many: true }),
        interiorGallery: relationship({ ref: 'Image', many: true }),
        exteriorGallery: relationship({ ref: 'Image', many: true }),
        lobbyGallery: relationship({ ref: 'Image', many: true }),
        timeline: relationship({ ref: 'Event', many: true }),
        features: relationship({ ref: 'Feature', many: true }),
        faqs: relationship({ ref: 'Faq', many: true }),
        buildings: relationship({ ref: 'Building.project', many: true }),
        // units on project are used for house only projects
        units: relationship({ ref: 'Unit.project', many: true }),
        members: relationship({ ref: 'Member.projects', many: true })
      }
    }),

    // Used to add Features for each Project. All content is optional and it's layout is decided by Feature Type
    Feature: list({
      fields: {
        title: text({ validation: { isRequired: true } }),
        type: select({
          validation: { isRequired: true },
          options: [{ label: 'Image with Text', value: EFeatureType.imageWithText }],
          defaultValue: EFeatureType.imageWithText
        }),
        titleTranslated: json({
          ui: {
            views: require.resolve('./admin/components/InternationalizedText.tsx'),
            createView: { fieldMode: 'edit' },
            listView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'edit' }
          }
        }),
        description: json({
          ui: {
            views: require.resolve('./admin/components/InternationalizedText.tsx'),
            createView: { fieldMode: 'edit' },
            listView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'edit' }
          }
        }),
        extraList: json({
          ui: {
            views: require.resolve('./admin/components/KeyValue.tsx'),
            createView: { fieldMode: 'edit' },
            listView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'edit' }
          }
        }),
        gallery: relationship({ ref: 'Image', many: true })
      },
      ui: {
        isHidden: true
      }
    }),

    Faq: list({
      fields: {
        title: text({ validation: { isRequired: true } }),
        titleTranslated: json({
          ui: {
            views: require.resolve('./admin/components/InternationalizedText.tsx'),
            createView: { fieldMode: 'edit' },
            listView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'edit' }
          }
        }),
        description: json({
          ui: {
            views: require.resolve('./admin/components/InternationalizedText.tsx'),
            createView: { fieldMode: 'edit' },
            listView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'edit' }
          }
        })
      }
    }),

    Event: list({
      fields: {
        title: text({ validation: { isRequired: true } }),
        titleTranslated: json({
          ui: {
            views: require.resolve('./admin/components/InternationalizedText.tsx'),
            createView: { fieldMode: 'edit' },
            listView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'edit' }
          }
        }),
        date: text({ validation: { isRequired: true } }),
        done: checkbox(),
        gallery: relationship({ ref: 'Image', many: true }),
        brochure: relationship({ ref: 'File', many: false })
      },
      ui: {
        isHidden: true
      }
    }),

    Building: list({
      defaultIsFilterable: () => Promise.resolve(true),
      fields: {
        title: text({ validation: { isRequired: true } }),
        slug: text({ validation: { isRequired: true } }),
        titleTranslated: json({
          ui: {
            views: require.resolve('./admin/components/InternationalizedText.tsx'),
            createView: { fieldMode: 'edit' },
            listView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'edit' }
          }
        }),
        description: json({
          ui: {
            views: require.resolve('./admin/components/InternationalizedText.tsx'),
            createView: { fieldMode: 'edit' },
            listView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'edit' }
          }
        }),
        // TODO: translate these fields
        status: select({
          validation: { isRequired: true },
          options: [
            { label: 'In autorizare', value: EBuildingStatus.autorizare },
            { label: 'In constructie', value: EBuildingStatus.constructie },
            { label: 'Finalizat', value: EBuildingStatus.finalizat },
            { label: 'Finalizat cu CF', value: EBuildingStatus.finalizatCuCF }
          ],
          defaultValue: EBuildingStatus.autorizare
        }),
        buildingOrientation: integer({
          validation: { isRequired: true, min: 0, max: 360 },
          defaultValue: 0
        }),
        // unit images may be rotated and the buildingOrientation will not match. We use this to correct that
        unitOrientationRotation: integer({ defaultValue: 0 }),
        unitOrientation: virtual({
          field: graphql.field({
            type: graphql.String,
            async resolve(item, args, context) {
              const { buildingOrientation, unitOrientationRotation } =
                await context.query.Building.findOne({
                  where: { id: item.id.toString() },
                  query: `
                  buildingOrientation
                  unitOrientationRotation
                `
                })
              return buildingOrientation + unitOrientationRotation
            }
          })
        }),
        buildingSvg: text({
          validation: { isRequired: true },
          ui: {
            displayMode: 'textarea'
          }
        }),
        buildingPosition: text(),
        pinPosition: text(),
        floorLabelPosition: text({
          defaultValue: '10/35'
        }),
        // this is the artboard size from XD
        svgViewbox: text({ validation: { isRequired: true } }),
        // floor background will default to building background
        floorplanDirections: json({
          ui: {
            views: require.resolve('./admin/components/KeyValue.tsx'),
            createView: { fieldMode: 'edit' },
            listView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'edit' }
          }
        }),
        // relationships
        svgBackground: relationship({ ref: 'Image', many: false }),
        project: relationship({ ref: 'Project.buildings', many: false }),
        floors: relationship({ ref: 'Floor.building', many: true }),
        // when clicking on a building, go to this floor
        linkToFloor: relationship({ ref: 'Floor', many: false }),
        units: relationship({ ref: 'Unit.building', many: true })
      }
    }),

    Floor: list({
      defaultIsFilterable: () => Promise.resolve(true),
      fields: {
        title: text({ validation: { isRequired: true } }),
        slug: text({ validation: { isRequired: true } }),
        titleTranslated: json({
          ui: {
            views: require.resolve('./admin/components/InternationalizedText.tsx'),
            createView: { fieldMode: 'edit' },
            listView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'edit' }
          }
        }),
        disabled: checkbox({ defaultValue: false }),
        floorSvg: text({
          validation: { isRequired: true },
          ui: {
            displayMode: 'textarea'
          }
        }),
        position: text(),
        pinPosition: text(),
        svgBackground: relationship({ ref: 'Image', many: false }),
        // relationships
        building: relationship({ ref: 'Building.floors', many: false }),
        units: relationship({ ref: 'Unit.floor', many: true })
      }
    }),

    UnitModel: list({
      defaultIsFilterable: () => Promise.resolve(true),
      fields: {
        title: text({ validation: { isRequired: true } }),
        rooms: integer({ validation: { isRequired: true } }),
        roomSizes: json({
          ui: {
            views: require.resolve('./admin/components/RoomInput.tsx'),
            createView: { fieldMode: 'edit' },
            listView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'edit' }
          }
        }),
        terraceSizes: json({
          ui: {
            views: require.resolve('./admin/components/RoomInput.tsx'),
            createView: { fieldMode: 'edit' },
            listView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'edit' }
          }
        }),
        unitSvg: text({
          validation: { isRequired: true },
          ui: {
            displayMode: 'textarea'
          }
        }),
        // relationships
        image: relationship({ ref: 'Image', many: true }),
        fisaTehnica: relationship({ ref: 'File', many: false }),
        units: relationship({ ref: 'Unit.model', many: true })
      }
    }),

    Unit: list({
      defaultIsFilterable: () => Promise.resolve(true),
      fields: {
        title: text({ validation: { isRequired: true } }),
        slug: text({ validation: { isRequired: true } }),
        titleTranslated: json({
          ui: {
            views: require.resolve('./admin/components/InternationalizedText.tsx'),
            createView: { fieldMode: 'edit' },
            listView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'edit' }
          }
        }),
        floorplanPosition: text(),
        // relationships
        project: relationship({ ref: 'Project.units', many: false }),
        building: relationship({ ref: 'Building.units', many: false }),
        floor: relationship({ ref: 'Floor.units', many: false }),
        model: relationship({ ref: 'UnitModel.units', many: false })
      }
    }),

    Member: list({
      defaultIsFilterable: () => Promise.resolve(true),
      fields: {
        // the actual person name
        title: text({ validation: { isRequired: true } }),
        phone: text(),
        email: text(),
        role: json({
          ui: {
            views: require.resolve('./admin/components/InternationalizedText.tsx'),
            createView: { fieldMode: 'edit' },
            listView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'edit' }
          }
        }),
        image: relationship({ ref: 'Image', many: false }),
        // relationships
        projects: relationship({ ref: 'Project.members', many: true }),
        articles: relationship({ ref: 'Article.author', many: true })
      }
    }),

    Article: list({
      defaultIsFilterable: () => Promise.resolve(true),
      fields: {
        title: text({ validation: { isRequired: true } }),
        titleTranslated: json({
          ui: {
            views: require.resolve('./admin/components/InternationalizedText.tsx'),
            createView: { fieldMode: 'edit' },
            listView: { fieldMode: 'hidden' },
            itemView: { fieldMode: 'edit' }
          }
        }),
        date: text({ validation: { isRequired: true } }),
        author: relationship({ ref: 'Member.articles', many: false }),
        featuredImage: relationship({ ref: 'Image', many: false }),
        content_ro: document({
          formatting: true,
          dividers: true,
          links: true,
          layouts: [
            [1, 1],
            [1, 1, 1]
          ]
        }),
        content_en: document({
          formatting: true,
          dividers: true,
          links: true,
          layouts: [
            [1, 1],
            [1, 1, 1]
          ]
        })
      }
    }),

    // any image or file
    File: list({
      fields: {
        title: text(),
        file: file()
      }
    }),

    Image: list({
      fields: {
        title: text(),
        image: image()
      }
    })
  }
})