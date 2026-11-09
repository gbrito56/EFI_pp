"""add_imagen_url_to_articulo

Revision ID: 002_add_imagen_url
Revises: 001_initial_schema
Create Date: 2026-11-04 22:30:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel

# revision identifiers, used by Alembic.
revision: str = '002_add_imagen_url'
down_revision: Union[str, None] = '001_initial_schema'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Agregar columna opcional imagen_url a la tabla articulo
    op.add_column(
        'articulo',
        sa.Column('imagen_url', sqlmodel.sql.sqltypes.AutoString(), nullable=True)
    )


def downgrade() -> None:
    op.drop_column('articulo', 'imagen_url')
