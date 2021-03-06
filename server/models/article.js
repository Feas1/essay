const mongoose = require('mongoose')

const { Schema } = mongoose

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    abstract: {
        type: String,
        default: '',
    },
    thumbnail: {
        type: String,
        default: '',
    },
    isPublish: {
        type: Boolean,
        default: true,
    },
    isRecommend: {
        type: Boolean,
        default: true,
    },
    enableComment: {
        type: Boolean,
        default: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    flag: {
        type: Number,
        default: 0,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    media: [{
        type: Schema.Types.ObjectId,
        ref: 'Media',
    }],
    extends: [{
        name: {
            type: String,
            validate: /\S+/,
        },
        value: {
            type: String,
            validate: /\S+/,
        },
    }],
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag',
    }],
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            // 设置分类默认值为空对象而非null
            if (!ret.category) {
                ret.category = {}
            }
        },
    },
    minimize: false,
})


mongoose.model('Article', ArticleSchema)
