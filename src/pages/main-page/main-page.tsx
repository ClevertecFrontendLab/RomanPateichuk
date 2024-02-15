import React from 'react';
import s from './main-page.module.scss';
import {
    AndroidFilled, AppleFilled,
    HeartFilled,
} from "@ant-design/icons";
import {Button, Layout, Space, Typography} from "antd";

import {
    CalendarIcon,
    ProfileIcon,
} from "@components/Icon/library.tsx";

const {Content,} = Layout;

const {Link, Paragraph, Text} = Typography;

export const MainPage: React.FC = () => {
    return (
        <Content className={s.main}>
            <div className={s.content}>
                <Paragraph className={s.description}>
                    С CleverFit ты сможешь:
                    <ul className={s.list}>
                        <li className={s.item}>&mdash;&nbsp;&nbsp;планировать
                            свои тренировки на календаре, выбирая тип
                            и уровень нагрузки;
                        </li>
                        <li className={s.item}>&mdash;&nbsp;&nbsp;отслеживать
                            свои достижения в разделе статистики,
                            сравнивая свои результаты с нормами и рекордами;
                        </li>
                        <li className={s.item}>&mdash;&nbsp;&nbsp;создавать свой
                            профиль, где ты можешь
                            загружать свои
                            фото, видео и отзывы о тренировках;
                        </li>
                        <li className={s.item}>&mdash;&nbsp;&nbsp;выполнять
                            расписанные тренировки для разных частей
                            тела, следуя подробным инструкциям и советам
                            профессиональных
                            тренеров.
                        </li>
                    </ul>
                </Paragraph>
                <Paragraph className={s.definition}>
                    CleverFit — это не просто приложение, а твой личный помощник в мире
                    фитнеса. Не
                    откладывай на завтра — начни тренироваться уже сегодня!
                </Paragraph>
                <div className={s.tasks}>
                    <div className={s.item}>
                        <h2 className={s.title}>Расписать тренировки</h2>
                        <Button className={s.button} type="link"
                                icon={<HeartFilled/>}>Тренировки</Button>
                    </div>
                    <div className={s.item}>
                        <h2 className={s.title}>Назначить календарь</h2>
                        <Button className={s.button} type="link"
                                icon={<CalendarIcon/>}>Календарь</Button>
                    </div>
                    <div className={s.item}>
                        <h2 className={s.title}>Заполнить профиль</h2>
                        <Button className={s.button} type="link"
                                icon={<ProfileIcon/>}>Профиль</Button>
                    </div>
                </div>
            </div>
            <div className={s.bottom_block}>
                <Space wrap={true} className={s.links_wrapper}>
                    <Link href="/" className={s.link}>
                        Смотреть отзывы
                    </Link>
                </Space>

                <div className={s.download_block}>
                    <Space className={s.download_section} direction="vertical">
                        <Link className={s.link} href="/">Скачать на телефон</Link>
                        <Text className={s.text}>Доступно в PRO-тарифe</Text>
                    </Space>
                    <Space className={s.buttons} direction="horizontal">
                        <Button type="link" href="url://" icon={<AndroidFilled/>}>
                            Android OS
                        </Button>
                        <Button type="link" href="url://" icon={<AppleFilled/>}>
                            Apple iOS
                        </Button>
                    </Space>
                </div>
            </div>
        </Content>
    );
};
