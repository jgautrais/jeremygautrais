import Container from '../components/Container';
import Image from 'next/image';
import * as basicLightbox from 'basiclightbox';
import { useState } from 'react';

export default function Illustration() {
    const illustrations = [
        {
            title: 'Glasshouse',
            src: 'voxel-061_glasshouse.png',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Concert scene',
            src: 'voxel-060_concert.png',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Cascade',
            src: 'voxel-059_cascade.png',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Saloon',
            src: 'voxel-058_saloon.png',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Skyscraper',
            src: 'voxel-057_skyscraper.png',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Winter cabin',
            src: 'voxel-056_winter_cabin.png',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Windmill',
            src: 'voxel-055_windmill.png',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Brick factory',
            src: 'voxel-054_brick_factory.png',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Office',
            src: 'voxel-053_office.png',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Forêt-noire',
            src: 'vector-012_flat_foretnoire.png',
            format: '3x4',
            style: 'vector',
        },
        {
            title: 'Chenonceaux Castle',
            src: 'voxel-052_chenonceaux_castle.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Tarte à la praline',
            src: 'vector-009_flat_praline.png',
            format: '3x4',
            style: 'vector',
        },
        {
            title: 'The Old Abbey',
            src: 'voxel-051_old_abbey.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'The Roman Bridge',
            src: 'voxel-050_roman_bridge.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Hiking Gear',
            src: 'voxel-047_hiking_gear.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'The Old Docks',
            src: 'voxel-049_old_docks.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Mont Saint-Michel',
            src: 'vector-008_mt_st_michel.jpg',
            format: '1x1',
            style: 'vector',
        },
        {
            title: 'The Typewriter desk',
            src: 'voxel-048_typewriter_desk.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Eerie Waterfall',
            src: 'voxel-046_waterfall.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Winter Cabin',
            src: 'vector-004_winter_cabin.jpg',
            format: '1x1',
            style: 'vector',
        },
        {
            title: 'The Bath',
            src: 'voxel-045_low_poly_bath.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Living room',
            src: 'voxel-039_low_poly_living_room.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Tap Beer',
            src: 'voxel-044_low_poly_beer_taps.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Millefeuille',
            src: 'vector-011_flat_millefeuille.png',
            format: '3x4',
            style: 'vector',
        },
        {
            title: 'Sun Bathing',
            src: 'voxel-043_low_poly_sun_bathing.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Lyon, Colline de Fourvière',
            src: 'vector-005_lyon.jpg',
            format: '1x1',
            style: 'vector',
        },
        {
            title: 'Barbecue',
            src: 'voxel-042_low_poly_barbecue.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Summer Home',
            src: 'voxel-032_summer_home.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Small Study',
            src: 'voxel-040_low_poly_study.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Lyon, Colline de Fourvière',
            src: 'voxel-029_fourviere_hill.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Storage Room',
            src: 'voxel-041_low_poly_storage_room.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Train Station',
            src: 'voxel-013_small_train_station.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Houses',
            src: 'vector-003_houses.jpg',
            format: '1x1',
            style: 'vector',
        },
        {
            title: 'Butcher Shop',
            src: 'voxel-014_small_butcher_shop.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: "Fishmonger's Shop",
            src: 'voxel-015_small_fishmonger_shop.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Grocery Shop',
            src: 'voxel-016_small_grocery_shop.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Post Office',
            src: 'voxel-017_small_post_office.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Tobacco Shop',
            src: 'voxel-018_small_tobacco_shop.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Black rocks',
            src: 'voxel-030_black_rocks.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Police Station',
            src: 'voxel-019_small_police_station.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Windmill',
            src: 'vector-006_windmill.jpg',
            format: '1x1',
            style: 'vector',
        },
        {
            title: 'Fire Station',
            src: 'voxel-020_small_fire_station.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Town Hall',
            src: 'voxel-022_small_town_hall.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Old Church',
            src: 'voxel-021_small_church.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Furniture',
            src: 'voxel-038_furniture.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Bakery Shop',
            src: 'voxel-037_lyon_pralus.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Lyon Skyline',
            src: 'voxel-036_lyon_skyline.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Turntable',
            src: 'vector_001_turntable.jpg',
            format: '1x1',
            style: 'vector',
        },
        {
            title: 'Small Shelf',
            src: 'voxel-011_small_shelf.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Christmas Cabin',
            src: 'voxel-034_christmas_cabin.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Playing Snooker',
            src: 'voxel-026_playing_snooker.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Watermill',
            src: 'vector-007_water_mill.jpg',
            format: '1x1',
            style: 'vector',
        },
        {
            title: 'Lonely Lighthouse',
            src: 'voxel-025_lonely_lighthouse.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Starry Night',
            src: 'voxel-024_starry_night.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Night Drive',
            src: 'voxel-009_night_drive.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Lyon, le funiculaire',
            src: 'voxel-028_farewell_orange_funicular.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Living Room',
            src: 'voxel-012_cozy_living_room.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Eclair au chocolat',
            src: 'vector-010_flat_eclairchoc.png',
            format: '3x4',
            style: 'vector',
        },
        {
            title: 'Lyon, les Gratte-Ciel',
            src: 'voxel-035_lyon_gratte_ciel.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Hogwarts',
            src: 'voxel-031_hogwarts.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Home',
            src: 'voxel-004_home.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Pixel Art',
            src: 'pixel_001-some_pixel_art.jpg',
            format: '1x1',
            style: 'voxel',
        },
        {
            title: 'Home',
            src: 'vector_002_house.jpg',
            format: '1x1',
            style: 'vector',
        },
        {
            title: 'Hogwarts at night',
            src: 'voxel-033_hogwarts_night.jpg',
            format: '1x1',
            style: 'voxel',
        },
    ];

    const [illu, setIllu] = useState(illustrations);
    const [filter, setFilter] = useState('all');

    const handleClickSelector = (style) => (e) => {
        setIllu(illustrations.filter((x) => x.style === style));
        setFilter(style);
    };
    const handleClickAll = () => {
        setIllu(illustrations);
        setFilter('all');
    };

    const Section = ({ children }) => {
        return <section className='mt-12 my-20'>{children}</section>;
    };
    const H1 = ({ children }) => {
        return (
            <h1 className='text-3xl sm:text-4xl font-bold mb-6'>{children}</h1>
        );
    };

    const Button = ({ children, onClick, name, middle = false }) => {
        return (
            <button
                type='button'
                className={`${middle ? 'mx-4' : ''} px-4 py-1 rounded-lg ${
                    name === filter
                        ? 'bg-blue-600 text-white dark:bg-blue-600'
                        : 'bg-gray-200 dark:bg-gray-600'
                } flex items-center justify-center flex-shrink-0 self-center hover:ring-2 ring-gray-300  transition-all m-w-max`}
                onClick={onClick}
            >
                {children}
            </button>
        );
    };

    const handleClick = (title, src) => (e) => {
        const instance = basicLightbox.create(`
    <div class="modal">
    <div
                class='lightbox__img'
              >
                <Image
                  alt='${title}'
                  src='/static/images/illustration/${src}'
                  loading='lazy'
                />
              </div>
        <p class="title"><span class="title-span">#</span>${title}</p>
        <p class="hint">Click outside to close</p>
    </div>
`);

        instance.show();
    };

    return (
        <Container
            title='Jérémy Gautrais - Illustration'
            description='Voxel and vector enthusiast, based in Lyon, FR.'
        >
            <Section>
                <H1>Illustration</H1>
                <div className='flex justify-center mb-8'>
                    <Button onClick={handleClickAll} name='all'>
                        All
                    </Button>
                    <Button
                        onClick={handleClickSelector('voxel')}
                        name='voxel'
                        middle={true}
                    >
                        Voxel
                    </Button>
                    <Button
                        onClick={handleClickSelector('vector')}
                        name='vector'
                    >
                        Vector
                    </Button>
                </div>

                <div className='flex flex-col sm:flex-row flex-wrap justify-between items-center'>
                    {illu.map((x, i) => {
                        return (
                            <div
                                className='illustration__img relative mx-auto mb-16 md:mb-8 px-4 w-80 md:w-64 h-auto'
                                onClick={handleClick(x.title, x.src)}
                                key={i}
                            >
                                <Image
                                    alt={x.title}
                                    src={`/static/images/illustration/${x.src}`}
                                    layout='responsive'
                                    objectFit='cover'
                                    sizes='25vw'
                                    width={x.format === '1x1' ? 100 : 300}
                                    height={x.format === '1x1' ? 100 : 400}
                                />
                            </div>
                        );
                    })}
                </div>
            </Section>
        </Container>
    );
}
