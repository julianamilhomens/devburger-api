import * as Yup from 'yup';
import Category from '../models/Category';
import User from '../models/User';

class CategoryController {

    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { admin: isAdmin } = await User.findByPk(request.userId);

        if (!isAdmin) {
            return response.status(401).json();
        }

        const { name } = request.body;

        if (!request.file) {
            return response.status(400).json({ error: 'Image is required' });
        }

        const path = request.file.path;

        const categoryExists = await Category.findOne({
            where: { name },
        });

        if (categoryExists) {
            return response.status(400).json({ error: 'Category already exists' });
        }

        const category = await Category.create({
            name,
            path,
        });

        return response.status(201).json(category);
    }



    async update(request, response) {
        const schema = Yup.object({
            name: Yup.string(),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { admin: isAdmin } = await User.findByPk(request.userId);

        if (!isAdmin) {
            return response.status(401).json();
        }

        const { id } = request.params;

        const category = await Category.findByPk(id);

        if (!category) {
            return response
                .status(400)
                .json({ message: 'Make sure your category ID is correct' });
        }

        const { name } = request.body;

        if (name) {
            const categoryNameExists = await Category.findOne({
                where: { name },
            });

            if (categoryNameExists && categoryNameExists.id !== +id) {
                return response.status(400).json({ error: 'Category already exists' });
            }
        }

        let path;

        if (request.file) {
            path = request.file.path;
        }

        await category.update({
            name: name ?? category.name,
            path: path ?? category.path,
        });

        return response.json(category);
    }



    async index(request, response) {
        const categories = await Category.findAll();

        return response.json(categories);
    }
}

export default new CategoryController();
