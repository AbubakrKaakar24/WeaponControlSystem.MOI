using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WeaponControlSystem.MOI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PropertyNameChanged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Moeenyat",
                table: "Officers",
                newName: "Deputy_Ministry");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Deputy_Ministry",
                table: "Officers",
                newName: "Moeenyat");
        }
    }
}
