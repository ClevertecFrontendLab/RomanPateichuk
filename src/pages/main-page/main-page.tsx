import React from 'react';
import styles from './main-page.module.scss';
import {
    AndroidFilled, AppleFilled,
    HeartFilled, CalendarTwoTone, IdcardOutlined
} from "@ant-design/icons";
import {Button, Layout, Space, Typography} from "antd";

const {Content,} = Layout;

const {Link, Paragraph, Text} = Typography;

export const MainPage: React.FC = () => {
    return (
        <Content className={styles.main}>
            <div className={styles.content}>
                <Paragraph className={styles.description}>
                    С CleverFit ты сможешь:
                    <ul className={styles.list}>
                        <li className={styles.item}>&mdash;&nbsp;&nbsp;планировать
                            свои тренировки на календаре, выбирая тип
                            и уровень нагрузки;
                        </li>
                        <li className={styles.item}>&mdash;&nbsp;&nbsp;отслеживать
                            свои достижения в разделе статистики,
                            сравнивая свои результаты с нормами и рекордами;
                        </li>
                        <li className={styles.item}>&mdash;&nbsp;&nbsp;создавать свой
                            профиль, где ты можешь
                            загружать свои
                            фото, видео и отзывы о тренировках;
                        </li>
                        <li className={styles.item}>&mdash;&nbsp;&nbsp;выполнять
                            расписанные тренировки для разных частей
                            тела, следуя подробным инструкциям и советам
                            профессиональных
                            тренеров.
                        </li>
                    </ul>
                </Paragraph>
                <Paragraph className={styles.definition}>
                    CleverFit — это не просто приложение, а твой личный помощник в мире
                    фитнеса. Не
                    откладывай на завтра — начни тренироваться уже сегодня!
                </Paragraph>
                <div className={styles.tasks}>
                    <div className={styles.item}>
                        <h2 className={styles.title}>Расписать тренировки</h2>
                        <Button className={styles.button} type="link"
                                icon={<HeartFilled/>}>Тренировки</Button>
                    </div>
                    <div className={styles.item}>
                        <h2 className={styles.title}>Назначить календарь</h2>
                        <Button className={styles.button} type="link"
                                icon={<CalendarTwoTone twoToneColor={'var(--color-task-button-icon)'}/>}>Календарь</Button>
                    </div>
                    <div className={styles.item}>
                        <h2 className={styles.title}>Заполнить профиль</h2>
                        <Button className={styles.button} type="link"
                                icon={<IdcardOutlined />}>Профиль</Button>
                    </div>
                </div>
            </div>
            <div className={styles.bottom_block}>
                <Space wrap={true} className={styles.links_wrapper}>
                    <Link href="/" className={styles.link}>
                        Смотреть отзывы
                    </Link>
                </Space>

                <div className={styles.download_block}>
                    <Space className={styles.download_section} direction="vertical">
                        <Link className={styles.link} href="/">Скачать на телефон</Link>
                        <Text className={styles.text}>Доступно в PRO-тарифe</Text>
                    </Space>
                    <Space className={styles.buttons} direction="horizontal">
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
