import {CategoriesInfo} from "../types/Categories.ts";

const ci: CategoriesInfo = {
    "directions": [
        {
            "id": 1,
            "name": "Свой дом"
        },
        {
            "id": 2,
            "name": "Своя дача"
        },
        {
            "id": 3,
            "name": "Свой огород"
        },
        {
            "id": 4,
            "name": "Свая ферма"
        }
    ],
    "categories": [
        {
            "id": 1,
            "name": "Свой дом",
            "direction_ids": [
                1,
                2
            ]
        },
        {
            "id": 2,
            "name": "Гараж",
            "direction_ids": [
                1
            ]
        },
        {
            "id": 3,
            "name": "Баня",
            "direction_ids": [
                1
            ]
        },
        {
            "id": 4,
            "name": "Для загородного отдыха",
            "direction_ids": [
                1,
                2
            ]
        },
        {
            "id": 5,
            "name": "Дворовые постройки",
            "direction_ids": [
                2
            ]
        },
        {
            "id": 6,
            "name": "Техника для сада",
            "direction_ids": [
                2,
                3
            ]
        },
        {
            "id": 7,
            "name": "Садовый инвентарь",
            "direction_ids": [
                3
            ]
        },
        {
            "id": 8,
            "name": "Садовые постройки",
            "direction_ids": [
                3
            ]
        },
        {
            "id": 9,
            "name": "Семена, саженцы и удобрения",
            "direction_ids": [
                3
            ]
        },
        {
            "id": 10,
            "name": "Постройки для животных",
            "direction_ids": [
                4
            ]
        },
        {
            "id": 11,
            "name": "Животные",
            "direction_ids": [
                4
            ]
        },
        {
            "id": 12,
            "name": "Уход за животными",
            "direction_ids": [
                4
            ]
        }
    ],
    "tags": [
        {
            "id": 1,
            "name": "Проектировка дома",
            "category_id": 1
        },
        {
            "id": 2,
            "name": "Строительство дома",
            "category_id": 1
        },
        {
            "id": 3,
            "name": "Дом с участком",
            "category_id": 1
        },
        {
            "id": 4,
            "name": "Обустройство дома",
            "category_id": 1
        },
        {
            "id": 5,
            "name": "Инженерные коммуникации на участке",
            "category_id": 1
        },
        {
            "id": 6,
            "name": "Возведение гаража",
            "category_id": 2
        },
        {
            "id": 7,
            "name": "Сборный гараж",
            "category_id": 2
        },
        {
            "id": 8,
            "name": "Проект бани",
            "category_id": 3
        },
        {
            "id": 9,
            "name": "Баня",
            "category_id": 3
        },
        {
            "id": 10,
            "name": "Бассейны для дачи",
            "category_id": 4
        },
        {
            "id": 11,
            "name": "Беседки для дачи",
            "category_id": 4
        },
        {
            "id": 12,
            "name": "Клумбы",
            "category_id": 5
        },
        {
            "id": 13,
            "name": "Обустройство участка",
            "category_id": 5
        },
        {
            "id": 14,
            "name": "Техника для сада",
            "category_id": 6
        },
        {
            "id": 15,
            "name": "Садовый инвентарь",
            "category_id": 7
        },
        {
            "id": 16,
            "name": "Теплицы",
            "category_id": 8
        },
        {
            "id": 17,
            "name": "Грядки",
            "category_id": 8
        },
        {
            "id": 18,
            "name": "Семена",
            "category_id": 9
        },
        {
            "id": 19,
            "name": "Удобрения",
            "category_id": 9
        },
        {
            "id": 20,
            "name": "Рассада",
            "category_id": 9
        },
        {
            "id": 21,
            "name": "Саженцы",
            "category_id": 9
        },
        {
            "id": 22,
            "name": "Постройки для животных",
            "category_id": 10
        },
        {
            "id": 23,
            "name": "Животные",
            "category_id": 11
        },
        {
            "id": 24,
            "name": "Корма для животных",
            "category_id": 12
        },
        {
            "id": 25,
            "name": "Ветеринарные услуги",
            "category_id": 12
        }
    ]
};

export const useCategoryInfo = () => {
    return ci;
}
