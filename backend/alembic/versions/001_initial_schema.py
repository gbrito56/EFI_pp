"""initial_schema

Revision ID: 001_initial_schema
Revises: 
Create Date: 2026-11-04 21:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel

# revision identifiers, used by Alembic.
revision: str = '001_initial_schema'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 1. Tabla Categoria
    op.create_table(
        'categoria',
        sa.Column('nombre', sqlmodel.sql.sqltypes.AutoString(length=90), nullable=False),
        sa.Column('descripcion', sqlmodel.sql.sqltypes.AutoString(length=255), nullable=True),
        sa.Column('id', sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_categoria_nombre'), 'categoria', ['nombre'], unique=False)

    # 2. Tabla Proveedor
    op.create_table(
        'proveedor',
        sa.Column('nombre', sqlmodel.sql.sqltypes.AutoString(length=90), nullable=False),
        sa.Column('telefono', sqlmodel.sql.sqltypes.AutoString(length=50), nullable=True),
        sa.Column('id', sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_proveedor_nombre'), 'proveedor', ['nombre'], unique=False)

    # 3. Tabla Articulo (con FKs a categoria y proveedor)
    op.create_table(
        'articulo',
        sa.Column('nombre', sqlmodel.sql.sqltypes.AutoString(length=90), nullable=False),
        sa.Column('stock', sa.Integer(), nullable=True),
        sa.Column('precio', sa.Integer(), nullable=False),
        sa.Column('activo', sa.Boolean(), nullable=False),
        sa.Column('categoria_id', sa.Integer(), nullable=True),
        sa.Column('proveedor_id', sa.Integer(), nullable=True),
        sa.Column('id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['categoria_id'], ['categoria.id'], ),
        sa.ForeignKeyConstraint(['proveedor_id'], ['proveedor.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_articulo_nombre'), 'articulo', ['nombre'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_articulo_nombre'), table_name='articulo')
    op.drop_table('articulo')
    op.drop_index(op.f('ix_proveedor_nombre'), table_name='proveedor')
    op.drop_table('proveedor')
    op.drop_index(op.f('ix_categoria_nombre'), table_name='categoria')
    op.drop_table('categoria')
