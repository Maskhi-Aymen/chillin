# Generated by Django 4.0.1 on 2022-04-14 17:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pcd', '0004_alter_user_user_dateofjoin'),
    ]

    operations = [
        migrations.CreateModel(
            name='ResetPassword',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('token', models.TextField(max_length=500)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pcd.user')),
            ],
        ),
    ]
